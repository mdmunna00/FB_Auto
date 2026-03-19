const { chromium } = require("playwright-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
chromium.use(StealthPlugin());
const fs = require('fs');
const readline = require('readline');
const { humanBehavior, humanDelay, humanType, randomIdle } = require("./human");
const { handleVerify } = require("./verify");
const { getRandomProfile } = require("./useragent");

// ================= MENU =================

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});




function ask(q) {
  return new Promise(res => rl.question(q, ans => res(ans)));
}

// ================= NAME DATA =================

const nameData = {
  BD: {
    male: ["Rahim", "Karim", "Hasan", "Sakib", "Tanvir", "Fahim"],
    female: ["Nusrat", "Jannat", "Sumaiya", "Ayesha", "Mim"],
    last: ["Hasan", "Ahmed", "Khan", "Rahman", "Hossain"]
  },
  EN: {
    male: ["John", "Michael", "David", "Daniel", "James"],
    female: ["Emma", "Olivia", "Sophia", "Ava", "Isabella"],
    last: ["Smith", "Johnson", "Brown", "Williams", "Taylor"]
  }
};

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateName(country, gender) {
  const data = nameData[country];
  return {
    firstName: getRandom(data[gender]),
    lastName: getRandom(data.last)
  };
}

function randomDelay(min = 2000, max = 5000) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomBirth() {
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  return {
    month: getRandom(months),
    day: String(Math.floor(Math.random() * 28) + 1),
    year: String(Math.floor(Math.random() * 10) + 1995)
  };
}

// ================= COMBOBOX HELPER =================

async function selectFromCombo(page, labelRegex, optionRegex) {
  try {
    const combo = page.getByRole("combobox", { name: labelRegex });
    if (await combo.count() === 0) return;

    await combo.first().click();
    await page.waitForTimeout(500);

    const option = page.getByRole("option", { name: optionRegex });
    if (await option.count() === 0) return;

    await option.first().click();
    await page.waitForTimeout(500);
  } catch {}
}

// ================= NUMBER SYSTEM =================

let numbers = [];

function loadNumbers() {
  if (fs.existsSync("number.txt")) {
    numbers = fs.readFileSync("./number.txt", "utf-8")
      .split("\n")
      .filter(Boolean);
  }
}

async function getNextNumber() {
  while (true) {
    if (!numbers.length) {
      console.log("⏳ Waiting for new numbers...");
      await new Promise(r => setTimeout(r, 5000));
      loadNumbers();
      continue;
    }

    const number = numbers.shift();
    fs.writeFileSync("number.txt", numbers.join("\n"));
    return number;
  }
}

// ================= MAIN =================

(async () => {

const DEBUG = false;  // true = debug mode | false = production mode

  const threadInput = await ask("How many threads? ");
  rl.close();

  const THREADS = parseInt(threadInput) || 1;
  const URL = "https://www.facebook.com/reg/?";

  let successCount = 0;
  let failCount = 0;
  let batchCount = 0;

  loadNumbers();

  async function runThread(id) {
    
    const mobile = await getNextNumber();

    const browser = await chromium.launch({
      headless: true,

      args: ["--disable-blink-features=AutomationControlled",
    "--start-maximized"]
    });
    
const profile = await getRandomProfile(browser);

    // 🔥 DEBUG ONLY LOG
if (DEBUG) {
  console.log("\n🧠 Context Config:");
  console.log("🌐 UserAgent :", profile.userAgent);
  console.log("🌍 Locale    :", profile.locale);
  console.log("🕒 Timezone  :", profile.timezoneId);
  console.log("🖥️ Viewport  :", profile.viewport);
  console.log("====================================\n");
}
    
    const context = await browser.newContext({ 
      
      userAgent: profile.userAgent,
  locale: profile.locale,
  timezoneId: profile.timezoneId,
  viewport: profile.viewport });


// 👇 এখানে addInitScript
await context.addInitScript(profile => {

  Object.defineProperty(navigator, "platform", {
    get: () => profile.platform || "Win32"
  });

  Object.defineProperty(navigator, "webdriver", {
    get: () => undefined
  });

  Object.defineProperty(navigator, "hardwareConcurrency", {
    get: () => profile.hardwareConcurrency || 4
  });

  Object.defineProperty(navigator, "deviceMemory", {
    get: () => profile.deviceMemory || 8
  });

}, profile);
    
    
    const page = await context.newPage();


if (DEBUG) {
  const check = await page.evaluate(() => {
    return {
      webdriver: navigator.webdriver,
      platform: navigator.platform,
      hardwareConcurrency: navigator.hardwareConcurrency,
      deviceMemory: navigator.deviceMemory
    };
  });

  console.log("\n🧪 InitScript Check:");
  console.log("🤖 webdriver          :", check.webdriver);
  console.log("💻 platform           :", check.platform);
  console.log("⚙️ hardwareConcurrency:", check.hardwareConcurrency);
  console.log("🧠 deviceMemory       :", check.deviceMemory);
  console.log("====================================\n");
}



    
// ✅ এখানে বসাও
if (DEBUG) {
  const ua = await page.evaluate(() => navigator.userAgent);
  console.log("🌐 Real UA:", ua);
}
    
    try {

      await page.goto(URL, { waitUntil: "networkidle" });
      await page.waitForTimeout(3000);

      // ===== Cookie handler =====
      for (const frame of page.frames()) {
        const btn = frame.locator("span:has-text('Allow')");
        if (await btn.count() > 0) {
          await btn.first().click({ force: true }).catch(()=>{});
          break;
        }
      }

      const country = Math.random() > 0.5 ? "BD" : "EN";
      const gender = Math.random() > 0.5 ? "male" : "female";

      const { firstName, lastName } = generateName(country, gender);
      const birth = randomBirth();
      const password = Math.random().toString(36).slice(-10);

      console.log(`Thread ${id} → ${country} ${gender}`);

      await page.getByRole("textbox").nth(0).type(firstName,{ delay: 100});

await page.waitForTimeout(1000);
      await page.getByRole("textbox").nth(1).type(lastName,{ delay: 100});

await page.waitForTimeout(1000);

      await selectFromCombo(page, /month/i, new RegExp(birth.month,"i"));
      await selectFromCombo(page, /day/i, new RegExp("^"+birth.day+"$"));
      await selectFromCombo(page, /year/i, new RegExp(birth.year));

await page.waitForTimeout(1000);

/// ================= GENDER =================
try {

  const genderCombo = page.locator(
    'div[role="combobox"]:has(span:has-text("Select your gender"))'
  );

  await genderCombo.click();
  await page.waitForTimeout(500);

  await page.locator('div[role="option"]', {
    hasText: new RegExp(`^${gender}$`, "i")
  }).first().click();

  await page.waitForTimeout(500);

  console.log("✅ Gender selected:", gender);

} catch (err) {
  console.log("❌ Gender failed:", err.message);
}




//==================================
await page.waitForTimeout(1000);

      await page.getByRole("textbox", { name: /mobile|email/i }).type(mobile,{ delay: 100});

await page.waitForTimeout(1000);

      await page.getByRole("textbox", { name: /password/i }).type(password,{ delay: 100});

      // Submit এর আগে delay
await page.waitForTimeout(randomDelay());

// Submit click
await page.getByRole("button", { name: /submit|sign/i }).click();
console.log("✅ Form Submitted");

// ১️⃣ URL change হওয়া পর্যন্ত wait
await page.waitForURL("**/confirmemail.php**", {
  timeout: 30000
});

// ২️⃣ তারপর DOM load wait
await page.waitForLoadState("domcontentloaded");

console.log("➡️ Confirmation page fully loaded");


// তারপর verify চালাও
await handleVerify(page);



      successCount++;

    } catch (err) {
      failCount++;
      console.log("Error:", err.message);
    }


    if (!DEBUG) {
  await browser.close();
} else {
  console.log("🛑 DEBUG MODE: Browser will stay open");
}

  }

  // ================= CONTINUOUS LOOP =================

if (!DEBUG) {

  while (true) {

    batchCount++;
    console.log(`\n🚀 Starting Batch ${batchCount}`);

    const tasks = [];

    for (let i = 1; i <= THREADS; i++) {
      tasks.push(runThread(i));
    }

    await Promise.all(tasks);

    console.log(`✅ Batch ${batchCount} Finished`);
    console.log(`Success: ${successCount}`);
    console.log(`Failed : ${failCount}`);
    console.log(`Remaining Numbers: ${numbers.length}`);

    await new Promise(r => setTimeout(r, 5000));
  }

} else {

  // Debug mode → only one run
  for (let i = 1; i <= THREADS; i++) {
    await runThread(i);
  }

}

})();

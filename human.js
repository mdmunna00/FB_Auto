function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ================= MAIN HUMAN BEHAVIOR =================

async function humanBehavior(page) {
  try {

    const { width, height } = page.viewportSize();

    // 🖱️ mouse movement
    const moves = random(5, 12);
    for (let i = 0; i < moves; i++) {
      await page.mouse.move(
        random(0, width),
        random(0, height),
        { steps: random(5, 15) }
      );
      await page.waitForTimeout(random(200, 700));
    }

    // 📜 scroll down
    await page.mouse.wheel(0, random(200, 800));
    await page.waitForTimeout(random(500, 1200));

    // 📜 scroll up
    await page.mouse.wheel(0, -random(100, 400));
    await page.waitForTimeout(random(500, 1200));

  } catch {}
}

// ================= HUMAN DELAY =================

async function humanDelay(page) {
  await page.waitForTimeout(random(1000, 3000));
}

// ================= HUMAN TYPING =================

async function humanType(locator, text) {
  for (let char of text) {
    await locator.type(char, {
      delay: random(50, 150)
    });
  }
}

// ================= RANDOM IDLE =================

async function randomIdle(page) {
  await page.waitForTimeout(random(1000, 4000));
}

module.exports = {
  humanBehavior,
  humanDelay,
  humanType,
  randomIdle
};

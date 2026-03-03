// verify.js

async function handleVerify(page) {

  console.log("🔎 Checking verification page...");

  // Confirmation text wait
  await page.waitForSelector("text=/confirmation code/i", {
    timeout: 20000
  });

  console.log("📩 Confirmation page detected");

  // 👉 Confirm page আসার পর ৫ সেকেন্ড wait
  await page.waitForTimeout(5000);
  console.log("⏳ Waited 5 seconds");

  // 1️⃣ Click "I didn't get the code"
  const didntGetBtn = page.locator("text=/didn't get the code/i");

  if (await didntGetBtn.count() > 0) {

    await didntGetBtn.first().click();
    console.log("✅ Clicked: I didn't get the code");

    // Popup wait
    await page.waitForSelector("text=/resend confirmation code/i", {
      timeout: 15000
    });

    const resendBtn = page.locator("text=/resend confirmation code/i");

    if (await resendBtn.count() > 0) {
      await resendBtn.first().click();
      console.log("✅ Clicked: Resend confirmation code");
    }

  } else {
    console.log("❌ 'I didn't get the code' button not found");
  }
}



module.exports = { handleVerify };

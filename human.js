// ================= HUMAN BEHAVIOR =================

async function humanBehavior(page) {
  try {

    // random mouse move
    const x = Math.floor(Math.random() * 800) + 100;
    const y = Math.floor(Math.random() * 600) + 100;

    await page.mouse.move(x, y, { steps: 15 });

    // delay
    await page.waitForTimeout(Math.random() * 1000 + 500);

    // scroll down
    await page.mouse.wheel(0, Math.floor(Math.random() * 500));

    await page.waitForTimeout(Math.random() * 1000 + 500);

    // scroll up
    await page.mouse.wheel(0, -Math.floor(Math.random() * 300));

  } catch {}
}


// ================= EXTRA HUMAN DELAY =================

async function humanDelay(page) {
  await page.waitForTimeout(Math.random() * 2000 + 1000);
}

module.exports = { humanBehavior, humanDelay };

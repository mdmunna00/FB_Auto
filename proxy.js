const fs = require("fs");
const readline = require("readline");

let proxies = [];

// ================= ASK FUNCTION =================

function ask(q) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(res =>
    rl.question(q, ans => {
      rl.close();
      res(ans.trim());
    })
  );
}

// ================= LOAD PROXIES =================

function loadProxyFile() {

  if (!fs.existsSync("proxy.txt")) return;

  proxies = fs.readFileSync("proxy.txt","utf8")
    .split("\n")
    .map(p => p.trim())
    .filter(Boolean);

}

// ================= SETUP PROXY =================

async function setupProxy() {

  loadProxyFile();

  if (proxies.length > 0) {

    const use = await ask("Use proxy? (1=yes / 2=no): ");

    if (use === "1") {
      console.log(`🌐 Loaded ${proxies.length} proxies`);
      return true;
    }

    return false;
  }

  const use = await ask("Use proxy? (1=yes / 2=no): ");

  if (use !== "1") return false;

  console.log("Enter proxies (empty line to finish)");

  while (true) {

    const line = await ask("Proxy: ");

    if (!line) break;

    proxies.push(line);
  }

  fs.writeFileSync("proxy.txt", proxies.join("\n"));

  console.log(`💾 Saved ${proxies.length} proxies`);

  return true;
}

// ================= GET PROXY =================

function getProxy(threadId) {

  if (proxies.length === 0) return null;

  const proxyRaw = proxies[threadId % proxies.length];

  try {

    const url = new URL(proxyRaw);

    const proxy = {
      server: `${url.protocol}//${url.hostname}:${url.port}`
    };

    if (url.username) proxy.username = url.username;
    if (url.password) proxy.password = url.password;

    console.log(`🌐 Thread ${threadId} → Proxy ${proxy.server}`);

    return proxy;

  } catch {

    console.log("❌ Invalid proxy:", proxyRaw);
    return null;

  }

}

module.exports = { setupProxy, getProxy };

const fs = require("fs");

let proxies = [];

// load proxy.txt
function loadProxies() {
  if (fs.existsSync("proxy.txt")) {
    proxies = fs.readFileSync("proxy.txt", "utf8")
      .split("\n")
      .map(p => p.trim())
      .filter(Boolean);
  }
}

// setup (start এ call হবে)
async function setupProxy() {
  loadProxies();

  if (proxies.length === 0) {
    console.log("❌ No proxy file found or empty");
    return false;
  }

  console.log(`🌐 Loaded ${proxies.length} proxies`);
  return true;
}

// প্রতি thread আলাদা proxy
function getProxy(threadId) {

  if (proxies.length === 0) return null;

  const raw = proxies[threadId % proxies.length];

  try {
    const url = new URL(raw);

    const proxy = {
      server: `${url.protocol}//${url.hostname}:${url.port}`
    };

    if (url.username) proxy.username = url.username;
    if (url.password) proxy.password = url.password;

    return proxy;

  } catch {
    console.log("❌ Invalid proxy:", raw);
    return null;
  }
}

module.exports = { setupProxy, getProxy };

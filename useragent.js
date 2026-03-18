function buildUA(version) {
  return `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${version} Safari/537.36`;
}

async function getRandomProfile(browser) {

  // 🔥 Browser version detect (FIXED)
  const versionRaw = await browser.version();

  // 👉 regex দিয়ে version extract (safe)
  let versionMatch = versionRaw.match(/\d+\.\d+\.\d+\.\d+/);
  let version = versionMatch ? versionMatch[0] : "120.0.0.0";

  // 🔥 profiles (same as yours)
  const profiles = [

    {
      locale: "en-US",
      timezoneId: "America/New_York"
    },

    {
      locale: "en-GB",
      timezoneId: "Europe/London"
    },

    {
      locale: "en-BD",
      timezoneId: "Asia/Dhaka"
    },

    {
      locale: "en-US",
      timezoneId: "America/Chicago"
    },

    {
      locale: "en-US",
      timezoneId: "America/Los_Angeles"
    }

  ];

  const viewports = [

    { width: 1366, height: 768 },
    { width: 1920, height: 1080 },
    { width: 1536, height: 864 },
    { width: 1440, height: 900 },
    { width: 1600, height: 900 }

  ];

  const profile = profiles[Math.floor(Math.random() * profiles.length)];
  const viewport = viewports[Math.floor(Math.random() * viewports.length)];

  return {
    userAgent: buildUA(version), // 🔥 এখন আর undefined হবে না
    locale: profile.locale,
    timezoneId: profile.timezoneId,
    viewport
  };
}

module.exports = { getRandomProfile };

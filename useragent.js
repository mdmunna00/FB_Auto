function getRandomProfile() {

  const profiles = [

    {
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/121.0.0.0 Safari/537.36",
      locale: "en-US",
      timezoneId: "America/New_York"
    },

    {
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
      locale: "en-GB",
      timezoneId: "Europe/London"
    },

    {
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/119.0.0.0 Safari/537.36",
      locale: "en-BD",
      timezoneId: "Asia/Dhaka"
    },

    {
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/118.0.0.0 Safari/537.36",
      locale: "en-US",
      timezoneId: "America/Chicago"
    },

    {
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/117.0.0.0 Safari/537.36",
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
    ...profile,
    viewport
  };
}

module.exports = { getRandomProfile };

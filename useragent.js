function getRandomProfile() {

  const profiles = [

    {
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      locale: "en-US",
      timezoneId: "America/New_York"
    },

    {
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
      locale: "en-GB",
      timezoneId: "Europe/London"
    },

  

    
    {
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      locale: "en-BD",
      timezoneId: "Asia/Dhaka"
    }

  ];

  return profiles[Math.floor(Math.random() * profiles.length)];
}

module.exports = { getRandomProfile };

// proxy.js

function getProxyForThread(threadId) {

  return {
    server: "http://res.proxyprovider.com:8000",   // তোমার provider server
    username: `yourusername-session-${threadId}`,  // session per thread
    password: "yourpassword"
  };

}

module.exports = { getProxyForThread };

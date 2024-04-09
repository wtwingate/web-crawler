const url = require("node:url");

function normalizeURL(urlString) {
  try {
    const urlObject = new URL(urlString);
    const urlHost = urlObject.host;
    const urlPath = urlObject.pathname.replace(/\/$/, "");
    return `${urlHost}${urlPath}`;
  } catch {
    return null;
  }
}

module.exports = {
  normalizeURL,
};

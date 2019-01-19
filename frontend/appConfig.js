// window._ENV_ is created in ./pages/_documnet.js
const config =
  (typeof window !== 'undefined' ? window.__ENV__ : process.env);

module.exports = config;

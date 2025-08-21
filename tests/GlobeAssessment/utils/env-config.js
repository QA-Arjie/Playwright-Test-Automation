// GlobeAssessment/utils/env-config.js
const fs = require('fs');
const path = require('path');

// Function to load browser-specific environment variables from .env files
function loadBrowserEnv(browserName, baseDir = __dirname) {
  // Load browser-specific .env file if it exists
  const browserEnvPath = path.resolve(baseDir, `../../../.env.${browserName}`);
  let browserSpecificEnv = {};
  
  if (fs.existsSync(browserEnvPath)) {
    const envContent = fs.readFileSync(browserEnvPath, 'utf8');
    const envLines = envContent.split('\n').filter(line => line.trim() !== '' && !line.startsWith('#'));
    
    envLines.forEach(line => {
      const equalIndex = line.indexOf('=');
      if (equalIndex !== -1) {
        const key = line.substring(0, equalIndex);
        const value = line.substring(equalIndex + 1);
        browserSpecificEnv[key] = value;
      }
    });
  }
  
  return browserSpecificEnv;
}

// Function to get browser-specific environment configuration
function getBrowserEnvConfig(browserName) {
  const envConfig = {
    chromium: {
      USER_PASSWORD: process.env.CHROMIUM_USER_PASSWORD || process.env.USER_PASSWORD,
      CARD_NUMBER: process.env.CHROMIUM_CARD_NUMBER || process.env.CARD_NUMBER,
      EXPIRY: process.env.CHROMIUM_EXPIRY || process.env.EXPIRY,
      CVC: process.env.CHROMIUM_CVC || process.env.CVC,
      SAVED_EMAIL: process.env.CHROMIUM_USER_EMAIL || process.env.USER_EMAIL
    },
    firefox: {
      USER_PASSWORD: process.env.FIREFOX_USER_PASSWORD || process.env.USER_PASSWORD,
      CARD_NUMBER: process.env.FIREFOX_CARD_NUMBER || process.env.CARD_NUMBER,
      EXPIRY: process.env.FIREFOX_EXPIRY || process.env.EXPIRY,
      CVC: process.env.FIREFOX_CVC || process.env.CVC,
      SAVED_EMAIL: process.env.FIREFOX_USER_EMAIL || process.env.USER_EMAIL
    },
    webkit: {
      USER_PASSWORD: process.env.WEBKIT_USER_PASSWORD || process.env.USER_PASSWORD,
      CARD_NUMBER: process.env.WEBKIT_CARD_NUMBER || process.env.CARD_NUMBER,
      EXPIRY: process.env.WEBKIT_EXPIRY || process.env.EXPIRY,
      CVC: process.env.WEBKIT_CVC || process.env.CVC,
      SAVED_EMAIL: process.env.WEBKIT_USER_EMAIL || process.env.USER_EMAIL
    }
  };
  
  return envConfig[browserName] || envConfig.chromium;
}

module.exports = { 
  getBrowserEnvConfig, 
  loadBrowserEnv 
};
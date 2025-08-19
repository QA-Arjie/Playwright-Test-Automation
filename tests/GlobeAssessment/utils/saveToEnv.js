const fs = require('fs');
const path = require('path');

function saveUserToEnv(email, password) {
  const envPath = path.resolve(__dirname, '../../../.env') // adjust as needed
  const envData = `USER_EMAIL=${email}\nUSER_PASSWORD=${password}\n`;
  fs.writeFileSync(envPath, envData);
}

module.exports = { saveUserToEnv };
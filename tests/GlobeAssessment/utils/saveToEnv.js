const fs = require('fs');
const path = require('path');

function saveUserEmailToEnv(email) {
  const envPath = path.resolve(__dirname, '../../../.env');

  // Read existing env
  let envContent = '';
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
  }

  // Convert env to object
  const envLines = envContent.split('\n').filter(Boolean);
  const envMap = Object.fromEntries(envLines.map(line => line.split('=')));

  // Update or add email value
  envMap.USER_EMAIL = email;

  // Convert back to string
  const newEnv = Object.entries(envMap)
    .map(([key, val]) => `${key}=${val}`)
    .join('\n');

  // Save back to .env
  fs.writeFileSync(envPath, newEnv);
}

module.exports = { saveUserEmailToEnv }
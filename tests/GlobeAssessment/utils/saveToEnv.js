const fs = require('fs');
const path = require('path');

function saveUserEmailToEnv(email, browserName = '') {
  // Use browser-specific env file if browserName is provided
  const envFileName = browserName ? `.env.${browserName}` : '.env';
  const envPath = path.resolve(__dirname, `../../../${envFileName}`);

  // Read existing env
  let envContent = '';
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
  }

  // Convert env to object
  const envLines = envContent.split('\n').filter(line => line.trim() !== '' && !line.startsWith('#'));
  const envMap = Object.fromEntries(
    envLines.map(line => {
      const equalIndex = line.indexOf('=');
      if (equalIndex === -1) return [line, ''];
      return [line.substring(0, equalIndex), line.substring(equalIndex + 1)];
    })
  );

  // Create email variable name based on browser
  const emailVarName = browserName ? `${browserName.toUpperCase()}_USER_EMAIL` : 'USER_EMAIL';
  
  // Update or add email value
  envMap[emailVarName] = email;

  // Convert back to string, preserving order and adding comments
  const newEnv = Object.entries(envMap)
    .map(([key, val]) => `${key}=${val}`)
    .join('\n');

  // Save back to env file
  fs.writeFileSync(envPath, newEnv);
  
  console.log(`Email saved to ${envFileName}: ${emailVarName}=${email}`);
}

module.exports = { saveUserEmailToEnv }
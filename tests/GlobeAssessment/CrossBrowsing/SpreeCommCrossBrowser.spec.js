require('dotenv').config()
const { test, expect } = require('@playwright/test')
const { SignupPage } = require('../Page Object/SignupPage')
const { LoginPage } = require('../Page Object/LoginPage')
const { ProductPage } = require('../Page Object/ProductPage')
const { CheckoutPage } = require('../Page Object/CheckoutPage')
const { customerInfo } = require('../Test Data/testdata')
const { saveUserEmailToEnv } = require('../utils/saveToEnv');
const fs = require('fs');
const path = require('path');

// Function to load browser-specific environment variables
function loadBrowserEnv(browserName) {
  // Load browser-specific .env file if it exists
  const browserEnvPath = path.resolve(__dirname, `../../../.env.${browserName}`);
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
  
  const envConfig = {
    chromium: {
      USER_PASSWORD: browserSpecificEnv.CHROMIUM_USER_PASSWORD || process.env.CHROMIUM_USER_PASSWORD || process.env.USER_PASSWORD,
      CARD_NUMBER: browserSpecificEnv.CHROMIUM_CARD_NUMBER || process.env.CHROMIUM_CARD_NUMBER || process.env.CARD_NUMBER,
      EXPIRY: browserSpecificEnv.CHROMIUM_EXPIRY || process.env.CHROMIUM_EXPIRY || process.env.EXPIRY,
      CVC: browserSpecificEnv.CHROMIUM_CVC || process.env.CHROMIUM_CVC || process.env.CVC,
      SAVED_EMAIL: browserSpecificEnv.CHROMIUM_USER_EMAIL || process.env.CHROMIUM_USER_EMAIL || process.env.USER_EMAIL
    },
    firefox: {
      USER_PASSWORD: browserSpecificEnv.FIREFOX_USER_PASSWORD || process.env.FIREFOX_USER_PASSWORD || process.env.USER_PASSWORD,
      CARD_NUMBER: browserSpecificEnv.FIREFOX_CARD_NUMBER || process.env.FIREFOX_CARD_NUMBER || process.env.CARD_NUMBER,
      EXPIRY: browserSpecificEnv.FIREFOX_EXPIRY || process.env.FIREFOX_EXPIRY || process.env.EXPIRY,
      CVC: browserSpecificEnv.FIREFOX_CVC || process.env.FIREFOX_CVC || process.env.CVC,
      SAVED_EMAIL: browserSpecificEnv.FIREFOX_USER_EMAIL || process.env.FIREFOX_USER_EMAIL || process.env.USER_EMAIL
    },
    webkit: {
      USER_PASSWORD: browserSpecificEnv.WEBKIT_USER_PASSWORD || process.env.WEBKIT_USER_PASSWORD || process.env.USER_PASSWORD,
      CARD_NUMBER: browserSpecificEnv.WEBKIT_CARD_NUMBER || process.env.WEBKIT_CARD_NUMBER || process.env.CARD_NUMBER,
      EXPIRY: browserSpecificEnv.WEBKIT_EXPIRY || process.env.WEBKIT_EXPIRY || process.env.EXPIRY,
      CVC: browserSpecificEnv.WEBKIT_CVC || process.env.WEBKIT_CVC || process.env.CVC,
      SAVED_EMAIL: browserSpecificEnv.WEBKIT_USER_EMAIL || process.env.WEBKIT_USER_EMAIL || process.env.USER_EMAIL
    }
  };
  
  return envConfig[browserName] || envConfig.chromium;
}

test('Customer Checkout', async ({page, browserName}) => {
    // Get browser-specific environment variables
    const browserEnv = loadBrowserEnv(browserName);
    
    const signupPage = new SignupPage(page)
    const randomNum = Math.floor(Math.random() * 10000);
    // Include browser name in email to ensure uniqueness across browsers
    const Email = `Testing${browserName}${randomNum}@gmail.com`;
    const Password = browserEnv.USER_PASSWORD
    const loginPage = new LoginPage(page)
    const productPage = new ProductPage(page)
    const checkoutPage = new CheckoutPage(page)

    // Launch the Spree Commerce website
    await signupPage.goToURL()  
    await expect(page).toHaveTitle('Spree Commerce DEMO') // Verify Page Title

    // New User Registration
    await signupPage.goToSignUp()
    await expect(page.getByText('Sign Up Email Password')).toBeVisible();  // Verify Registration Page
    await signupPage.RegSignUp(Email, Password, Password) // Sign up
    await expect(page.getByText('Welcome! You have signed up')).toBeVisible();  // Verify Registration Success
    await signupPage.Logout()
    await expect(page.getByText('Signed out successfully.')).toBeVisible(); // Confirm successful logout
        // Save new user email to browser-specific dotenv file
       saveUserEmailToEnv(Email, browserName);

    // Login
    await expect(page).toHaveURL('https://demo.spreecommerce.org/')
    
    // Use saved email from browser-specific env if available, otherwise use newly created email
    const loginEmail = Email;
    //const loginEmail = browserEnv.SAVED_EMAIL || Email;
    const loginPassword = browserEnv.USER_PASSWORD;

    console.log(`Logging in with browser: ${browserName}, email: ${loginEmail}`);

    await loginPage.gotoLogin(loginEmail, loginPassword)
    await expect(page.getByText('Signed in successfully.')).toBeVisible()  // Verify that the user is logged in successfully

    // Product Ordering
    await productPage.AddtoCart()
    await expect(page.locator('#line-items')).toBeVisible() // Verify line item visibility in Order Page 

    // Checkout Order
    await productPage.CheckoutOrder()
    expect(page.locator('#checkout_line_items')).toContainText('Blue Polo Shirt'); // Validate the product name in the checkout summary
    await expect(page.locator('#checkout_line_items')).toContainText('Color: Blue, Size: M'); // Validate Size
    await expect(page.locator('#checkout_summary')).toContainText('$49.98'); // Verify Price, for this test case Quantity is 2 and the Price is 24.99

    // Input Customer Information
   await checkoutPage.CustomerInformation(
    customerInfo.firstName,
    customerInfo.lastName,
    customerInfo.address,
    customerInfo.city,
    customerInfo.postalCode)
   await checkoutPage.ContinueButton()
   await expect(page.getByRole('heading', { name: 'Delivery method from Shop' })).toBeVisible(); // Verify Delivery Method Page

   // Input Delivery Information
   await checkoutPage.DeliveryMethod()
   await checkoutPage.ContinueButton()
   await expect(page.locator('#checkout_payment_methods')).toContainText('Payment'); // Verify Contain text in Payment Page

  // Input Payment Information and Order Checkout - using browser-specific credentials
  const cardNumber = browserEnv.CARD_NUMBER
  const expiration = browserEnv.EXPIRY
  const cvc = browserEnv.CVC
  await checkoutPage.waitForStripeIframe()
  await checkoutPage.fillCardNumber(cardNumber)
  await checkoutPage.fillExpiryDate(expiration)
  await checkoutPage.fillCVC(cvc)

  // Payment
  await checkoutPage.PayOrder()
  await expect(page.getByRole('heading', { name: 'Thanks QA for your order!' })).toBeVisible({timeout: 100000}) // Verify Order Confirmation   

//await page.pause()
})
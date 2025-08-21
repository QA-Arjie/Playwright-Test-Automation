require('dotenv').config()
const { test, expect } = require('@playwright/test')
const { SignupPage } = require('../Page Objects/SignupPage')
const { LoginPage } = require('../Page Objects/LoginPage')
const { ProductPage } = require('../Page Objects/ProductPage')
const { CheckoutPage } = require('../Page Objects/CheckoutPage')
const { getBrowserTestData } = require('../Test Data/testdata5')
const { saveUserEmailToEnv } = require('../utils/saveToEnv');
const { getBrowserEnvConfig, loadBrowserEnv } = require('../utils/env-config');

test('Spree Commerce End2End Test', async ({page, browserName}) => {
    // Get browser-specific environment variables and test data
    const browserEnv = loadBrowserEnv(browserName, __dirname);
    const config = getBrowserEnvConfig(browserName);
    const testData = getBrowserTestData(browserName);
    const { customerInfo } = testData;
    const signupPage = new SignupPage(page)
    const randomNum = Math.floor(Math.random() * 10000);
    // Include browser name in email to ensure uniqueness across browsers
    const Email = `Testing${browserName}${randomNum}@gmail.com`;
    const Password = config.USER_PASSWORD || browserEnv.USER_PASSWORD;
    const loginPage = new LoginPage(page)
    const productPage = new ProductPage(page)
    const checkoutPage = new CheckoutPage(page)

    // Launch the Spree Commerce website
    await signupPage.goToURL()  
    await expect(page).toHaveTitle('Spree Commerce DEMO') // Verify Page Title
        console.log('Page title is:', 'Spree Commerce DEMO')

    // New User Registration
    await signupPage.goToSignUp()
    await expect(page.getByText('Sign Up Email Password')).toBeVisible();  // Verify Registration Page
    await signupPage.RegSignUp(Email, Password, Password) // Sign up
    await expect(page.getByText('Welcome! You have signed up')).toBeVisible();  // Verify Registration Success
        console.log('Registration:', 'Successfull')
    await signupPage.Logout()
    await expect(page.getByText('Signed out successfully.')).toBeVisible(); // Confirm successful logout
        console.log('Logout:', 'Successfull')
        // Save new user email to browser-specific dotenv file
       saveUserEmailToEnv(Email, browserName);

    // Login
    await expect(page).toHaveURL('https://demo.spreecommerce.org/')
    const loginEmail = Email // Use newly created email
    const loginPassword = config.USER_PASSWORD || browserEnv.USER_PASSWORD
    console.log(`Logging in with browser: ${browserName}, email: ${loginEmail}`);
    await loginPage.gotoLogin(loginEmail, loginPassword)
    await expect(page.getByText('Signed in successfully.')).toBeVisible()  // Verify that the user is logged in successfully 
        console.log('Login:', 'Successfull')

    // Select Product, Size and Quantity
    await productPage.AddtoCart(
      customerInfo.productName,
      customerInfo.size,
      customerInfo.quantity)
    await expect(page.getByText('or continue below')).toBeVisible(); // Verify Checkout Page

    // Click Checkout
    await productPage.Checkout()

    // Verify Price total based on selected Product and Quantity
    const expectedTotal = (parseFloat(customerInfo.price) * parseInt(customerInfo.quantity)).toFixed(2)
    await expect(page.locator('#checkout_summary')).toContainText(expectedTotal)
    console.log('Expected total price: $' + expectedTotal);

    // Input Customer Information
    await expect(page.locator('h5')).toContainText('Shipping Address'); // Verify Shipping Address Page
    await checkoutPage.CustomerInformation(
    customerInfo.firstName,
    customerInfo.lastName,
    customerInfo.address,
    customerInfo.city,
    customerInfo.postalCode)
   await checkoutPage.ContinueButton()

    // Delivery Option
    await expect(page.getByRole('heading', { name: 'Delivery method from Shop' })).toBeVisible() // Verify Delivery Method Page
    await checkoutPage.DeliveryMethod(customerInfo.shippingOption)
    await expect(page.getByRole('radio', { name: customerInfo.shippingOption })).toBeChecked()
    console.log('Delivery Option:', customerInfo.shippingOption)

    await checkoutPage.ContinueButton()

    // Input Payment Information and Order Checkout 
    const cardNumber = config.CARD_NUMBER || browserEnv.CARD_NUMBER;
    const expiration = config.EXPIRY || browserEnv.EXPIRY;
    const cvc = config.CVC || browserEnv.CVC;

    await expect(page.locator('#checkout_payment_methods')).toContainText('Payment'); // Verify Contain text in Payment Page
    await checkoutPage.waitForStripeIframe()
    await checkoutPage.fillCardNumber(cardNumber)
    await checkoutPage.fillExpiryDate(expiration)
    await checkoutPage.fillCVC(cvc)

    // Payment
    await checkoutPage.PayOrder()
    await expect(page.locator('h4')).toContainText('Thanks QA for your order!'); // Verify Order Confirmation
        console.log('Order Created:', 'Successfully')

    //await page.pause() //For Debugging

})
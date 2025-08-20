require('dotenv').config()
const { test, expect } = require('@playwright/test')
const { SignupPage } = require('../Page Class/SignupPage')
const { LoginPage } = require('../Page Class/LoginPage')
const { ProductPage } = require('../Page Class/ProductPage')
const { CheckoutPage } = require('../Page Class/CheckoutPage')
const { customerInfo } = require('../Test Data/testdata')
const { saveUserEmailToEnv } = require('../utils/saveToEnv');

test('Customer Checkout', async ({page}) => {
    const signupPage = new SignupPage(page)
    const randomNum = Math.floor(Math.random() * 10000);
    const Email = `Testing${randomNum}@gmail.com`;
    const Password = process.env.USER_PASSWORD
    const loginPage = new LoginPage(page)
    const productPage = new ProductPage(page)
    const checkoutPage = new CheckoutPage(page)

    // Launch the Spree Commerce website
    await signupPage.goToURL()  
    await expect(page).toHaveTitle('Spree Commerce DEMO') // Varify Page Title

    // New User Registration
    await signupPage.goToSignUp()
    await expect(page.getByText('Sign Up Email Password')).toBeVisible();  // Verify Registration Page
    await signupPage.RegSignUp(Email, Password, Password) // Sign up
    await expect(page.getByText('Welcome! You have signed up')).toBeVisible();  // Verify Registration Success
    await signupPage.Logout()
    await expect(page.getByText('Signed out successfully.')).toBeVisible(); // Confirm successful logout
        // Save new user email to dotenv and use in Login
       saveUserEmailToEnv(Email);

    // Login
    await expect(page).toHaveURL('https://demo.spreecommerce.org/')
    await loginPage.gotoLogin(Email, Password)
    await expect(page.getByText('Signed in successfully.')).toBeVisible()  // Verify that the user is logged in successfully

    // Product Ordering
    await productPage.AddtoCart()
    await expect(page.locator('#line-items')).toBeVisible() // Verify line item visibility in Order Page

    // Checkout Order
    await productPage.CheckoutOrder()
    // expect(page.locator('#checkout_line_items')).toContainText('Blue Polo Shirt'); // Verifies product name
    //await expect(page.locator('#checkout_line_items')).toContainText('Color: Blue, Size: M'); // Verifies Size
    //await expect(page.locator('#checkout_summary')).toContainText('$49.98'); // Verifies Price, for this test case Quantity is 2 and the Price is 24.99

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

  // Input Payment Information and Order Checkout
  const cardNumber = process.env.CARD_NUMBER
  const expiration = process.env.EXPIRY
  const cvc = process.env.CVC
  await checkoutPage.waitForStripeIframe()
  await checkoutPage.fillCardNumber(cardNumber)
  await checkoutPage.fillExpiryDate(expiration)
  await checkoutPage.fillCVC(cvc)

  // Payment
  await checkoutPage.PayOrder()
  await expect(page.getByRole('heading', { name: 'Thanks QA for your order!' })).toBeVisible() // Verify Order Confirmation

//await page.pause()
})
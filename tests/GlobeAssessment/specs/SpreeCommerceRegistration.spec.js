require('dotenv').config()
const {test, expect} = require('@playwright/test')
const { SignupPage } = require('../Page Objects/SignupPage')
const { saveUserEmailToEnv } = require('../utils/saveToEnv');


test('Customer Signup', async ({page}) => {
    const Signup = new SignupPage(page)
    const randomNum = Math.floor(Math.random() * 10000);
    const Email = `Testing${randomNum}@gmail.com`;
    const Password = process.env.USER_PASSWORD

    // Navigate to Spree Commerce
    await Signup.goToURL()
    await expect(page).toHaveTitle('Spree Commerce DEMO') // Verify Page Title

    // New User Registration
    await Signup.goToSignUp()
    await expect(page.getByText('Sign Up Email Password')).toBeVisible(); // Verify Registration Page
    await Signup.RegSignUp(Email, Password, Password) // Sign up
    await expect(page.getByText('Welcome! You have signed up')).toBeVisible();  // Verify Registration Success
    // Logout Account
    await Signup.Logout()
    await expect(page.getByText('Signed out successfully.')).toBeVisible(); // Confirm successful logout
    

    saveUserEmailToEnv(Email);
   // await page.pause()
})
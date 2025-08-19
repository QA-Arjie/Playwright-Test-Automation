require('dotenv').config()
const {test, expect} = require('@playwright/test')
const { SignupPage } = require('../GlobeAssessment/Page Class/SignupPage')
const { saveUserToEnv } = require('./utils/saveToEnv');


test('Customer Signup', async ({page}) => {
    const Signup = new SignupPage(page)
    const randomNum = Math.floor(Math.random() * 10000);
    const Email = `Testing${randomNum}@gmail.com`;
    const Password = 'Password@123'

    // Navigate to Spree Commerce
    await Signup.goToURL()
    // Varify Title
    await expect(page).toHaveTitle('Spree Commerce DEMO')
    // Signup Page
    await Signup.goToSignUp()
    // Verify Page
    await expect(page.getByText('Sign Up Email Password')).toBeVisible();
    // Registration
    await Signup.RegSignUp(Email, Password, 'Password@123')
    // Verify Registration Success
    await expect(page.getByText('Welcome! You have signed up')).toBeVisible();
    // Logout Account
    await Signup.Logout()
    // Verify Successfully Logout
    await expect(page.getByText('Signed out successfully.')).toBeVisible();
    

    saveUserToEnv(Email, Password)
   // await page.pause()
})
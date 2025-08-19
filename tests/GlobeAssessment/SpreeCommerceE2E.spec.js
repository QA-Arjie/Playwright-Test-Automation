require('dotenv').config()
const {test, expect} = require('@playwright/test')
const { SignupPage } = require('../GlobeAssessment/Page Class/SignupPage')
const { LoginPage } = require('../GlobeAssessment/Page Class/LoginPage')
const { saveUserToEnv } = require('./utils/saveToEnv');


test('Customer Signup', async ({page}) => {
    const Signup = new SignupPage(page)
    const Login = new LoginPage(page)
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
    // Save the New Email and Password to .env
    saveUserToEnv(Email, Password)

    // Login New Created 
    const LoginEmail = process.env.USER_EMAIL
    const LoginPassword = process.env.USER_PASSWORD
    await Login.gotoLogin(LoginEmail, LoginPassword)

    await page.pause()


})
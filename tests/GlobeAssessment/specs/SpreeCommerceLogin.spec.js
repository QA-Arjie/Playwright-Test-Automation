require('dotenv').config()
const { test, expect } = require('@playwright/test')
const { LoginPage } = require('../Page Object/LoginPage')

test('Customer Login', async ({page}) => {
    const Login = new LoginPage(page)
    const LoginEmail = process.env.USER_EMAIL
    const LoginPassword = process.env.USER_PASSWORD

    // Login
    await Login.gotoURL()
    await Login.gotoLogin(LoginEmail, LoginPassword)
    await expect(page.getByText('Signed in successfully.')).toBeVisible()  // Verify that the user is logged in successfully

//await page.pause()
})
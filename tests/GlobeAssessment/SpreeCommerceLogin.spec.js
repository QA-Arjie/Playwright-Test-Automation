require('dotenv').config()
const { test, expect } = require('@playwright/test')
const { LoginPage } = require('../GlobeAssessment/Page Class/LoginPage')

test('Customer Login', async ({page}) => {
    const Login = new LoginPage(page)
    const LoginEmail = process.env.USER_EMAIL
    const LoginPassword = process.env.USER_PASSWORD

    await Login.gotoURL()
    await Login.gotoLogin(LoginEmail, LoginPassword)

await page.pause()
})
require('dotenv').config()
const { LoginPage } = require('../POM/LoginPage')
const { test, expect } = require('@playwright/test')

test('testdemo', async ({page}) => {
const Login = new LoginPage(page)
const Password = process.env.PASSWORD
const username = 'standard_user'

Login.GoToLogInPage()
Login.login(username, Password)

await page.pause()
}
)



const [popup] = await Promise.all[
    page.waitForEvent('popup'),
    page.click('#popup')
]
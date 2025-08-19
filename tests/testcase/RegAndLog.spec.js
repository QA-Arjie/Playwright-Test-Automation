require('dotenv').config()
const {test, expect} = require('@playwright/test')
const { SignupPage } = require('../POM/ToolShop/SignupPage')
const { ToolLoginPage } = require('../POM/ToolShop/ToolLoginPage')

test('Register and Login', async ({page}) => {
const SignUp = new SignupPage(page)
const ToolLogIn = new ToolLoginPage(page)
const Email = process.env.LOG_EMAIL
const Password = process.env.PASSWORD_EMAIL
// Access site
await SignUp.goToHomePage()

// Registration
await SignUp.Registration('Testing', 'Skilled', '1991-10-22', '123 Street', '1733', 'Macau', 'Any', '1243125432', 'test11@email.com', 'pass123@ABC')

// Successful Registration
await expect(page.getByRole('link', { name: 'Practice Software Testing -' })).toBeVisible()

//await page.pause()

// Login
await ToolLogIn.LogIn(Email, Password)



}

)

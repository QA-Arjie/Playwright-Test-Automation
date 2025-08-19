require('dotenv').config()
const { test, expect } = require('@playwright/test')
const { ToolLoginPage } = require('../POM/ToolShop/ToolLoginPage')

test('Tool Login', async ({page}) => {
const ToolLoginpage = new ToolLoginPage(page)
const Password = process.env.PASSWORD_EMAIL
const Email = process.env.LOG_EMAIL

// HOME
await ToolLoginpage.AccessSite()
// LOGIN
await ToolLoginpage.LogIn(Email, Password)
// Asset
//await ToolLoginpage.AssertMyAccount()


await page.pause()
}
)
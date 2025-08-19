require('dotenv').config()
const {test, expect} = require('@playwright/test')
const { ToolLoginPage } = require('../POM/ToolShop/ToolLoginPage')

test('Demotest', async ({page}) => {
const LoginPage = new ToolLoginPage(page)

LoginPage.AccessSite()

LoginPage.LogIn()

}
)

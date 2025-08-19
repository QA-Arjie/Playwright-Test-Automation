require('dotenv').config()
const {test, expect} = require('@playwright/test')
const { LoginPage } = require('../POM/LoginPage')
const { CartPage } = require('../POM/CartPage')
const { FilterPage } = require('../POM/FilterPage')

test('Add to Cart', async ({page}) => {
const loginPage = new LoginPage(page)
const cartPage = new CartPage(page)
const filterPage = new FilterPage(page)

//Log In
await loginPage.GoToLogInPage()
await expect(page.locator('.login_logo')).toBeVisible()
const username = 'standard_user'
const password = process.env.PASSWORD
await loginPage.login(username, password);
await expect(page.locator('[data-test="secondary-header"]')).toBeVisible()

// Add Cart
await cartPage.addItemToCart()
await cartPage.goToCart()
await cartPage.Checkout('Testing', 'QA2', '1078')
await cartPage.VerifyOrderComplete()

//await page.pause()
}
)




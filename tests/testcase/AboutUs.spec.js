require('dotenv').config()
const {test, expect} = require('@playwright/test')
const { LoginPage } = require('../POM/LoginPage')

test('Add to Cart', async ({page}) => {
const loginPage = new LoginPage(page)

//Log In
await page.goto('https://www.saucedemo.com/')
await expect(page.locator('.login_logo')).toBeVisible()
const username = 'standard_user'
const password = process.env.PASSWORD
await loginPage.login(username, password);
await expect(page.locator('[data-test="secondary-header"]')).toBeVisible()

//About Us
await page.getByRole('button', { name: 'Open Menu' }).click()
await expect(page.locator('[data-test="about-sidebar-link"]')).toBeVisible()
await page.locator('[data-test="about-sidebar-link"]').click()
await expect(page).toHaveURL('https://saucelabs.com/')

//await page.pause()
}
)
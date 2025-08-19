import {test, expect} from '@playwright/test'
import dotenv from 'dotenv'

dotenv.config()

test('ecomm login', async ({page}) => {
const password = process.env.password
//const username = process.env.username
await page.goto('https://www.saucedemo.com/')
await expect(page.locator('.login_logo')).toBeVisible()
// Login
await page.locator('[data-test="username"]').fill('standard_user')
await page.locator('[data-test="password"]').fill(password)
await page.locator('[data-test="login-button"]').click()

await page.pause()
})
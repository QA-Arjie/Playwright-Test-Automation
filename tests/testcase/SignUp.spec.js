require('dotenv').config()
const {test, expect} = require('@playwright/test')
const { SignupPage } = require('../POM/ToolShop/SignupPage')

test('ToolShop', async ({page}) => {
const SignUpPage = new SignupPage(page)

// Registration
await SignUpPage.goToHomePage()
await SignUpPage.Registration('Testing', 'Quality', '1991-11-12', '123 Street', '1082', 'GGG', 'States', '092534', 'test6@email.com', 'pass123@ABC')


// Registration Complete
await expect(page.getByRole('link', { name: 'Practice Software Testing -' })).toBeVisible()

await page.pause()


})



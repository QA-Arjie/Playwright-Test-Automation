import {test, expect} from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config()

test('demo', async ({page}) => {
const password = process.env.password
await page.goto('link')
await Promise.All([
page.waitForEvent('popup'),
page.click('popup element')
])

await page.check('input[type = "radio"][value ="radio1")')
await page.getByRole('checkbox'), {name: 'Check1'}.SelectOption('Check1')



}
) 

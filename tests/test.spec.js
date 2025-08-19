import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('testing');
  await page.locator('[data-test="username"]').press('Tab');
  await page.locator('[data-test="password"]').fill('password');
  await page.locator('[data-test="login-button"]').click();
  await page.pause()
});




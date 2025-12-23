import { test, expect } from './fixtures/baseFixtures';

test('Logout action', async ({ validatedPage }) => {
  const userEmail = 'olegivaniuk123@gmail.com'; // Replace with a valid registered email
  const userPassword = '123'; // Replace with a valid registered password
  const userName = 'Oleg'; // Replace with a valid registered username

  await validatedPage.locator('a[href="/login"]').click();
  await expect(validatedPage.locator('h2:has-text("Login to your account")')).toBeVisible();
  await validatedPage.locator('[data-qa="login-email"]').fill(userEmail);
  await validatedPage.locator('[data-qa="login-password"]').fill(userPassword);
  await validatedPage.locator('[data-qa="login-button"]').click();
  await expect(validatedPage.getByText(`Logged in as ${userName}`)).toBeVisible();
  await validatedPage.locator('a[href="/logout"]').click();
  await expect(validatedPage.locator('h2:has-text("Login to your account")')).toBeVisible();
});

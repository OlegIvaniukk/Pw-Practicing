import { test, expect } from '../fixtures/baseFixtures';

test('Login action', async ({ validatedPage }) => {
  await validatedPage.locator('a[href="/login"]').click();
  await expect(validatedPage.locator('h2:has-text("Login to your account")')).toBeVisible();
  await validatedPage.locator('[data-qa="login-email"]').fill('invalid@example.com');
  await validatedPage.locator('[data-qa="login-password"]').fill('wrongpassword');
  await validatedPage.locator('[data-qa="login-button"]').click();
  await expect(validatedPage.getByText('Your email or password is incorrect!')).toBeVisible();
});

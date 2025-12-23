import { test, expect } from './fixtures/baseFixtures';

test('Reg with existing email', async ({ validatedPage }) => {
  const userEmail = 'olegivaniuk123@gmail.com'; // Replace with a valid registered email
  // const userName = "Oleg"; // Replace with a valid registered username
    await validatedPage.locator('a[href="/login"]').click();
  await expect(validatedPage.locator('h2:has-text("New User Signup!")')).toBeVisible();
  await validatedPage.locator('[data-qa="signup-email"]').fill(userEmail);
  await validatedPage.locator('[data-qa="signup-name"]').fill('AnyName');
  await validatedPage.locator('[data-qa="signup-button"]').click();
  await validatedPage.locator('button[data-qa="signup-button"]').click();
  await expect(validatedPage.getByText('Email Address already exist!')).toBeVisible();
});

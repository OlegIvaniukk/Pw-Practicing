import { test, expect } from '../fixtures/baseFixtures';

test('Login with valid creds', async ({ validatedPage }) => {
  const userEmail = 'olegivaniuk123@gmail.com'; // Replace with a valid registered email
  const userPassword = '123'; // Replace with a valid registered password
  const userName = 'Oleg'; // Replace with a valid registered username

  await validatedPage.locator('a[href="/login"]').click();
  await expect(validatedPage.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
  await validatedPage.getByPlaceholder('Email Address').first().fill(userEmail);
  await validatedPage.getByPlaceholder('Password').fill(userPassword);
  await validatedPage.getByRole('button', { name: 'Login' }).click();
  await expect(validatedPage.getByText(`Logged in as ${userName}`)).toBeVisible();
  
  //Delete account
  await validatedPage.getByRole('link', { name: ' Delete Account' }).click();
  await expect(validatedPage.getByText('Account Deleted!')).toBeVisible();
});

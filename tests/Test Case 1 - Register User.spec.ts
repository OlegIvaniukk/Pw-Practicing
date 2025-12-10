import { test, expect } from '@playwright/test';

test.describe('Test Case 1: Register User', () => {

  const randomInt = Math.floor(Math.random() * 1000);
  const userName = `Oleg_${randomInt}`;
  const userEmail = `olegivaniuk${randomInt}@gmail.com`;

test('has title', async ({ page }) => {

  const inputName = page.locator('input[data-qa="name"]');
  const inputEmail = page.locator('input[data-qa="email"]');

  await page.goto('http://automationexercise.com');

  // Expect page is loaded/visible successfully.
  await expect(page).toHaveTitle(/Automation Exercise/);
  await expect(page).toHaveURL('https://automationexercise.com/');
  await page.locator('.fa-lock').click();
  await expect(page.getByRole('heading', {name: 'User Signup!'})).toBeVisible();
  await page.locator('input[data-qa="signup-name"]').fill(userName);
  await page.locator('input[data-qa="signup-email"]').fill(userEmail);
  await page.locator('[data-qa="signup-button"]').click();
  await expect(page.getByRole('textbox', { name: 'Name *', exact: true })).toBeVisible();

   //Verify that 'ENTER ACCOUNT INFORMATION' is visible
  await expect(inputName).toBeVisible();
  await expect(inputName).toHaveValue(userName);
  await expect(inputEmail).toBeVisible();
  await expect(inputEmail).toHaveValue(userEmail);

  //Fill page details: Title, Name, Email, Password, Date of birth etc.
  await page.getByRole('radio', {name: 'Mr.'}).check();
  await page.locator('input[data-qa="password"]').fill(`Ivaniuk${randomInt}`);
  await page.locator('select[data-qa="days"]').selectOption('10');
  await page.locator('select[data-qa="months"]').selectOption('June');
  await page.locator('select[data-qa="years"]').selectOption('2020');
  await page.getByRole('checkbox', { name: 'Sign up for our newsletter!' }).check();
  await page.getByRole('checkbox', { name: 'Receive special offers from our partners!' }).check();
  await page.locator('input[data-qa="first_name"]').fill('Oleg');
  await page.locator('input[data-qa="last_name"]').fill('Ivaniuk');
  await page.locator('input[data-qa="company"]').fill('TestCompany');
  await page.locator('input[data-qa="address"]').fill('TestAdress');
  await page.locator('input[data-qa="address2"]').fill('Test 100 2');
  await page.locator('select[data-qa="country"]').selectOption('Canada');
  await page.locator('input[data-qa="state"]').fill('TestState');
  await page.locator('input[data-qa="city"]').fill('TestCity');
  await page.locator('input[data-qa="zipcode"]').fill('A1B2C3');
  await page.locator('input[data-qa="mobile_number"]').fill('+1234567890');
  await page.locator('button[data-qa="create-account"]').click();

  //Verify that ACCOUNT CREATED
  await expect(page.getByRole('heading', {name: 'Account Created!'})).toBeVisible();
  await page.locator('a[data-qa="continue-button"]').click();
  await expect(page.getByText(`Logged in as ${userName}`)).toBeVisible();

  //Delete Account
  await page.locator('a[href="/delete_account"]').click();
  await expect(page.getByRole('heading', {name: 'Account Deleted!'})).toBeVisible();
  await page.locator('a[data-qa="continue-button"]').click();
});
});


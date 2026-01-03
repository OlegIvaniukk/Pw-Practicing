import { test, expect } from '../fixtures/baseFixtures';

test('has title', async ({ validatedPage }) => {
  const randomInt = Math.floor(Math.random() * 1000);
  const userName = `Oleg_${randomInt}`;
  const userEmail = `olegivaniuk${randomInt}@gmail.com`;
  const inputName = validatedPage.locator('input[data-qa="name"]');
  const inputEmail = validatedPage.locator('input[data-qa="email"]');

  await validatedPage.locator('.fa-lock').click();
  await expect(validatedPage.getByRole('heading', { name: 'User Signup!' })).toBeVisible();
  await validatedPage.locator('input[data-qa="signup-name"]').fill(userName);
  await validatedPage.locator('input[data-qa="signup-email"]').fill(userEmail);
  await validatedPage.locator('[data-qa="signup-button"]').click();
  await expect(validatedPage.getByRole('textbox', { name: 'Name *', exact: true })).toBeVisible();

  //Verify that 'ENTER ACCOUNT INFORMATION' is visible
  await expect(inputName).toBeVisible();
  await expect(inputName).toHaveValue(userName);
  await expect(inputEmail).toBeVisible();
  await expect(inputEmail).toHaveValue(userEmail);

  //Fill page details: Title, Name, Email, Password, Date of birth etc.
  await validatedPage.getByRole('radio', { name: 'Mr.' }).check();
  await validatedPage.locator('input[data-qa="password"]').fill(`Ivaniuk${randomInt}`);
  await validatedPage.locator('select[data-qa="days"]').selectOption('10');
  await validatedPage.locator('select[data-qa="months"]').selectOption('June');
  await validatedPage.locator('select[data-qa="years"]').selectOption('2020');
  await validatedPage.getByRole('checkbox', { name: 'Sign up for our newsletter!' }).check();
  await validatedPage
    .getByRole('checkbox', { name: 'Receive special offers from our partners!' })
    .check();
  await validatedPage.locator('input[data-qa="first_name"]').fill('Oleg');
  await validatedPage.locator('input[data-qa="last_name"]').fill('Ivaniuk');
  await validatedPage.locator('input[data-qa="company"]').fill('TestCompany');
  await validatedPage.locator('input[data-qa="address"]').fill('TestAdress');
  await validatedPage.locator('input[data-qa="address2"]').fill('Test 100 2');
  await validatedPage.locator('select[data-qa="country"]').selectOption('Canada');
  await validatedPage.locator('input[data-qa="state"]').fill('TestState');
  await validatedPage.locator('input[data-qa="city"]').fill('TestCity');
  await validatedPage.locator('input[data-qa="zipcode"]').fill('A1B2C3');
  await validatedPage.locator('input[data-qa="mobile_number"]').fill('+1234567890');
  await validatedPage.locator('button[data-qa="create-account"]').click();

  //Verify that ACCOUNT CREATED
  await expect(validatedPage.getByRole('heading', { name: 'Account Created!' })).toBeVisible();
  await validatedPage.locator('a[data-qa="continue-button"]').click();
  await expect(validatedPage.getByText(`Logged in as ${userName}`)).toBeVisible();

  //Delete Account
  await validatedPage.locator('a[href="/delete_account"]').click();
  await expect(validatedPage.getByRole('heading', { name: 'Account Deleted!' })).toBeVisible();
  await validatedPage.locator('a[data-qa="continue-button"]').click();
});

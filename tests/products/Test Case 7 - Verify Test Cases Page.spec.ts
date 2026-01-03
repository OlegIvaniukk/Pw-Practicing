import { test, expect } from '../fixtures/baseFixtures';

test('TC page verification', async ({ validatedPage }) => {
  await validatedPage.getByRole('button', { name: 'Test Cases' }).click();
  await expect(validatedPage).toHaveURL('https://automationexercise.com/test_cases');
  await expect(validatedPage.getByText('Below is the list of test')).toBeVisible();
});

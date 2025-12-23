import { test, expect } from './fixtures/baseFixtures';

test('Verify Subscription', async ({ validatedPage }) => {
  await validatedPage.locator('#footer').scrollIntoViewIfNeeded();
  await expect(validatedPage.locator('#footer')).toBeVisible();
  await expect(validatedPage.getByRole('heading', { name: 'SUBSCRIPTION' })).toBeVisible();
  await validatedPage.getByPlaceholder('Your email address').fill('test@example.com');
  await validatedPage.locator('#subscribe.btn.btn-default').click();
  await expect(
    validatedPage.locator('#success-subscribe', {
      hasText: 'You have been successfully subscribed!',
    }),
  ).toBeVisible();
});

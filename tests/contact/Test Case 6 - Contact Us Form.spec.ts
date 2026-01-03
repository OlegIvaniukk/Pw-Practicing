import { test, expect } from '../fixtures/baseFixtures';

test('Contact Us Form Submission', async ({ validatedPage }) => {

  await validatedPage.locator('a[href="/contact_us"]').click();
  await expect(validatedPage.getByRole('heading', { name: 'Get In Touch' })).toBeVisible();
  await validatedPage.locator('[data-qa="name"]').fill('TestName');
  await validatedPage.locator('[data-qa="email"]').fill('TestEmail@gmail.com');
  await validatedPage.locator('[data-qa="subject"]').fill('TestSubject');
  await validatedPage.locator('[data-qa="message"]').fill('TestMessage');
  await validatedPage.setInputFiles('input[name="upload_file"]', 'tests/fixtures/playwright.png');
  validatedPage.on('dialog', async (dialog) => {
    console.log('Dialog appeared:', dialog.message());
    await dialog.accept();
  });
  await validatedPage.locator('[data-qa="submit-button"]').click();
  await expect(validatedPage.getByText(/Success|submitted/i).first()).toBeVisible({
    timeout: 8000,
  });
  await validatedPage.getByRole('link', { name: ' Home' }).click();
  await expect(validatedPage).toHaveURL('https://automationexercise.com/');
});

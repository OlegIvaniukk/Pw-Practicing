import { test, expect } from '../fixtures/baseFixtures';

test('Product details', async ({ validatedPage }) => {
   await validatedPage.locator('a[href="/products"]').click();
  await expect(validatedPage).toHaveURL('https://automationexercise.com/products');
  await expect(validatedPage.getByRole('heading', { name: 'All Products' })).toBeVisible();
  await validatedPage.locator('a[href="/product_details/1"]').first().click();
  await expect(validatedPage).toHaveURL('https://automationexercise.com/product_details/1');
  await expect(validatedPage.locator('.product-information h2')).toBeVisible();
  await expect(
    validatedPage.locator('.product-information p').filter({ hasText: 'Category' }),
  ).toBeVisible();
  await expect(validatedPage.locator('.product-information span span')).toBeVisible();
  await expect(
    validatedPage.locator('.product-information p').filter({ hasText: 'Availability:' }),
  ).toBeVisible();
  await expect(
    validatedPage.locator('.product-information p').filter({ hasText: 'Condition:' }),
  ).toBeVisible();
  await expect(
    validatedPage.locator('.product-information p').filter({ hasText: 'Brand:' }),
  ).toBeVisible();
});

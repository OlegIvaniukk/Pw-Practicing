import { test, expect } from './fixtures/baseFixtures';

test('Prod search', async ({ validatedPage }) => {
  await validatedPage.locator('a[href="/products"]').click();
  await expect(validatedPage.getByRole('heading', { name: 'All Products' })).toBeVisible();
  const keyword = 'Top';
  await validatedPage.locator('.input-lg').fill(keyword);
  await validatedPage.locator('#submit_search').waitFor({ state: 'visible', timeout: 5000 });
  await validatedPage.locator('#submit_search').click();
  await expect(validatedPage.getByRole('heading', { name: 'Searched Products' })).toBeVisible();
  const searchResults = validatedPage.locator('.features_items').locator('.single-products');
  const count = await searchResults.count();
  expect(count).toBeGreaterThan(0);
  for (let i = 0; i < count; i++) {
    await expect(searchResults.nth(i)).toBeVisible();
  }
});

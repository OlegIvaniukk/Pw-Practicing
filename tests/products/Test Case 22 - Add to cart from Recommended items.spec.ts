import {test, expect} from "../fixtures/baseFixtures";

test('Add to cart from Recommended items', async ({validatedPage}) => {
    await validatedPage.locator('.recommended_items').scrollIntoViewIfNeeded();
    await expect(validatedPage.getByRole('heading', { name: 'recommended items' })).toBeVisible();
    await validatedPage.locator('#recommended-item-carousel').locator('text=Add to cart').first().click();
    await validatedPage.getByRole('link', { name: 'View Cart' }).click();
    await expect(validatedPage).toHaveURL(/\/view_cart$/);
    await expect(validatedPage.locator('.cart_info')).toBeVisible();
    await expect(validatedPage.locator('tr[id^="product-"]').first()).toBeVisible();
});
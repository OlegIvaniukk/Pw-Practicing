import {test, expect} from "../fixtures/baseFixtures";

test('Add review on product', async ({validatedPage}) => {
    await validatedPage.getByRole('link', {name: ' Products'}).click();
    await expect(validatedPage).toHaveURL(/\/products$/);
    await validatedPage.getByRole('link', { name: ' View Product' }).first().click();
    await expect(validatedPage.getByRole('link', {name: 'Write Your Review'})).toBeVisible();
    await validatedPage.locator('#name').fill('Test User');
    await validatedPage.locator('#email').fill('test@example.com');
    await validatedPage.locator('#review').fill('This is a test review for the product.');
    await validatedPage.getByRole('button', {name: 'Submit'}).click();
    await expect(validatedPage.getByText('Thank you for your review.')).toBeVisible();
});
import {test, expect} from '../fixtures/baseFixtures';

test('Verify Product quantity in Cart', async ({validatedPage}) => {
    await validatedPage.getByRole('link', {name: 'View Product'}).first().click();
    await expect(validatedPage).toHaveURL('https://automationexercise.com/product_details/1');
    await validatedPage.locator('#quantity').fill('4');
    await validatedPage.getByRole('button', { name: ' Add to cart' }).click();
    await validatedPage.getByRole("link", { name: "View Cart" }).click();
    await expect(validatedPage.locator('.cart_quantity button')).toHaveText('4');
});
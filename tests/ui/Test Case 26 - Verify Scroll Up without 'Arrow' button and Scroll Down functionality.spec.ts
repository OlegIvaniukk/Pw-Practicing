import {test, expect} from "../fixtures/baseFixtures";

test('Verify Scroll Up without \'Arrow\' button and Scroll Down functionality', async ({validatedPage}) => {
    await validatedPage.locator('footer').scrollIntoViewIfNeeded();
    await expect(validatedPage.getByRole('heading', { name: 'Subscription' })).toBeVisible();
    await validatedPage.evaluate(() => window.scrollTo(0, 0));
    await expect(validatedPage.getByRole('heading', { name: 'Full-Fledged practice website for Automation Engineers' })).toBeVisible();
});
import { test, expect } from "../fixtures/baseFixtures";

test("Search Products and Verify Cart After Login", async ({
  validatedPage,
}) => {
  await validatedPage.getByRole("link", { name: " Products" }).click();
  await expect(validatedPage).toHaveURL(/\/products$/);
  await validatedPage.getByPlaceholder("Search Product").fill("top");
  await validatedPage.locator("#submit_search").click();
  await expect(
    validatedPage.getByRole("heading", { name: "Searched Products" })
  ).toBeVisible();
  const products = validatedPage.locator(".features_items .single-products");
  const count = await products.count();
  await expect(count).toBeGreaterThan(0);

  const firstProduct = validatedPage.locator(".single-products").first();
  await firstProduct.hover();
  await validatedPage.waitForTimeout(300);
  await firstProduct.locator(".product-overlay .add-to-cart").click();
  await validatedPage
    .getByRole("button", { name: "Continue Shopping" })
    .click();
  const secondProduct = validatedPage.locator(".single-products").nth(1);
  await secondProduct.hover();
  await validatedPage.waitForTimeout(300);
  await secondProduct.locator(".product-overlay .add-to-cart").click();
  await validatedPage
    .getByRole("button", { name: "Continue Shopping" })
    .click();

  await validatedPage.getByRole("link", { name: " Cart" }).click();
  await expect(validatedPage).toHaveURL(/\/view_cart$/);
  await expect(validatedPage.locator("#product-1")).toBeVisible();
  await expect(validatedPage.locator("#product-5")).toBeVisible();

  //Login
  const userEmail = "olegivaniuk123@gmail.com"; // Replace with a valid registered email
  const userPassword = "123"; // Replace with a valid registered password

  await validatedPage.getByRole("link", { name: "  Signup / Login" }).click();
  await validatedPage.getByRole("link", { name: " Cart" }).click();
  await expect(validatedPage).toHaveURL(/\/view_cart$/);
  await expect(validatedPage.locator("#product-1")).toBeVisible();
  await expect(validatedPage.locator("#product-5")).toBeVisible();
});

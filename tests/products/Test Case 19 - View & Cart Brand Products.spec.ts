import { test, expect } from "../fixtures/baseFixtures";

test("View & Cart Brand Products", async ({ validatedPage }) => {
  await validatedPage.getByRole("link", { name: " Products" }).click();
  await expect(validatedPage).toHaveURL(/\/products$/);
  await expect(validatedPage.locator(".brands_products")).toBeVisible();
  await validatedPage.getByRole("link", { name: "Polo" }).click();
  await expect(
    validatedPage.getByRole("heading", { name: "Brand - Polo Products" })
  ).toBeVisible();
  const products = validatedPage.locator(".features_items .single-products");
  const count = await products.count();
  await expect(count).toBeGreaterThan(0);
  await validatedPage.getByRole("link", { name: "H&M" }).click();
  await expect(
    validatedPage.getByRole("heading", { name: "Brand - H&M Products" })
  ).toBeVisible();
  await expect(count).toBeGreaterThan(0);
});

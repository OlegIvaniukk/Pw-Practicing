import { test, expect } from "./fixtures/baseFixtures";

test("Remove Products From Cart", async ({ validatedPage }) => {
  const firstProduct = validatedPage.locator(".single-products").first();
  await firstProduct.hover();
  await validatedPage.waitForTimeout(300);
  await firstProduct.locator(".product-overlay .add-to-cart").click();
  await validatedPage.locator(".modal-footer > .btn.btn-success").click();
  await validatedPage.getByRole("link", { name: " Cart" }).click();
  await expect(validatedPage).toHaveURL(/\/view_cart$/);
  await expect(validatedPage.locator('#product-1')).toBeVisible();
  await validatedPage.locator('.cart_quantity_delete').click();

  await expect(validatedPage.locator('#product-1')).not.toBeVisible();
  await expect(validatedPage.getByText("Cart is empty!")).toBeVisible();
});

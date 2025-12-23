import { test, expect } from "./fixtures/baseFixtures";

test("Add products to cart", async ({ validatedPage }) => {
  await validatedPage
    .locator(".navbar-nav")
    .getByRole("link", { name: "Products" })
    .click();
  const firstProduct = validatedPage.locator(".single-products").first();
  await firstProduct.hover();
  await validatedPage.waitForTimeout(300);
  await firstProduct.locator(".product-overlay .add-to-cart").click();
  await validatedPage.locator(".modal-footer > .btn.btn-success").click();
  const secondProduct = validatedPage.locator(".single-products").nth(1);
  await secondProduct.hover();
  await validatedPage.waitForTimeout(300);
  await secondProduct.locator(".product-overlay .add-to-cart").click();
  await validatedPage.getByRole("link", { name: "View Cart" }).click();
  const addedProducts = [
    { id: "1", price: 500, quantity: 1 },
    { id: "2", price: 400, quantity: 1 },
  ];
  for (const product of addedProducts) {
    const productRow = validatedPage.locator(`#product-${product.id}`);
    const priceText = await productRow.locator(".cart_price p").innerText();
    const quantityText = await productRow
      .locator(".cart_quantity button")
      .innerText();
    const totalText = await productRow.locator(".cart_total p").innerText();

    const price = Number(priceText.replace(/\D/g, ""));
    const quantity = Number(quantityText);
    const total = Number(totalText.replace(/\D/g, ""));

    await expect(price).toBe(product.price);
    await expect(quantity).toBe(product.quantity);
    await expect(total).toBe(price * quantity);
  }
});

import { test, expect } from "../fixtures/baseFixtures";

test("Place Order Register before Checkout", async ({ validatedPage }) => {
  const userEmail = "olegivaniuk123@gmail.com"; // Replace with a valid registered email
  const userPassword = "123"; // Replace with a valid registered password
  const userName = "Oleg"; // Replace with a valid registered username

  await validatedPage.getByRole("link", { name: "  Signup / Login" }).click();
  await validatedPage
    .locator('[data-qa="login-email"]')
    .first()
    .fill(userEmail);
  await validatedPage
    .locator('[data-qa="login-password"]')
    .first()
    .fill(userPassword);
  await validatedPage.getByRole("button", { name: "Login" }).click();
  await expect(
    validatedPage.getByText(`Logged in as ${userName}`)
  ).toBeVisible();

  // Add products to cart
  const firstProduct = validatedPage.locator(".single-products").first();
  await firstProduct.hover();
  await validatedPage.waitForTimeout(300);
  await firstProduct.locator(".product-overlay .add-to-cart").click();
  await validatedPage.locator(".modal-footer > .btn.btn-success").click();
  const secondProduct = validatedPage.locator(".single-products").nth(1);
  await secondProduct.hover();
  await validatedPage.waitForTimeout(300);
  await secondProduct.locator(".product-overlay .add-to-cart").click();
  // Переходимо до кошика
  await validatedPage.getByRole("link", { name: " Cart" }).click();
  // Перевіряємо URL
  await expect(validatedPage).toHaveURL(/\/view_cart$/);
  await validatedPage.getByText("Proceed To Checkout").click();
  //Verify Address Details and Review Your Order
  const deliveryBox = validatedPage.locator("#address_delivery");
  const items = deliveryBox.locator("li");
  const count = await items.count();

  for (let i = 0; i < count; i++) {
    await expect(items.nth(i)).toBeVisible();
  }
  const orderTable = validatedPage.locator("#cart_info");
  await expect(orderTable).toBeVisible();

  // Локатор для всіх рядків товарів у кошику
  const productRows = orderTable.locator('tr[id^="product-"]');

  const prodCount = await productRows.count();
  expect(prodCount).toBeGreaterThan(0); // перевірка, що товари є у кошику

  for (let i = 0; i < prodCount; i++) {
    const row = productRows.nth(i);

    const price = row.locator(".cart_price p");
    const quantity = row.locator(".cart_quantity button");
    const total = row.locator(".cart_total .cart_total_price");

    await expect(price).not.toBeEmpty();
    await expect(quantity).not.toBeEmpty();
    await expect(total).not.toBeEmpty();
  }

  // Перевірка, що є рядок з Total Amount
  const totalRow = orderTable.locator("tr", { hasText: "Total Amount" });
  await expect(totalRow).not.toBeEmpty();

  // Перевірка, що остання ціна підсумку не порожня
  const finalTotal = validatedPage.locator(".cart_total_price").last();
  await expect(finalTotal).not.toBeEmpty();

  //Enter description in comment text area
  await validatedPage
    .locator('textarea[name="message"]')
    .fill("Test order message");
  await validatedPage.getByRole("link", { name: "Place Order" }).click();

  //Fill payment details: Name on Card, Card Number, CVC, Expiration date
  await validatedPage.locator('input[data-qa="name-on-card"]').fill("Oleg");
  await validatedPage.locator('input[data-qa="card-number"]').fill("1234 5678 9012 3456");
  await validatedPage.locator('input[data-qa="cvc"]').fill("123");
  await validatedPage.locator('input[data-qa="expiry-month"]').fill("12");
  await validatedPage.locator('input[data-qa="expiry-year"]').fill("2025");
  await validatedPage.locator('button[data-qa="pay-button"]').click();

  //Verify success message "Your order has been placed successfully!"
  await expect(
    validatedPage.getByText("Congratulations! Your order has been confirmed!")
  ).toBeVisible();

  //Delete Account
  await validatedPage.getByRole("link", { name: "Delete Account" }).click();
  await expect(
    validatedPage.getByRole("heading", { name: "Account Deleted!" })
  ).toBeVisible();
  await validatedPage.locator('a[data-qa="continue-button"]').click();

});

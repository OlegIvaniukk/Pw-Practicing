import { test, expect } from "../fixtures/baseFixtures";

test("Download Invoice after purchase order", async ({ validatedPage }) => {
  // Add product to cart
  const firstProduct = validatedPage.locator(".single-products").first();
  await firstProduct.hover();
  await validatedPage.waitForTimeout(300);
  await firstProduct.locator(".product-overlay .add-to-cart").click();
  //   await validatedPage.locator(".modal-footer > .btn.btn-success").click();
  await validatedPage.getByRole("link", { name: "View Cart" }).click();
  await expect(validatedPage).toHaveURL(/\/view_cart$/);
  await validatedPage.getByText("Proceed To Checkout").click();

  //Signup
  await validatedPage.getByRole("link", { name: "Register / Login" }).click();
  await validatedPage.locator('input[data-qa="signup-name"]').fill("Oleg");
  await validatedPage
    .locator('input[data-qa="signup-email"]')
    .fill("testemailoleh3@gmail.com");
  await validatedPage.locator('[data-qa="signup-button"]').click();

  //Fill page details: Title, Name, Email, Password, Date of birth etc.
  await validatedPage.getByRole("radio", { name: "Mr." }).check();
  await validatedPage.locator('input[data-qa="password"]').fill("Test123");
  await validatedPage.locator('select[data-qa="days"]').selectOption("10");
  await validatedPage.locator('select[data-qa="months"]').selectOption("June");
  await validatedPage.locator('select[data-qa="years"]').selectOption("2020");
  await validatedPage
    .getByRole("checkbox", { name: "Sign up for our newsletter!" })
    .check();
  await validatedPage
    .getByRole("checkbox", {
      name: "Receive special offers from our partners!",
    })
    .check();
  await validatedPage.locator('input[data-qa="first_name"]').fill("Oleg");
  await validatedPage.locator('input[data-qa="last_name"]').fill("Ivaniuk");
  await validatedPage.locator('input[data-qa="company"]').fill("TestCompany");
  await validatedPage.locator('input[data-qa="address"]').fill("TestAdress");
  await validatedPage.locator('input[data-qa="address2"]').fill("Test 100 2");
  await validatedPage
    .locator('select[data-qa="country"]')
    .selectOption("Canada");
  await validatedPage.locator('input[data-qa="state"]').fill("TestState");
  await validatedPage.locator('input[data-qa="city"]').fill("TestCity");
  await validatedPage.locator('input[data-qa="zipcode"]').fill("A1B2C3");
  await validatedPage
    .locator('input[data-qa="mobile_number"]')
    .fill("+1234567890");
  await validatedPage.locator('button[data-qa="create-account"]').click();
  await validatedPage.locator('a[data-qa="continue-button"]').click();
  await expect(validatedPage.getByText("Logged in as Oleg")).toBeVisible();
  await validatedPage.getByRole("link", { name: " Cart" }).click();
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

  await validatedPage
    .locator('textarea[name="message"]')
    .fill("Test order message");
  await validatedPage.getByRole("link", { name: "Place Order" }).click();

  //Fill payment details
  await validatedPage
    .locator('input[data-qa="name-on-card"]')
    .fill("Oleg Ivaniuk");
  await validatedPage
    .locator('input[data-qa="card-number"]')
    .fill("1234 5678 9012 3456");
  await validatedPage.locator('input[data-qa="cvc"]').fill("123");
  await validatedPage.locator('input[data-qa="expiry-month"]').fill("12");
  await validatedPage.locator('input[data-qa="expiry-year"]').fill("2025");
  await validatedPage.locator('button[data-qa="pay-button"]').click();
  await expect(
    validatedPage.getByText("Congratulations! Your order has been confirmed!")
  ).toBeVisible();

  //Download Invoice
  const downloadPromise = validatedPage.waitForEvent("download");
  await validatedPage.getByRole("link", { name: "Download Invoice" }).click();
  const download = await downloadPromise;
  const filePath = await download.saveAs(download.suggestedFilename());
  expect(filePath).not.toBeNull();
  expect(download.suggestedFilename()).toBe("invoice.txt");

  await validatedPage.getByRole("link", { name: "Continue" }).click();

  //Delete Account
  await validatedPage.getByRole("link", { name: "Delete Account" }).click();
  await expect(
    validatedPage.getByRole("heading", { name: "Account Deleted!" })
  ).toBeVisible();
  await validatedPage.getByRole("link", { name: "Continue" }).click();
});

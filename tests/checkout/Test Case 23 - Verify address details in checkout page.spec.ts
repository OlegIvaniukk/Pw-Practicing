import { test, expect } from "../fixtures/baseFixtures";

test("Verify address details in checkout page", async ({ validatedPage }) => {
  await validatedPage.getByRole("link", { name: " Signup / Login" }).click();
  await validatedPage.locator('[data-qa="signup-name"]').fill("TestUser");
  await validatedPage
    .locator('[data-qa="signup-email"]')
    .fill("TestUserOleg123@gmail.com");
  await validatedPage.getByRole("button", { name: "Signup" }).click();

  const expectedAddress = {
    firstName: "Oleg",
    lastName: "Ivaniuk",
    company: "TestCompany",
    address1: "Dubenska 62",
    address2: "Test 100 2",
    city: "TestCity",
    state: "TestState",
    postcode: "A1B2C3",
    country: "Canada",
    phone: "+1234567890",
  };

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
  await validatedPage
    .locator('input[data-qa="first_name"]')
    .fill(expectedAddress.firstName);
  await validatedPage
    .locator('input[data-qa="last_name"]')
    .fill(expectedAddress.lastName);
  await validatedPage
    .locator('input[data-qa="company"]')
    .fill(expectedAddress.company);
  await validatedPage
    .locator('input[data-qa="address"]')
    .fill(expectedAddress.address1);
  await validatedPage
    .locator('input[data-qa="address2"]')
    .fill(expectedAddress.address2);
  await validatedPage
    .locator('select[data-qa="country"]')
    .selectOption(expectedAddress.country);
  await validatedPage
    .locator('input[data-qa="state"]')
    .fill(expectedAddress.state);
  await validatedPage
    .locator('input[data-qa="city"]')
    .fill(expectedAddress.city);
  await validatedPage
    .locator('input[data-qa="zipcode"]')
    .fill(expectedAddress.postcode);
  await validatedPage
    .locator('input[data-qa="mobile_number"]')
    .fill(expectedAddress.phone);
  await validatedPage.locator('button[data-qa="create-account"]').click();

  //Verify that ACCOUNT CREATED
  await expect(
    validatedPage.getByRole("heading", { name: "Account Created!" })
  ).toBeVisible();
  await validatedPage.locator('a[data-qa="continue-button"]').click();
  await expect(validatedPage.getByText("Logged in as TestUser")).toBeVisible();

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
  await validatedPage.getByRole("link", { name: "View Cart" }).click();
  await expect(validatedPage).toHaveURL(/\/view_cart$/);
  await validatedPage.getByText("Proceed To Checkout").click();

  // Verify delivery address details in checkout page
  const deliveryAddress = validatedPage.locator("#address_delivery");

  await expect(
    deliveryAddress.locator(".address_firstname.address_lastname")
  ).toContainText(`${expectedAddress.firstName} ${expectedAddress.lastName}`);

  await expect(deliveryAddress.locator(".address_address1.address_address2").nth(0)).toContainText(
    expectedAddress.company
  );

  await expect(deliveryAddress.locator(".address_address1.address_address2").nth(1)).toContainText(
    expectedAddress.address1
  );

  await expect(deliveryAddress.locator(".address_address1.address_address2").nth(2)).toContainText(
    expectedAddress.address2
  );

  await expect(
    deliveryAddress.locator(".address_city.address_state_name.address_postcode")
  ).toContainText(
    `${expectedAddress.city} ${expectedAddress.state} ${expectedAddress.postcode}`
  );

  await expect(deliveryAddress.locator(".address_country_name")).toHaveText(
    expectedAddress.country
  );

  await expect(deliveryAddress.locator(".address_phone")).toHaveText(
    expectedAddress.phone
  );

  //Verify billing address details in checkout page
  const billingAddress = validatedPage.locator("#address_invoice");

  await expect(
    billingAddress.locator(".address_firstname.address_lastname")
  ).toContainText(`${expectedAddress.firstName} ${expectedAddress.lastName}`);

  await expect(billingAddress.locator(".address_address1.address_address2").nth(0)).toContainText(
    expectedAddress.company
  );

  await expect(billingAddress.locator(".address_address1.address_address2").nth(1)).toContainText(
    expectedAddress.address1
  );

  await expect(billingAddress.locator(".address_address1.address_address2").nth(2)).toContainText(
    expectedAddress.address2
  );

  await expect(
    billingAddress.locator(".address_city.address_state_name.address_postcode")
  ).toContainText(
    `${expectedAddress.city} ${expectedAddress.state} ${expectedAddress.postcode}`
  );

  await expect(billingAddress.locator(".address_country_name")).toHaveText(
    expectedAddress.country
  );

  await expect(billingAddress.locator(".address_phone")).toHaveText(
    expectedAddress.phone
  );

  //Delete Account
  await validatedPage.getByRole("link", { name: "Delete Account" }).click();
  await expect(
    validatedPage.getByRole("heading", { name: "Account Deleted!" })
  ).toBeVisible();
  await validatedPage.locator('a[data-qa="continue-button"]').click();
});

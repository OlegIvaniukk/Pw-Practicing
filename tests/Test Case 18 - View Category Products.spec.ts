import { test, expect } from "./fixtures/baseFixtures";

test("View Category Products", async ({ validatedPage }) => {
  await expect(validatedPage.locator("#accordian")).toBeVisible();
  await validatedPage.getByRole("link", { name: "Women" }).click();
  await validatedPage.getByRole("link", { name: "Dress " }).click();
  await expect(validatedPage.getByText("Women - Dress Products")).toBeVisible();
  await validatedPage.getByRole('link', { name: ' Men' }).click();
  await validatedPage.getByRole("link", { name: "JEANS " }).click();
  await expect(validatedPage.getByText("Men - Jeans Products")).toBeVisible();
});

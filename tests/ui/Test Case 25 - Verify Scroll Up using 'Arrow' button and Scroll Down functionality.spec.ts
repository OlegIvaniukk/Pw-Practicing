import { test, expect } from "../fixtures/baseFixtures";

test("Verify Scroll Up using 'Arrow' button and Scroll Down functionality", async ({
  validatedPage,
}) => {
  await validatedPage.locator("footer").scrollIntoViewIfNeeded();
  await expect(
    validatedPage.getByRole("heading", { name: "Subscription" })
  ).toBeVisible();
  await validatedPage.locator("#scrollUp").click();
  await expect(
    validatedPage.getByRole("heading", {
      name: "Full-Fledged practice website for Automation Engineers",
    })
  ).toBeVisible();
});

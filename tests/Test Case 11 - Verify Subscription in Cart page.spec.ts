import { test, expect } from "./fixtures/baseFixtures";

test("Verify Chart page", async ({ validatedPage }) => {
  await validatedPage.getByRole("link", { name: " Cart" }).click();
  await validatedPage.locator("#footer").scrollIntoViewIfNeeded();
  await expect(validatedPage.getByText("Subscription")).toBeVisible();
  await validatedPage
    .getByPlaceholder("Your email address")
    .fill("test@example.com");
  await validatedPage.locator("#subscribe.btn.btn-default").click();
  await expect(
    validatedPage.locator("#success-subscribe", {
      hasText: "You have been successfully subscribed!",
    })
  ).toBeVisible();
});

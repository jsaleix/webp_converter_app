import { test, expect } from "@playwright/test";

const URL = "http://localhost:5173/";

test("has title", async ({ page }) => {
    await page.goto(URL);

    await expect(page).toHaveTitle("Convert your webp files locally");
});

test("Can start conversion", async ({ page }) => {
    await page.goto(URL);

    const selectInputBtn = page.getByTestId("select-btn");
    const convertFileBtn = page.getByTestId("convert-btn");
    const filesPreviewDiv = page.getByTestId("files-preview-container");

    // Default: Convert btn disabled + no preview div
    await expect(convertFileBtn).toBeDisabled();
    await expect(filesPreviewDiv).toHaveCount(0);

    // Add an item: button enabled + preview files div
    await selectInputBtn.setInputFiles("./tests/assets/image.webp");
    await expect(convertFileBtn).toBeEnabled();
    await expect(filesPreviewDiv).toBeVisible();
});

test("Only accepts right file type", async ({ page }) => {
    await page.goto(URL);

    const selectInputBtn = page.getByTestId("select-btn");
    const filesPreviewDiv = page.getByTestId("files-preview-container");
    const filesItems = filesPreviewDiv.locator(">div");
    const switchBtn = page.getByTestId("switch-format-btn");

    await selectInputBtn.setInputFiles("./tests/assets/image.jpeg");
    await expect(filesItems).toHaveCount(0);
    await selectInputBtn.setInputFiles("./tests/assets/image.webp");
    await expect(filesItems).toHaveCount(1);

    await switchBtn.click();
    await selectInputBtn.setInputFiles("./tests/assets/image.webp");
    await expect(filesItems).toHaveCount(0);
    await selectInputBtn.setInputFiles("./tests/assets/image.jpeg");
    await expect(filesItems).toHaveCount(1);
});

test("Can delete an item", async ({ page }) => {
    await page.goto(URL);

    const selectInputBtn = page.getByTestId("select-btn");
    const filesPreviewDiv = page.getByTestId("files-preview-container");
    const convertFileBtn = page.getByTestId("convert-btn");

    // Adds two files
    await selectInputBtn.setInputFiles([
        "./tests/assets/image.webp",
        "./tests/assets/image.webp",
    ]);

    const filesItems = filesPreviewDiv.locator(">div");

    // It should contain two children
    await expect(filesItems).toHaveCount(2);

    // Remove one: filesPreviewDiv should only dislpay one file now
    await expect(filesPreviewDiv).toBeVisible();
    await filesItems.nth(0).click();
    await expect(filesPreviewDiv).toHaveCount(1);

    // Remove the second one: filesPreviewDiv should not appear anymore
    await filesItems.nth(0).click();
    await expect(filesPreviewDiv).toHaveCount(0);
    await expect(convertFileBtn).toBeDisabled();
});

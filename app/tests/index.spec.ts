import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    const URL = "http://localhost:5173/";
    await page.goto(URL);
});

test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Convert your webp files locally");
});

test("Can start conversion", async ({ page }) => {
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

// These tests are not working while running playwright in ui mode
test.describe("Conversion tests", () => {
    test("Try webp to jpeg", async ({ page }) => {
        const selectInputBtn = page.getByTestId("select-btn");
        const convertFileBtn = page.getByTestId("convert-btn");

        await selectInputBtn.setInputFiles("./tests/assets/image.webp");
        await convertFileBtn.click();

        const downloadPromise = page.waitForEvent("download");
        const download = await downloadPromise;

        // await download.saveAs(
        //     "./tests/assets/downloads/" + download.suggestedFilename()
        // );

        await expect(download.suggestedFilename()).toBe("image.jpeg");
    });

    test("Try jpeg to webp", async ({ page }) => {
        const selectInputBtn = page.getByTestId("select-btn");
        const convertFileBtn = page.getByTestId("convert-btn");
        const switchBtn = page.getByTestId("switch-format-btn");

        await switchBtn.click();

        await selectInputBtn.setInputFiles("./tests/assets/image.jpeg");
        await convertFileBtn.click();

        const downloadPromise = page.waitForEvent("download");
        const download = await downloadPromise;

        await expect(download.suggestedFilename()).toBe("image.webp");
    });
});

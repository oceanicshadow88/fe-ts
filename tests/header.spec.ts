import { test, expect } from '@playwright/test';

test.describe('click Features in the header', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should see the popup window with Kanban board, Report and My work sections', async ({ page }) => {
    await page.getByTestId('features').click();
    
    // Check that the service titles contain the expected text
    const serviceTitles = page.getByTestId('service-title');
    await expect(serviceTitles.nth(0)).toContainText('Kanban boards');
    await expect(serviceTitles.nth(1)).toContainText('Report');
    await expect(serviceTitles.nth(2)).toContainText('My work');
  });

  test.describe('click feature to its related page', () => {
    test.beforeEach(async ({ page }) => {
      await page.getByTestId('features').click();
    });

    test('should go to kanban board page', async ({ page }) => {
      await page.getByTestId('service-title').nth(0).click();
      await expect(page).toHaveURL(/features\/kanban-board/);
    });

    test('should go to report page', async ({ page }) => {
      await page.getByTestId('service-title').nth(1).click();
      await expect(page).toHaveURL(/features\/report/);
    });

    test('should go to my work page', async ({ page }) => {
      await page.getByTestId('service-title').nth(2).click();
      await expect(page).toHaveURL(/features\/my-work/);
    });
  });
});

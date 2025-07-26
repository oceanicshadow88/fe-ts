import { test, expect } from '@playwright/test';

test.describe('login', () => {
  test.beforeEach(async ({ page }) => {
    // Mock the API call
    await page.route('**/api/v1/domains', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(true)
      });
    });
    
    await page.goto('/');
  });

  test('should able to see text', async ({ page }) => {
    await expect(page.getByTestId('header-text')).toContainText('An agile software that prevents delays.');
  });
});

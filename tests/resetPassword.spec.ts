import { test, expect } from '@playwright/test';

test.describe('forget password page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login/reset-password');
  });

  test('should able to send forgetPassword Application', async ({ page }) => {
    await page.getByTestId('email').fill('coffeetsang20@gmail.com');
    await page.getByTestId('next').click();
  });

  test('should show not null require', async ({ page }) => {
    await page.getByTestId('next').click();
    
    const emailInput = page.getByTestId('email');
    const validationMessage = await emailInput.evaluate((el: HTMLInputElement) => el.validationMessage);
    expect(validationMessage).toBe('Please fill out this field.');
  });

  test('should show require valide email address', async ({ page }) => {
    await page.getByTestId('email').fill('123');
    await page.getByTestId('next').click();
    
    const emailInput = page.getByTestId('email');
    const validationMessage = await emailInput.evaluate((el: HTMLInputElement) => el.validationMessage);
    expect(validationMessage).toBe("Please include an '@' in the email address. '123' is missing an '@'.");
  });
});

import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-object-model/LoginPage';
import { validUser, invalidUser } from '../fixtures/testData';

// Login Tests
test.describe('Login Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    // Setup: open browser and go to login page
    await page.goto('/login');
    loginPage = new LoginPage(page);
  });

  test.afterEach(async ({ page }) => {
    // Teardown: close page
    await page.close();
  });


  test('Login Success: shows welcome message', async ({ page }) => {
    const homePage = await loginPage.login(validUser.username, validUser.password);
    const welcomeMessage = await homePage.getWelcomeMessage();
    expect(welcomeMessage).toContain('johndoe19');
  });

  test('Login Failure A: wrong credentials shows error', async ({ page }) => {
    await loginPage.login(invalidUser.username, invalidUser.password);
    await loginPage.page.waitForSelector('#message'); // wait for error message to appear
    await expect(await loginPage.getErrorMessage()).toContain('Wrong credentials');
  });

  test('Login Failure B: blank credentials shows error', async ({ page }) => {
    await loginPage.login('', '');
    await loginPage.page.waitForSelector('#message'); // wait for error message to appear
    await expect(await loginPage.getErrorMessage()).toContain('Fields can not be empty');
  });
});




import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-object-model/LoginPage';
import { HomePage } from '../page-object-model/HomePage';
import { GridPage } from '../page-object-model/GridPage';

test.describe('Grid Items Tests', () => {
    let loginPage: LoginPage;
    let homePage: HomePage;
    let gridPage: GridPage;

  test.beforeEach(async ({ page }) => {
    // Setup: open browser and go to login page
    await page.goto('/login');
    loginPage = new LoginPage(page);
    homePage = await loginPage.login('johndoe19', 'supersecret');
    gridPage = await homePage.goToGridPage();
    expect(await gridPage.page.url()).toContain('/grid');
  });

    test.afterEach(async ({ page, browser }) => {
    // Teardown: close page
    await page.close();
  });

    test('Grid Item Test', async ({ page }) => {
        const itemName = await gridPage.getItemName(6);
        expect(itemName).toBe('Super Pepperoni');
        const itemPrice = await gridPage.getItemPrice(6);
        expect(itemPrice).toBe('$10');
    });


    test('Grid All Items Test', async ({ page }) => {
        const allItems = await gridPage.getAllItems();
        console.log(`Total items found: ${allItems}`);
        for (let i = 0; i < allItems.length; i++) {
            const itemName = await gridPage.getItemName(i);
            const itemPrice = await gridPage.getItemPrice(i);
            const itemButtonDisplayed = await gridPage.itemButtonDisplayed(i);
            await expect(itemName).not.toBeNull();
            await expect(itemPrice).not.toBeNull();
            await expect(itemButtonDisplayed).toBe(true);
            console.log(`Item ${i + 1}: Name=${itemName}, Price=${itemPrice}`);
        }
    });

});
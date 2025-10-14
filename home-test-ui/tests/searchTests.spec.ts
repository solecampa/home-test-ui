import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-object-model/LoginPage';
import { HomePage } from '../page-object-model/HomePage';
import { SearchPage } from '../page-object-model/SearchPage';

test.describe('Search Tests', () => {
    let loginPage: LoginPage;
    let homePage: HomePage;
    let searchPage: SearchPage;

  test.beforeEach(async ({ page }) => {
    // Setup: open browser and go to login page
    await page.goto('/login');
    loginPage = new LoginPage(page);
    homePage = await loginPage.login('johndoe19', 'supersecret');
    searchPage = await homePage.goToSearchPage();
    expect(await searchPage.page.url()).toContain('/search');
  });

  test.afterEach(async ({ page, browser }) => {
    // Teardown: close page
    await page.close();
  });
  

  test('Search funcionality', async ({ page }) => {
    await searchPage.search('Automation');
    await page.waitForTimeout(3000); // wait for results to load
    const resultMessage = await searchPage.getResultMessage();
    expect(resultMessage).toContain('Found one result for Automation');
  });

  test('Search empty', async ({ page }) => {
    await searchPage.search('');
    await page.waitForTimeout(4000); // wait for results to load
    const resultMessage = await searchPage.getResultMessage();
    expect(resultMessage).toContain("Please provide a search word.");
  });   

});

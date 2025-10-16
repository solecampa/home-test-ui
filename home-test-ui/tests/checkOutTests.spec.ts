import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-object-model/LoginPage';
import { HomePage } from '../page-object-model/HomePage';
import { CheckoutPage } from '../page-object-model/CheckoutPage';

import { formData } from '../fixtures/testData';
import { OrderPage } from '../page-object-model/OrderPage';

// Checkout Form Tests
test.describe('Checkout Form Tests', () => {
    let loginPage: LoginPage;
    let homePage: HomePage;
    let checkoutPage: CheckoutPage;
    let orderPage: OrderPage;

    test.beforeEach(async ({ page }) => {
        // Setup: open browser and go to login page
        await page.goto('/login');
        loginPage = new LoginPage(page);
        homePage = await loginPage.login('johndoe19', 'supersecret');
        checkoutPage = await homePage.goToFormPage();
        expect(await checkoutPage.page.url()).toContain('/checkout');
    });

    test.afterEach(async ({ page, browser }) => {
        // Teardown: close page
        await page.close();
    });


    test('Checkout Form Order Success', async ({ page }) => {
        await checkoutPage.fillForm(formData);

        //Verify if checkbox is checked, if not check it then submit the form
        if(await checkoutPage.shippingCheckbox.isChecked()){
            orderPage = await checkoutPage.submit();
        }else{
            await checkoutPage.shippingCheckbox.check();
            orderPage = await checkoutPage.submit();
        }
        expect(await orderPage.getOrderConfirmationNumber()).not.toBeNull();
    });

    test('Checkout Form Alert', async ({ page }) => {
        await checkoutPage.fillForm(formData);
        // Ensure the checkbox is unchecked to trigger the alert
        if (await checkoutPage.shippingCheckbox.isChecked()) {
            await checkoutPage.shippingCheckbox.uncheck();
        }
        let dialogHandled = false;
        page.once('dialog', async dialog => {
            expect(dialog.message()).toContain('Shipping address same as billing checkbox must be selected.');
            await dialog.accept();
            dialogHandled = true;
        });
        await checkoutPage.submit();
        await page.waitForTimeout(500); // WWait to ensure dialog is handled
        expect(dialogHandled).toBe(true); // Optional: ensure dialog was captured
    });

    test('Calculate Cart Total', async () => {
        const calculatedTotal = await checkoutPage.calculateCartTotal();
        const displayedTotalText = await checkoutPage.totalPriceLocator.textContent();
        expect(displayedTotalText).toEqual(`$${calculatedTotal}`);
    });

});
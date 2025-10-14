import { Page } from '@playwright/test';

export class OrderPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async getOrderConfirmationNumber(): Promise<string | null> {
        return this.page.locator('[data-id="ordernumber"]').textContent();
    }
}


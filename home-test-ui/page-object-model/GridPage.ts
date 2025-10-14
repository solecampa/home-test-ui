import { Locator, Page } from '@playwright/test';

export class GridPage {
  readonly page: Page;
  readonly itemName: Locator;
  readonly itemPrice: Locator;
  readonly itemButton: Locator;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/grid');
  }

  async getItemAt(position: number) {
    return this.page.locator('#menu').locator('.item').nth(position);
  }

  async getAllItems(): Promise<Locator[]> {
    return await this.page.locator('#menu').locator('.item').all();
  }

  async getItemPrice(position: number) {
    const itemPrice = (await this.getItemAt(position)).locator('#item-price');
    return itemPrice.textContent();
  }
  async getItemName(position: number) {
    const itemName = (await this.getItemAt(position)).locator('[data-test-id="item-name"]');
    return itemName.textContent();
  }

  async itemButtonDisplayed(position: number): Promise<boolean> {
    const itemButton = (await this.getItemAt(position)).locator('[data-test-id="add-to-order"]');
    return itemButton.isVisible();
  }

}

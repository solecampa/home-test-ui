import { Page } from '@playwright/test';
import { CheckoutPage } from './CheckoutPage';
import { GridPage } from './GridPage';
import { SearchPage } from './SearchPage';

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
    
  }

  async getWelcomeMessage() {
    return this.page.textContent('#welcome-message');
  }

  async goToFormPage() {
    await this.page.getByRole('link', { name: 'Form' }).click();
    return new CheckoutPage(this.page);
  }

  async goToGridPage() {
    await this.page.getByRole('link', { name: 'Grid' }).click();
    return new GridPage(this.page);
  }

  async goToSearchPage() {  
    await this.page.getByRole('link', { name: 'Search' }).click();
    return new SearchPage(this.page);
  }
}
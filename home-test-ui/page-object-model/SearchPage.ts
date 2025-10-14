import { Page } from '@playwright/test';

export class SearchPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/search');
  }

  async search(word: string) {
    const searchbox = await this.page.getByRole('textbox', { name: 'Search..' });
    await searchbox.fill(word);
    await this.page.click('button[type="submit"]');
  }

  async getResultMessage(): Promise<string | null> {
    return this.page.textContent('#result');
  }
}

// Page Object Model for Login Page
import { Page } from '@playwright/test';

import { HomePage } from './HomePage';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async login(username: string, password: string): Promise<HomePage> {
    await this.page.getByRole('textbox', { name: 'USERNAME' }).fill(username);
    await this.page.getByRole('textbox', { name: 'PASSWORD' }).fill(password);
    await this.page.getByRole('button', { name: 'SIGN IN' }).click();
    return new HomePage(this.page);
  }

  async getErrorMessage(): Promise<string | null> {
    const message = await this.page.locator('#message').textContent();
    return message;
  }
}

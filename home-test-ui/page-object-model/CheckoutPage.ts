import { Locator, Page } from '@playwright/test';
import { OrderPage } from './OrderPage';
import { FormData } from '../utils/FormData';

export class CheckoutPage {
  readonly page: Page;
  readonly shippingCheckbox: Locator;
  readonly totalPriceLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.shippingCheckbox = this.page.getByRole('checkbox', { name: 'Shipping address same as billing' });
    this.totalPriceLocator = this.page.locator('.container p .price').last();
  }

  async goto() {
    await this.page.goto('/checkout');
  }

  async fillForm(data: FormData) {
    await this.page.getByRole('textbox', { name: 'Full Name' }).fill(data.fullName);
    await this.page.getByRole('textbox', { name: 'Email' }).fill(data.email);
    await this.page.getByRole('textbox', { name: 'Address' }).fill(data.address);
    await this.page.getByRole('textbox', { name: 'City' }).fill(data.city);
    await this.page.getByRole('textbox', { name: 'State' }).fill(data.state);
    await this.page.getByRole('textbox', { name: 'Zip' }).fill(data.zip);
    await this.page.getByRole('textbox', { name: 'Name on Card' }).fill(data.nameOnCard);
    await this.page.getByRole('textbox', { name: 'Credit card number' }).fill(data.cardNumber);
    await this.page.getByRole('combobox', { name: 'Exp Month' }).selectOption(data.expMonth);
    await this.page.getByRole('textbox', { name: 'Exp Year' }).fill(data.expYear);
    await this.page.getByRole('textbox', { name: 'CVV' }).fill(data.cvv);
  }

  async submit():Promise<OrderPage> {
    await this.page.getByRole('button', { name: 'Continue to checkout' }).click();
    return new OrderPage(this.page);
  }

    async calculateCartTotal(): Promise<number> {
    const productPrices = await this.page.locator('.container p .price').allTextContents();
    // Excluye el último elemento (el total)
    const pricesToSum = productPrices.slice(0, -1);
    const sum = pricesToSum.reduce((acc, priceText) => {
        const price = parseFloat(priceText.replace('$', ''));
        return acc + price;
    }, 0);
    return sum;
    }
}
import { Page, Locator, expect } from '@playwright/test';

class CartPage {
  private page: Page;
  private cartProducts: Locator;
  private productsText: Locator;
  private cart: Locator;
  private orders: Locator;
  private checkoutBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartProducts = page.locator('div li').first();
    this.productsText = page.locator('.card-body b');
    this.cart = page.locator("[routerlink*='cart']");
    this.orders = page.locator("button[routerlink*='myorders']");
    this.checkoutBtn = page.locator('text=Checkout');
  }

  async verifyProductIsDisplayed(productName: string) {
    await this.cartProducts.waitFor();
    const bool = await this.getProductLocator(productName).isVisible();
    expect(bool).toBeTruthy();
  }

  async checkout() {
    await this.checkoutBtn.click();
  }

  getProductLocator(productName: string) {
    return this.page.locator(`h3:has-text('${productName}')`);
  }
}

export { CartPage };

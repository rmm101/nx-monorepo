import { Page, Locator, expect } from '@playwright/test';

class OrdersReviewPage {
  private page: Page;
  private country: Locator;
  private dropdown: Locator;
  private emailId: Locator;
  private submit: Locator;
  private orderConfirmationText: Locator;
  private orderId: Locator;

  constructor(page: Page) {
    this.page = page;
    this.country = page.locator("[placeholder*='Country']");
    this.dropdown = page.locator('.ta-results');
    this.emailId = page.locator(".user__name [type='text']").first();
    this.submit = page.locator('.action__submit');
    this.orderConfirmationText = page.locator('.hero-primary');
    this.orderId = page.locator('.em-spacer-1 .ng-star-inserted');
  }

  async searchCountryAndSelect(countryCode: string, countryName: string) {
    await this.country.pressSequentially(countryCode);
    await this.dropdown.waitFor();
    const optionsCount = await this.dropdown.locator('button').count();
    for (let i = 0; i < optionsCount; ++i) {
      const text = await this.dropdown.locator('button').nth(i).textContent();
      if (text?.trim() === countryName) {
        await this.dropdown.locator('button').nth(i).click();
        break;
      }
    }
  }

  async verifyEmailId(username: string) {
    await expect(this.emailId).toHaveText(username);
  }

  async submitAndGetOrderId() {
    await this.submit.click();
    await expect(this.orderConfirmationText).toHaveText(
      ' Thankyou for the order. '
    );
    return await this.orderId.nth(0).textContent();
  }
}

export { OrdersReviewPage };

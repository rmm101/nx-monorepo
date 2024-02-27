import { Page, Locator } from 'playwright';

class LoginPage {
  private page: Page;
  private signInbutton: Locator;
  private userName: Locator;
  private password: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signInbutton = page.locator("[value='Login']");
    this.userName = page.locator('#userEmail');
    this.password = page.locator('#userPassword');
  }

  async navigateToDashboard() {
    await this.page.goto('https://rahulshettyacademy.com/client');
  }

  async validLogin(username: string, password: string) {
    await this.userName.fill(username);
    await this.password.fill(password);
    await this.signInbutton.click();
    // eslint-disable-next-line playwright/no-networkidle
    await this.page.waitForLoadState('networkidle');
  }
}

export { LoginPage };

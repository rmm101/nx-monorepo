import { test, expect, BrowserContext } from '@playwright/test';

import { POManager } from '../page-objects/POManager';
import dataset from '../utils/test-data.json';

const data = dataset[0];
let webContext: BrowserContext;

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  const poManager = new POManager(page);

  const loginPage = poManager.getLoginPage();
  await loginPage.navigateToDashboard();
  await loginPage.validLogin(data.username, data.password);

  //Save token in the playwright-storage-state.json file and inject into new Browser context to avoid loading and entering credentials in the login page for all the tests
  await context.storageState({ path: 'playwright-storage-state.json' });
  webContext = await browser.newContext({
    storageState: 'playwright-storage-state.json',
  });
});

test('Login using custom browser context', async () => {
  const page = await webContext.newPage();
  const poManager = new POManager(page);

  const loginPage = poManager.getLoginPage();
  await loginPage.navigateToDashboard();

  const dashboardPage = poManager.getDashboardPage();
  await dashboardPage.searchProductAddCart(data.productName);
  await dashboardPage.navigateToCart();

  const cartPage = poManager.getCartPage();
  await cartPage.verifyProductIsDisplayed(data.productName);
  await cartPage.checkout();

  const ordersReviewPage = poManager.getOrdersReviewPage();
  await ordersReviewPage.searchCountryAndSelect(data.countryCode, data.country);
  const orderId = await ordersReviewPage.submitAndGetOrderId();

  await dashboardPage.navigateToOrders();

  const ordersHistoryPage = poManager.getOrdersHistoryPage();
  await ordersHistoryPage.searchOrderAndSelect(orderId || '');
  const expectedOrderId = await ordersHistoryPage.getOrderId();
  expect(orderId?.includes(expectedOrderId || '')).toBeTruthy();
});

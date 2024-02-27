import { test, expect, request, PlaywrightTestArgs } from '@playwright/test';

import { POManager } from '../page-objects/POManager';
import { APIUtils } from '../utils/api';
import dataset from '../utils/test-data.json';
import { mockedLoginPayload } from '../utils/mock-data';

let token: string;
const data = dataset[0];

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, mockedLoginPayload);
  token = await apiUtils.getToken();
});

test('Login using localstorage', async ({ page }: PlaywrightTestArgs) => {
  //Save token in localstorage to avoid loading and entering credentials in the login page for all the tests
  await page.addInitScript((value) => {
    window.localStorage.setItem('token', value);
  }, token);

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

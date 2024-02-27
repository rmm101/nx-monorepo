import { test, expect, request, PlaywrightTestArgs } from '@playwright/test';

import { POManager } from '../page-objects/POManager';
import { APIUtils } from '../utils/api';
import {
  CreatedOrder,
  mockedLoginPayload,
  mockedOrderPayload,
} from '../utils/mock-data';

let response: CreatedOrder;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, mockedLoginPayload);
  response = await apiUtils.createOrder(mockedOrderPayload);
});

test('Place an order', async ({ page }: PlaywrightTestArgs) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem('token', value);
  }, response.token);

  const poManager = new POManager(page);

  const loginPage = poManager.getLoginPage();
  await loginPage.navigateToDashboard();

  const dashboardPage = poManager.getDashboardPage();
  await dashboardPage.navigateToOrders();

  const ordersHistoryPage = poManager.getOrdersHistoryPage();
  await ordersHistoryPage.searchOrderAndSelect(response.orderId || '');
  const expectedOrderId = await ordersHistoryPage.getOrderId();
  expect(response.orderId?.includes(expectedOrderId || '')).toBeTruthy();
});

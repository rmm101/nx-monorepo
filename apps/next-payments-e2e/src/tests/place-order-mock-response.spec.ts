import { test, expect, request, PlaywrightTestArgs } from '@playwright/test';

import { POManager } from '../page-objects/POManager';
import { APIUtils } from '../utils/api';
import {
  CreatedOrder,
  mockedLoginPayload,
  mockedOrderPayload,
  mockedOrderResponse,
} from '../utils/mock-data';

let response: CreatedOrder;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, mockedLoginPayload);
  response = await apiUtils.createOrder(mockedOrderPayload);
});

test('Place an order mocking the response', async ({
  page,
}: PlaywrightTestArgs) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem('token', value);
  }, response.token);

  const poManager = new POManager(page);

  const loginPage = poManager.getLoginPage();
  await loginPage.navigateToDashboard();

  //Mock the response
  await page.route(
    'https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*',
    async (route) => {
      const response = await page.request.fetch(route.request());
      const body = JSON.stringify(mockedOrderResponse);
      route.fulfill({
        response,
        body,
      });
    }
  );

  const dashboardPage = poManager.getDashboardPage();
  await dashboardPage.navigateToOrders();

  //Intercept the response and replace it with the mocked one
  await page.waitForResponse(
    'https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*'
  );

  expect(page.locator('.mt-4')).toBeTruthy();
});

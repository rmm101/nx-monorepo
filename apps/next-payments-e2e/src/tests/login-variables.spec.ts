import { test, expect, PlaywrightTestArgs } from '@playwright/test';

import { POManager } from '../page-objects/POManager';
import { parameterizedTest } from '../utils/parameterizedTest';
import dataset from '../utils/test-data.json';

//Tests using a json file with variables
for (const data of dataset) {
  test('Login', async ({ page }: PlaywrightTestArgs) => {
    const poManager = new POManager(page);

    const loginPage = poManager.getLoginPage();
    await loginPage.navigateToDashboard();
    await loginPage.validLogin(data.username, data.password);

    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(data.productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.verifyProductIsDisplayed(data.productName);
    await cartPage.checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect(
      data.countryCode,
      data.country
    );
    const orderId = await ordersReviewPage.submitAndGetOrderId();

    await dashboardPage.navigateToOrders();

    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId || '');
    const expectedOrderId = await ordersHistoryPage.getOrderId();
    expect(orderId?.includes(expectedOrderId || '')).toBeTruthy();
  });
}

//Parameterized tests
parameterizedTest('Login (custom test)', async ({ page, testData }) => {
  const poManager = new POManager(page);

  const loginPage = poManager.getLoginPage();
  await loginPage.navigateToDashboard();
  await loginPage.validLogin(testData.username, testData.password);

  const dashboardPage = poManager.getDashboardPage();
  await dashboardPage.searchProductAddCart(testData.productName);
  await dashboardPage.navigateToCart();

  const cartPage = poManager.getCartPage();
  await cartPage.verifyProductIsDisplayed(testData.productName);
  await cartPage.checkout();
});

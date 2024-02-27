import { test, expect, PlaywrightTestArgs } from '@playwright/test';

import { POManager } from '../page-objects/POManager';
import dataset from '../utils/test-data.json';

const data = dataset[0];

test('View an order that does not belong to the user mocking the request', async ({
  page,
}: PlaywrightTestArgs) => {
  const poManager = new POManager(page);

  const loginPage = poManager.getLoginPage();
  await loginPage.navigateToDashboard();
  await loginPage.validLogin(data.username, data.password);

  const dashboardPage = poManager.getDashboardPage();
  await dashboardPage.navigateToOrders();

  //Intercept the request and change the url
  await page.route(
    'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*',
    (route) =>
      route.continue({
        url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6',
      })
  );

  await page.locator("button:has-text('View')").first().click();
  await expect(page.locator('p').last()).toHaveText(
    'You are not authorize to view this order'
  );
});

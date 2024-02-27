import { APIRequestContext } from 'playwright';

import { CreatedOrder, LoginPayload, OrderPayload } from './mock-data';

class APIUtils {
  private apiContext: APIRequestContext;
  private loginPayLoad: LoginPayload;

  constructor(apiContext: APIRequestContext, loginPayLoad: LoginPayload) {
    this.apiContext = apiContext;
    this.loginPayLoad = loginPayLoad;
  }

  async getToken(): Promise<string> {
    const loginResponse = await this.apiContext.post(
      'https://rahulshettyacademy.com/api/ecom/auth/login',
      {
        data: this.loginPayLoad,
      }
    );

    const loginResponseJson = await loginResponse.json();
    const token = loginResponseJson.token;
    return token;
  }

  async createOrder(orderPayLoad: OrderPayload): Promise<CreatedOrder> {
    const response: CreatedOrder = { token: '', orderId: '' };
    response.token = await this.getToken();
    const orderResponse = await this.apiContext.post(
      'https://rahulshettyacademy.com/api/ecom/order/create-order',
      {
        data: orderPayLoad,
        headers: {
          Authorization: response.token,
          'Content-Type': 'application/json',
        },
      }
    );
    const orderResponseJson = await orderResponse.json();
    const orderId = orderResponseJson.orders[0];
    response.orderId = orderId;
    return response;
  }
}

export { APIUtils };

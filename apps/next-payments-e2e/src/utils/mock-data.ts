export interface CreatedOrder {
  token: string;
  orderId: string;
}

export interface LoginPayload {
  userEmail: string;
  userPassword: string;
}

export interface OrderObject {
  country: string;
  productOrderedId: string;
}

export interface OrderPayload {
  orders: OrderObject[];
}

export interface OrderResponse {
  data: OrderObject[];
  message: string;
}

export const mockedOrderPayload: OrderPayload = {
  orders: [{ country: 'Cuba', productOrderedId: '6581ca399fd99c85e8ee7f45' }],
};

export const mockedLoginPayload: LoginPayload = {
  userEmail: 'anshika@gmail.com',
  userPassword: 'Iamking@000',
};

export const mockedOrderResponse: OrderResponse = {
  data: [],
  message: 'No Orders',
};

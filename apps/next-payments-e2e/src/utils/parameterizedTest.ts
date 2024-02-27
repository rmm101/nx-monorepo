import { test } from '@playwright/test';

export const parameterizedTest = test.extend<{
  testData: {
    username: string;
    password: string;
    productName: string;
  };
}>({
  testData: {
    username: 'anshika@gmail.com',
    password: 'Iamking@000',
    productName: 'ADIDAS ORIGINAL',
  },
});

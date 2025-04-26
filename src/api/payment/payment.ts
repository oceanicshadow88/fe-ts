import { paymentApi } from '../../config/api';

export const createCheckoutSession = (priceId: string, customerId: string) => {
  return paymentApi.post(`/createCheckoutSession`, { priceId, customerId });
};

export const createCustomerPortal = (customerId: string) => {
  return paymentApi.post(`/createCustomerPortal`, { customerId });
};

export const isCurrentPlanFree = () => {
  return paymentApi.get(`/isCurrentPlanFree`);
};

export const isCurrentPlanSubscribed = (priceId: string) => {
  return paymentApi.get(`/isCurrentPlanSubscribed`, { params: { priceId } });
};

export const getProductsInfo = () => {
  return paymentApi.get(`/productsInfo`);
};

export const getCurrentPlanId = () => {
  return paymentApi.get(`/currentPlanId`);
};

export const getCustomerId = () => {
  return paymentApi.get(`/customerId`);
};

export const getSubscriptionHistory = () => {
  return paymentApi.get(`/subscriptionHistory`);
};

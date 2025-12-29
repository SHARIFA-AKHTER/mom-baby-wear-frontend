/* eslint-disable @typescript-eslint/no-explicit-any */

import axiosInstance from "../utils/axiosInstance";


export const PaymentService = {
 
  async createOrder(orderPayload: any) {
  
    const response = await axiosInstance.post("/order", orderPayload);
    return response.data;
  },


  async initPayment(paymentPayload: any) {
    const response = await axiosInstance.post("/payments/ssl-init", paymentPayload);
    return response.data;
  }
};

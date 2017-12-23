export interface OrderQueryParams {
    merchantType?: string;
    orderStatus?: OrderState;
    page?: number;
}

export enum OrderState {
    all,
    waitPay=1,
    waitUse=2,
    waitRate=3,
    other=4
}
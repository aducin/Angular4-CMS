import { Config } from '../config';

export class Account {
	accessories: number;
    address: string;
    amount: string;
    amountFloat: number;
    book: number;
    car: number;
    cashTime: string;
    cashTimestamp: number;
    closed: number;
    coach: number;
    createTime: string;
    createTimestamp: number;
    element: number;
    id: number;
    locs: number;
    receipt: number;
    receiptTime: string;
    recipient: string;
    type: number;
    typeName: string;
}

export class Totals {
    amount: number;
    amountIt: number;
    locs: number;
    coach: number;
    element: number;
    accessories: number;
    book: number;
    car: number;
    tax: number;
    taxIt: number;
}

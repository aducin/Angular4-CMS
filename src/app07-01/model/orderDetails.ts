export class OrderDetails {
	payment: string;
    reference: string;
    totalPaid: number;
    totalProduct: number;
    totalShipment: number;
}

export class Discount {
    discountExtended: boolean;
    totalPaid: number;
    totalPaidDiscount: number;
    totalProduct: number;
    totalProductDiscount: number;
}
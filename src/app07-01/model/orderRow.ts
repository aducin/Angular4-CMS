export class OrderRow {
	attributeId: any;
    counter: number;
    cover: string;
    linkRewrite: string;
    productId: number;
    productName: string;
    productQuantity: number;
    quantity: any;
    reduction: string;
    totalPrice: string;
    totalPriceDiscount: string;
    unitPrice: string;
    unitPriceDiscount: string;
}

export class OrderModifiedRow {
    attributeId: any;
    baseDbQuantity: number;
    cover: string;
    id: number;
    linkRewrite: string;
    modification: string;
    name: string;
    ordered: number;
    quantityAfterChange: number;
    quantityBeforeChange: number;
}
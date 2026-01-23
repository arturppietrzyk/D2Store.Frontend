export type OrderProduct = {
    productId: string;
    name: string;
    description: string;
    decimalPrice: number;
    quantity: number;
    productImageId: string,
    location: string
}

export type Order = {
    orderId: string;
    userId: string;
    products: OrderProduct[];
    orderDate: string;
    totalAmount: number;
    status: string;
    lastModified: string;
}

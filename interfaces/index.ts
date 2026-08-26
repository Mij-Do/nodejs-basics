export interface IProduct {
    id: number;
    title: string;
    price: string;
    description: string;
    imageURL?: string;
}

export interface IProductBody {
    title: string;
    price: string;
    description: string;
}
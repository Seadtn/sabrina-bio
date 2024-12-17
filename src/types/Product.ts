export interface Product {
  id: number;
  image: Uint8Array;
  description: string;
  name: string;
  price: number;
  creationDate: string;
  inSold: boolean;
  startDate: string;
  lastDate: string;
}

export interface Command {
  id: number;
  products: Product[];
  status: Status;
  firstName: string;
  lastName: string;
  mail: string;
  phone: string;
  city: string;
  postalCode: number;
  paymentMethod: string;
  totalPrice: number;
}

export interface Category {
  id: number;
  name: string;
  products: Product[];
}

export enum Status {
    Pending = 'Pending',
    Accepted = 'CONFIRMED',
    Rejected = 'SHIPPED'
}
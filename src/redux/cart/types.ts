export type CartItem = {
  id: string;
	newId: number;
  title: string;
  maxQuantity:number,
  type: string,
  taste:string,
  option:string,
  price: number;
  imageUrl: string;
  sizes: [];
	size:[];
  count: number;
};

export interface CartSliceState {
	totalPrice: number;
	items: CartItem[];
	successModal: boolean;
	errorModal: boolean;
}
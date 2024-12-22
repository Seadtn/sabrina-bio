export interface FastViewSliceState {
    successFastViewModal: boolean; // Controls the visibility of the modal
    product: Product | null; // Holds the product details for fast view
  }
  
export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    description?: string;
    inSold?: boolean;
    soldRatio?: number;
    productNew?: boolean;
    creationDate?: string;
    startDate?: string;
    lastDate?: string;
  }
  

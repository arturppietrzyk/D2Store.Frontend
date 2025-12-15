// objects that map to the backend api response.  

export type ProductImage = {
  productImageId: string;
  location: string;
  isPrimary: boolean;
};

export type Product = {
  productId: string;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  addedDate: string;
  lastModified: string;
  images: ProductImage[];
  // need to add categories to the backend first for them to work here. 
  category?: string; 
};

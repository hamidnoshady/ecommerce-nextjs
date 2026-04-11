export type Money = {
  amount: number;
  currency: string;
};

export type Product = {
  id: number;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  image: string;
  gallery: string[];
  price: Money;
  compareAtPrice?: Money;
  categories: string[];
  badges?: string[];
};

export type CartLine = {
  key: string;
  product: Product;
  quantity: number;
};

export type Cart = {
  lines: CartLine[];
  subtotal: Money;
  discountTotal: Money;
};

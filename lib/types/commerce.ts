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


export type RawWooProduct = {
  id: number;
  slug: string;
  name: string;
  short_description?: string;
  description?: string;
  images?: Array<{ src: string }>;
  prices?: {
    currency_code?: string;
    currency_minor_unit?: number;
    price?: string;
    regular_price?: string;
  };
  categories?: Array<{ slug: string; name?: string }>;
  on_sale?: boolean;
};

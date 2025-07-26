type ProductType = {
  productName: string;
  slug: string;
  description?: any;
  categories: CategoryType[];
  variants: VariantType[];
};

type CategoryType = {
  categoryName: string;
};

type VariantType = {
  attributes: AttributesType[];
  inStock: boolean;
  quantity: number;
  price: PriceType;
  images: { url: string }[];
};

type AttributesType = {
  Key: string;
  Value: string;
};
type PriceType = {
  amount: number;
  currency: string;
  discount: DiscounType;
};
type DiscounType = {
  amount: number;
  valid_until: string;
};

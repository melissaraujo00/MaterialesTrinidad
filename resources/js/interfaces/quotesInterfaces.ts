export interface Product {
  id: number;
  name: string;
  priceWithTax: number; // Precio con IVA
  discountPrice: number | null; // Precio con descuento
  brand_id: string;
  category_id: string;
  image: string;
  stock: number;
  stockMinimum: number;
}

export interface CartItem extends Product {
  quantity: number;
  applyDiscount: boolean;
  totalPrice: number;
}

export interface Quote {
  id: number;
  customer_id: number;
  customer_name?: string;
  user_id: number;
  user_name?: string;
  date: string;
  subtotal: number; // Subtotal sin descuentos
  discount: number; // Total de descuentos aplicados
  total: number; // Total final
  status: 'pendiente' | 'confirmada' | 'cancelada' | 'venta';
  details: QuoteDetail[];
  created_at?: string;
  updated_at?: string;
}

export interface QuoteDetail {
  id?: number;
  quote_id?: number;
  product_id: number;
  product_name?: string;
  amount: number; // Cantidad (backend usa 'amount')
  price: number; // Precio unitario final
  subtotal: number; // Precio × Cantidad
  applyDiscount?: boolean;
  priceWithTax?: number;
  discountPrice?: number;
}

export interface QuoteFormData {
  customer_id: string;
  date: string;
  items: QuoteItemFormData[];
  discount: string | number;
  notes: string;
  status: string;
}

export interface QuoteItemFormData {
  product_id: string;
  quantity: string | number;
  price: string | number;
}

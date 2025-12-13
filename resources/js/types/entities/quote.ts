// ==========================================
// types/entities/quote.ts
// ==========================================

export interface Quote {
  id: number;
  customer_id: number;
  customer_name?: string; // Para mostrar en la tabla
  date: string;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  status: 'pendiente' | 'aprobada' | 'rechazada' | 'enviada';
  notes?: string;
  items: QuoteItem[];
  created_at?: string;
  updated_at?: string;
}

export interface QuoteItem {
  id?: number;
  quote_id?: number;
  product_id: number;
  product_name?: string; // Para mostrar
  quantity: number;
  price: number;
  subtotal: number;
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


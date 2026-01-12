// ==========================================
// types/entities/product.ts
// ==========================================

export interface Product {
  id: number;
  name: string;
  description: string;
  priceWithTax: number;
  discountPrice: number;
  stock: number;
  stockMinimun: number;
  category_id: number;
  brand_id: number;
  unit: string; // unidad de medida: m², kg, unidad, etc
  status: 'activo' | 'inactivo';
  image?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Category {
  id: number;
  name: string;
}
export interface Brand {
  id: number;
  name: string;
}
export interface ProductFormData {
  name: string;
  description: string;
  priceWithTax: number;
  discountPrice: string | number;
  stock: string | number;
  stockMinimun: number;
  brand_id: number;
  category_id: string;
  unit: string;
  status: string;
  image: string;
}




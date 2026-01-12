export interface Customer {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  nit: string;
  district_id: number;
  address: string;
  description: string;
  status: 'activo' | 'inactivo';
  created_at?: string;
  updated_at?: string;
}

export interface CustomerFormData {
  name: string;
  email: string;
  phoneNumber: string;
  nit: string;
  department_id: string;
  municipality_id: string;
  district_id: string;
  address: string;
  description: string;
  status: string;
}

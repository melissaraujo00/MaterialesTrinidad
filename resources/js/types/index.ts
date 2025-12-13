export interface Category {
    id: number;
    name: string;
    description: string;
    created_at?: string;
    updated_at?: string;
}
export * from './entities/customer';
export * from './common/location';
export * from './entities/product';

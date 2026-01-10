import { LucideIcon } from 'lucide-react';
export interface NavItem {
    title: string;
    href?: string;
    icon?: LucideIcon;
    permission?: string;
    children?: NavItem[];
}
export interface Brand {
    id: number;
    name: string;
    description: string;
}

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

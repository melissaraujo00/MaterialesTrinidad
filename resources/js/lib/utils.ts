import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { NavItem } from '@/types';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
export function filterNavItems(items: NavItem[], userPermissions: string[]): NavItem[] {
    return items
        .filter(item => !item.permission || userPermissions.includes(item.permission))
        .map(item => ({
            ...item,
            children: item.children ? filterNavItems(item.children, userPermissions) : undefined
        }))
        .filter(item => (item.href || (item.children && item.children.length > 0)));
}

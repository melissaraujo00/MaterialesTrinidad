import {
    LayoutGrid,
    User,
    Users,
    Box,
    ListChecks,
    ListIcon,
    UserRoundCog,
    UserCheck,
    ArrowLeftRight,
    NotebookPen,
    FileText,
    PencilLine,
    CheckCircle,
    ShoppingCart
} from 'lucide-react';
import { NavItem } from '@/types';

export const mainNavItems: NavItem[] = [
     {
        title: 'Inicio',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Usuarios',
        href: '/users',
        icon: User,
        permission: 'ver usuarios',
    },
    {
        title: 'Clientes',
        href: '/customers',
        icon: Users,
        permission: 'ver clientes',
    },
    {
        title: 'Inventario',
        icon: Box,
        children: [
            {
                title: 'Categoria',
                href: '/categories',
                icon: ListChecks,
                permission: 'ver categorias',
            },
            {
                title: 'Marcas',
                href: '/brands',
                icon: ListIcon,
                permission: 'ver marcas',
            },
            {
                title: 'Productos',
                href: '/products',
                icon: Box,
                permission: 'ver productos',
            },
        ]
    },
    {
        title: 'Reportes',
        icon: Box,
        children: [
            {
                title: 'Inventario',
                href: '/inventoryIndex',
                icon: ListChecks,
                permission: 'ver reporte',
            }
        ]
    },
    {
        title: 'Accesos',
        icon: UserRoundCog,
        children: [
            {
                title: 'Permisos',
                href: '/permissions',
                icon: UserRoundCog,
                permission: 'Ver Permisos',
            },
            {
                title: 'Roles',
                href: '/roles',
                icon: UserCheck,
                permission: 'Ver Roles',
            }
        ]
    },
    {
        title: 'Movimientos',
        icon: ArrowLeftRight,
        children: [
            {
                title: 'Movimientos',
                href: '/movements',
                icon: ListChecks,
                permission: 'Ver Movimiento',
            },
            {
                title: 'Tipos',
                href: '/types',
                icon: ListChecks,
                permission: 'Ver Tipo Movimiento',
            }
        ]
    },
    {
        title: 'Datos de la empresa',
        href: '/businessData',
        icon: NotebookPen,
        permission: 'ver datos empresa'
    },
    {
        title: 'Ofertas',
        href: '/offers',
        icon: ShoppingCart,
        permission: 'ver ofertas',
    },
    {
        title: 'Cotizaciones',
        icon: FileText,
        children: [
            {
                title: 'realizar cotizaciones',
                href: '/quotes',
                icon: PencilLine,
                permission: 'realizar cotizaciones',
            },
            {
                title: 'Cotizaciones confirmadas',
                href: '/quotes-confirmed',
                icon: CheckCircle,
                permission: 'realizar ventas',
            },
        ]
    },
    {
        title: 'Ventas',
        icon: CheckCircle,
        href: '/sales'
    }
];

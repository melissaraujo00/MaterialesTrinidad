import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { usePage } from '@inertiajs/react';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { LayoutGrid, User, ListChecks, NotebookPen, Box, Users, ListIcon, UserCheck, UserRoundCog, ArrowLeftRight, ShoppingCart, FileText, PencilLine, CheckCircle } from 'lucide-react';
import AppLogo from './app-logo';
import { permission, title } from 'process';

const mainNavItems: NavItem[] = [
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
        icon: NotebookPen,
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
                permission: 'realizar cotizaciones',
            },
        ]
    },

];

// Función recursiva para filtrar ítems según permisos
function filterNavItems(items: NavItem[], hasPermission: (perm: string) => boolean): NavItem[] {
    return items
        .filter(item => !item.permission || hasPermission(item.permission))
        .map(item =>
            item.children
                ? { ...item, children: filterNavItems(item.children, hasPermission) }
                : item
        )
        .filter(item => !item.children || item.children.length > 0);
}

export function AppSidebar() {
    const permissions = usePage().props.auth?.user?.permissions ?? [];
    const hasPermission = (perm: string) => permissions.includes(perm);

    const filteredNavItems = filterNavItems(mainNavItems, hasPermission);

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={filteredNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}

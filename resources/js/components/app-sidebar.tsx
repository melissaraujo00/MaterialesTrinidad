import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { LayoutGrid, User, ListChecks, Box, Users, ListIcon, UserCheck, UserRoundCog, ArrowLeftRight} from 'lucide-react';
import AppLogo from './app-logo';

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
        title: 'Roles y Permisos',
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
            },
            {
                title: 'Tipos',
                href: '/types',
                icon: ListChecks,
            }
        ]
    }
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

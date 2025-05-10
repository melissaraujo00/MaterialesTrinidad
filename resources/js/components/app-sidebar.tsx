
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { LayoutGrid, User, ListChecks, Box, Users, ListIcon, UserCheck, UserRoundCog} from 'lucide-react';
import AppLogo from './app-logo';
import { Children } from 'react';

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
    },
    {
        title: 'Clientes',
        href: '/customers',
        icon: Users,
    },
    {
        title: 'Inventario',
        icon: Box,
        children: [
            {
                title: 'Categoria',
                href: '/categories',
                icon: ListChecks,
            },
            {
                title: 'Marcas',
                href: '/brands',
                icon: ListIcon,
            },
            {
                title: 'Productos',
                href: '/products',
                icon: Box,
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
            },
            {
                title: 'Roles',
                href: '/roles',
                icon: UserCheck,
            }
        ]
    }

];



export function AppSidebar() {
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
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}

import { Link, usePage } from '@inertiajs/react';
import {
    Sidebar, SidebarContent, SidebarFooter,
    SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem
} from '@/components/ui/sidebar';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import AppLogo from './app-logo';
import { mainNavItems } from '@/Config/navigation';
import { filterNavItems } from '@/lib/utils';


export function AppSidebar() {
    const { props, url } = usePage();
    const userPermissions = props.auth?.user?.permissions ?? [];
    const filteredItems = filterNavItems(mainNavItems, userPermissions);
    const itemsWithActiveState = filteredItems.map(item => ({
        ...item,
        isActive: url.startsWith(item.href ?? '#'),
    }));

    return (
        <Sidebar collapsible="icon" variant="inset" className="border-r-zinc-200/50">
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
                <NavMain items={itemsWithActiveState} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}

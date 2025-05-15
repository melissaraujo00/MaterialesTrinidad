import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) =>
                    item.children ? (
                        <SubMenu key={item.title} item={item} currentUrl={page.url} />
                    ) : (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild isActive={item.href === page.url}>
                                <Link href={item.href!} prefetch>
                                    {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    )
                )}
            </SidebarMenu>
        </SidebarGroup>
    );
}

function SubMenu({ item, currentUrl }: { item: NavItem; currentUrl: string }) {
    const [open, setOpen] = useState(false);

    // Abre automáticamente si la URL actual está en los children
    const isChildActive = item.children?.some((child) => child.href === currentUrl);

    return (
        <div className="w-full">
            <SidebarMenuItem onClick={() => setOpen(!open)} className="cursor-pointer">
                <SidebarMenuButton isActive={isChildActive}>
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                            {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                            <span>{item.title}</span>
                        </div>
                        <ChevronDown
                            className={`ml-2 h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
                        />
                    </div>
                </SidebarMenuButton>
            </SidebarMenuItem>

            {open &&
                item.children?.map((child) => (
                    <SidebarMenuItem key={child.title} className="ml-6">
                        <SidebarMenuButton asChild isActive={child.href === currentUrl}>
                            <Link href={child.href!} prefetch>
                                {child.icon && <child.icon className="mr-2 h-4 w-4" />}
                                <span>{child.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
        </div>
    );
}

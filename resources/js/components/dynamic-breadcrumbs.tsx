import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Link, usePage } from "@inertiajs/react";
import { Fragment } from "react";
import { breadcrumbTranslations } from "@/Config/breadcrumb-translations";

export function DynamicBreadcrumbs() {
    const { url } = usePage();

    // Limpiamos la URL de parámetros de búsqueda (query strings) y fragmentos
    const pathSegments = url.split("?")[0].split("/").filter(Boolean);

    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-zinc-200 bg-white px-4 transition-colors dark:border-zinc-800 dark:bg-zinc-950">
            {/* SidebarTrigger ya maneja colores internamente, pero añadimos hover sutil */}
            <SidebarTrigger className="-ml-1 hover:bg-zinc-100 dark:hover:bg-zinc-900" />

            {/* Divisor vertical adaptable */}
            <div className="mx-2 h-4 w-[1px] bg-zinc-200 dark:bg-zinc-800" />

            <Breadcrumb>
                <BreadcrumbList>
                    {/* Link a Inicio */}
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link
                                href="/dashboard"
                                className="text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                            >
                                {breadcrumbTranslations['dashboard']}
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    {pathSegments.length > 0 && (
                        <BreadcrumbSeparator className="text-zinc-300 dark:text-zinc-700" />
                    )}

                    {pathSegments.map((segment, index) => {
                        if (segment === 'dashboard') return null;

                        const isLast = index === pathSegments.length - 1;
                        const href = `/${pathSegments.slice(0, index + 1).join("/")}`;

                        const label = breadcrumbTranslations[segment] ||
                                     segment.charAt(0).toUpperCase() + segment.slice(1);

                        return (
                            <Fragment key={href}>
                                <BreadcrumbItem>
                                    {isLast ? (
                                        <BreadcrumbPage className="font-semibold text-zinc-900 dark:text-zinc-50">
                                            {label}
                                        </BreadcrumbPage>
                                    ) : (
                                        <BreadcrumbLink asChild>
                                            <Link
                                                href={href}
                                                className="text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                                            >
                                                {label}
                                            </Link>
                                        </BreadcrumbLink>
                                    )}
                                </BreadcrumbItem>
                                {!isLast && (
                                    <BreadcrumbSeparator className="text-zinc-300 dark:text-zinc-700" />
                                )}
                            </Fragment>
                        );
                    })}
                </BreadcrumbList>
            </Breadcrumb>
        </header>
    );
}

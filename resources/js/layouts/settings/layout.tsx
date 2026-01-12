import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

const sidebarNavItems: NavItem[] = [
    {
        title: 'Perfil',
        href: '/settings/profile',
    },
    {
        title: 'Contraseña',
        href: '/settings/password',
    },
    {
        title: 'Apariencia',
        href: '/settings/appearance',

    },
];

export default function SettingsLayout({ children }: PropsWithChildren) {
    // Usamos usePage para obtener la URL actual de forma segura en SSR/CSR
    const { url } = usePage();

    return (
        <div className="px-4 py-6">
            <div className="mb-8">
                <Heading
                    title="Ajustes"
                    description="Maneja los ajustes de tu cuenta y preferencias del sistema."
                />
            </div>

            {/* Separador sutil para modo claro/oscuro */}
            <Separator className="my-6 border-zinc-200 dark:border-zinc-800" />

            <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
                <aside className="w-full lg:w-64">
                    <nav className="flex flex-col space-y-1">
                        {sidebarNavItems.map((item) => {
                            // Verificamos si la ruta es la activa
                            const isActive = url.startsWith(item.href);

                            return (
                                <Button
                                    key={item.href}
                                    size="sm"
                                    variant="ghost"
                                    asChild
                                    className={cn(
                                        'w-full justify-start transition-colors',
                                        isActive
                                            ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50 font-medium'
                                            : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800/50'
                                    )}
                                >
                                    <Link href={item.href} prefetch>
                                        {item.title}
                                    </Link>
                                </Button>
                            );
                        })}
                    </nav>
                </aside>

                {/* Divisor vertical para pantallas grandes, horizontal para móviles */}
                <Separator className="lg:hidden border-zinc-200 dark:border-zinc-800" />

                <div className="flex-1">
                    {/* Contenedor del contenido con colores Zinc */}
                    <section className="max-w-3xl space-y-12 text-zinc-900 dark:text-zinc-50">
                        {children}
                    </section>
                </div>
            </div>
        </div>
    );
}

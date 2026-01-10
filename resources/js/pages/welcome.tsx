import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                {/* Reemplazamos el contenido genérico por algo que refleje CotizaSis */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm">
                        <h3 className="text-sm font-medium text-zinc-500">Resumen de Cotizaciones</h3>
                        <p className="mt-2 text-2xl font-bold">0</p>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm">
                        <h3 className="text-sm font-medium text-zinc-500">Materiales en Stock</h3>
                        <p className="mt-2 text-2xl font-bold">0</p>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm">
                        <h3 className="text-sm font-medium text-zinc-500">Pendientes de Revisión</h3>
                        <p className="mt-2 text-2xl font-bold">0</p>
                    </div>
                </div>

                <div className="relative min-h-[100vh] flex-1 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 md:min-h-min p-6 shadow-sm">
                    <p className="text-sm text-zinc-500">Bienvenido al panel de control de CotizaSis.</p>
                </div>
            </div>
        </AppLayout>
    );
}

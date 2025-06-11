import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Home } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Inicio',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Inicio" />

            <div className="flex flex-col items-center justify-center text-center min-h-[70vh] px-4 py-12">
                <div className="flex items-center justify-center mb-6">
                    <Home className="w-16 h-16 text-red-600 dark:text-red-400" />
                </div>
                <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
                    ¡Bienvenido al Sistema!
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl">
                    Esta es la página de inicio. Usa el panel de navegación para explorar las funcionalidades del sistema.
                </p>
            </div>
        </AppLayout>
    );
}

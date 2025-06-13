import { Head, usePage, Link, router } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Toaster, toast } from "sonner";
import { useState } from "react";
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import languageES from 'datatables.net-plugins/i18n/es-ES.mjs';
import 'datatables.net-buttons-dt';
import 'datatables.net-responsive-dt';
import jszip from 'jszip';
import DeleteQuoteModal from "../../components/DeleteQuoteModal";
import ConfirmQuoteModal from "../../components/ConfirmQuoteModal";

window.JSZip = jszip;
DataTable.use(DT);

interface Quote {
    id: number;
    total: number;
    date: Date;
    status: string;
    customer?: {
        name: string;
    };
}

export default function Quotes() {
    const page = usePage() as any;
    const permissions =
        page.props.auth?.user?.permissions && Array.isArray(page.props.auth.user.permissions)
            ? page.props.auth.user.permissions
            : [];
    const hasPermission = (perm: string) => permissions.includes(perm);

    const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);

    const user = page.props.auth?.user;

    const openDeleteModal = (quote: Quote) => {
        setSelectedQuote(quote);
        setIsDeleteModalOpen(true);
    };

    const openConfirmModal = (quote: Quote) => {
        setSelectedQuote(quote);
        setIsConfirmModalOpen(true);
    };

    const statusColor = (status: string) => {
        if (status.toLowerCase() === 'pendiente') {
            return `<span class="bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-red-900 dark:text-red-300">${status}</span>`;
        } else {
            return `<span class="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">${status}</span>`;
        }
    };

    const confirmQuote = (quoteId: number) => {
        setIsConfirming(true);
        router.put(`/quotes/${quoteId}`, 
            { status: 'confirmada' },
            {
                onSuccess: () => {
                    toast.success('Cotización confirmada exitosamente');
                    setIsConfirmModalOpen(false);
                    setSelectedQuote(null);
                    setIsConfirming(false);
                    // Recargar la tabla
                    window.location.reload();
                },
                onError: (errors) => {
                    toast.error('Error al confirmar la cotización');
                    console.error(errors);
                    setIsConfirming(false);
                }
            }
        );
    };

    const columns = [
        { data: 'customer.name', title: 'Cliente' },
        { data: 'user.name', title: 'Vendedor' },
        { data: 'date', title: 'Fecha' },
        { data: 'total', title: 'Total ($)' },
        {
            data: 'status',
            title: 'estado',
            responsivePriority: 6,
            createdCell: (td: HTMLTableCellElement, cellData: any, rowData: any) => {
                td.innerHTML = statusColor(cellData);
            }
        },
        {
            data: null,
            orderable: false,
            searchable: false,
            title: 'Acciones',
            createdCell: (td: HTMLTableCellElement, cellData: any, rowData: any) => {
                let actions = "";

                // Ver detalles - Usar Link de Inertia para navegación
                actions += `<a href="/quotes/${rowData.id}" class="view-btn bg-blue-500 text-sm text-white px-3 py-1 rounded hover:bg-blue-600">Ver detalles</a>`;

                // Confirmar - Solo mostrar si el status es pendiente
                if (rowData.status.toLowerCase() === 'pendiente') {
                    actions += `<button class="confirm-btn bg-green-700 text-sm text-white px-3 py-1 rounded hover:bg-green-800 ml-2">Confirmar</button>`;
                }

                // Eliminar
                if (hasPermission("realizar cotizaciones")) {
                    actions += `<button class="delete-btn bg-red-500 text-sm text-white px-3 py-1 rounded hover:bg-red-600 ml-2">Eliminar</button>`;
                }

                td.innerHTML = actions;

                // Event listeners
                const confirmBtn = td.querySelector('.confirm-btn');
                if (confirmBtn) {
                    confirmBtn.addEventListener('click', () => {
                        openConfirmModal(rowData);
                    });
                }

                if (hasPermission("realizar cotizaciones")) {
                    td.querySelector('.delete-btn')?.addEventListener('click', () => openDeleteModal(rowData));
                }
            }
        }
    ];

    return (
        <AppLayout>
            <Head title="Cotizaciones" />
            <Toaster position="top-right" richColors />

            <div className="flex flex-col gap-6 p-6 bg-white text-black shadow-lg rounded-xl dark:bg-black/10 dark:text-white">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Gestión de Cotizaciones</h1>
                    {hasPermission("realizar cotizaciones") && (
                        <Link
                            href="/quotes/create"
                            className="bg-green-600 text-white rounded px-4 py-2 text-sm hover:bg-green-700 transition"
                        >
                            Nueva Cotización
                        </Link>
                    )}
                </div>

                <DataTable
                    ajax={`/api/quotes/getQuotesData/${user.id}`}
                    options={{
                        language: languageES,
                        responsive: true,
                        dom: 'lBrtip',
                        layout: { topStart: ['pageLength'] },
                        pageLength: 10,
                        lengthMenu: [5, 10, 25, 50],
                        order: [[2, 'desc']], // Ordenar por fecha descendente
                    }}
                    columns={columns}
                    className="display stripe hover"
                >
                    <thead>
                        <tr>
                            <th>Cliente</th>
                            <th>Vendedor</th>
                            <th>Fecha</th>
                            <th>Total</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                </DataTable>
            </div>

            <DeleteQuoteModal
                isOpen={isDeleteModalOpen}
                closeModal={() => setIsDeleteModalOpen(false)}
                quote={selectedQuote}
                deleteEndpoint="/quotes"
            />

            <ConfirmQuoteModal
                isOpen={isConfirmModalOpen}
                closeModal={() => setIsConfirmModalOpen(false)}
                quote={selectedQuote}
                onConfirm={confirmQuote}
                isLoading={isConfirming}
            />
        </AppLayout>
    );
}
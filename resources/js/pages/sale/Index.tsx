import { Head, usePage, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Toaster } from "sonner";
import { useState } from "react";
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import languageES from 'datatables.net-plugins/i18n/es-ES.mjs';
import 'datatables.net-buttons-dt';
import 'datatables.net-responsive-dt';
import jszip from 'jszip';
import DeleteQuoteModal from "../../components/DeleteQuoteModal";

window.JSZip = jszip;
DataTable.use(DT);

interface Quote {
    id: number;
    total: number;
    date: Date;
    status: string;
}

export default function ConfirmedQuotes() {
     const page = usePage() as any;
    const permissions =
        page.props.auth?.user?.permissions && Array.isArray(page.props.auth.user.permissions)
            ? page.props.auth.user.permissions
            : [];
    const hasPermission = (perm: string) => permissions.includes(perm);

    const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const user = page.props.auth?.user;

    const openDeleteModal = (quote: Quote) => {
        setSelectedQuote(quote);
        setIsDeleteModalOpen(true);
    };

    const statusColor = (status: string) => {
        if (status.toLowerCase() === 'pendiente') {
            return `<span class="bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-red-900 dark:text-red-300">${status}</span>`;
        } else if (status.toLowerCase() === 'confirmada') {
            return `<span class="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-green-900 dark:text-green-300">${status}</span>`;
        } else {
            return `<span class="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">${status}</span>`;
        }
    };

    const columns = [
        { data: 'customer.name', title: 'Cliente' },
        { data: 'user.name', title: 'Vendedor' },
        { data: 'date', title: 'Fecha' },
        { data: 'total', title: 'Total ($)' },
        {
            data: 'status',
            title: 'Estado',
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
                actions += `<a href="/sales/${rowData.id}" class="view-btn bg-blue-500 text-sm text-white px-3 py-1 rounded hover:bg-blue-600">Ver detalles</a>`;

                // Generar factura o reporte
                td.innerHTML = actions;

                // Event listeners
                td.querySelector('.invoice-btn')?.addEventListener('click', () => {
                    alert(`Aquí se generaría la factura para la cotización #${rowData.id}`);
                });

                if (hasPermission("realizar cotizaciones")) {
                    td.querySelector('.delete-btn')?.addEventListener('click', () => openDeleteModal(rowData));
                }
            }
        }
    ];

    return (
        <AppLayout>
            <Head title="Ventas" />
            <Toaster position="top-right" richColors />

            <div className="flex flex-col gap-6 p-6 bg-white text-black shadow-lg rounded-xl dark:bg-black/10 dark:text-white">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Ventas</h1>
                </div>
                 <div className="flex justify-end">
                    {hasPermission("crear venta")   &&(
                        <Link
                            href="/sales/create"
                            className="bg-green-600 text-white rounded px-3 py-1 text-sm hover:bg-green-700 transition"
                        >
                            Crear Venta
                        </Link>
                    )}
                </div>

                <DataTable
                    ajax={`/api/sales/getSaleData`}
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
                            <th>Total ($)</th>
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
        </AppLayout>
    );
}

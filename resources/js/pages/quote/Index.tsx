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

interface Quote{
    id:number;
    total:number;
    date:Date;
    status:string;
   
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

    const openDeleteModal = (quote: Quote) => {
        setSelectedQuote(quote);
        setIsDeleteModalOpen(true);
    };

    const columns = [
        { data: 'customer.name', title: 'Cliente' },
        { data: 'user.name', title: 'Vendedor' },
        { data: 'date', title: 'Fecha' },
        { data: 'total', title: 'Total ($)' },
        {
            data: null,
            orderable: false,
            searchable: false,
            title: 'Acciones',
            createdCell: (td: HTMLTableCellElement, cellData: any, rowData: any) => {
                let actions = "";

                // Ver detalles
                actions += `<a href="/quotes/${rowData.id}" class="view-btn bg-blue-500 text-sm text-white px-3 py-1 rounded hover:bg-blue-600">Ver detalles</a>`;

                // Enviar (puedes personalizar la acción real del botón)
                actions += `<button class="send-btn bg-green-700 text-sm text-white px-3 py-1 rounded hover:bg-indigo-600 ml-2">Enviar</button>`;

                // Eliminar
                if (hasPermission("realizar cotizaciones")) {
                    actions += `<button class="delete-btn bg-red-500 text-sm text-white px-3 py-1 rounded hover:bg-red-600 ml-2">Eliminar</button>`;
                }

                td.innerHTML = actions;

                // Eliminar
                if (hasPermission("realizar cotizaciones")) {
                    td.querySelector('.delete-btn')?.addEventListener('click', () => openDeleteModal(rowData));
                }

              
                td.querySelector('.send-btn')?.addEventListener('click', () => {
                    alert(`aqui se enviaria la cotizacion`);
                    
                });
            }
        }
    ];

    return (
        <AppLayout>
            <Head title="Cotizaciones" />
            <Toaster position="top-right" richColors />

            <div className="flex flex-col gap-6 p-6 bg-white text-black shadow-lg rounded-xl dark:bg-black/10 dark:text-white">
                <div className="flex justify-end">
                    {hasPermission("realizar cotizaciones") && (
                        <Link
                            href="/quotes/create"
                            className="bg-green-600 text-white rounded px-3 py-1 text-sm hover:bg-green-700 transition"
                        >
                            realizar Cotización
                        </Link>
                    )}
                </div>

                <DataTable
                    ajax="/api/quotes/getQuotesData"
                    options={{
                        language: languageES,
                        responsive: true,
                        dom: 'lBrtip',
                        layout: { topStart: ['pageLength'] },
                    }}
                    columns={columns}
                    className="display"
                >
                    <thead>
                        <tr>
                            <th>Cliente</th>
                            <th>Vendedor</th>
                            <th>Fecha</th>
                            <th>Total</th>
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

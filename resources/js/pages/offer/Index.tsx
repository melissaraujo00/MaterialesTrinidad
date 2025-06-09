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
import DeleteEntityModal from "@/components/DeleteEntityModal";

window.JSZip = jszip;
DataTable.use(DT);

interface Offer {
    id: number;
    startDate: string;
    endDate: string;
    description: string;
    priceNormal: string;
    priceOffers: string;
    product_id: number;
}

interface OfferForModal {
    id: number;
    name: string;
}

export default function OffersIndex() {
    const page = usePage();
    const permissions =
        page.props.auth?.user?.permissions && Array.isArray(page.props.auth.user.permissions)
            ? page.props.auth.user.permissions
            : [];
    const hasPermission = (perm: string) => permissions.includes(perm);

    const [selectedOffer, setSelectedOffer] = useState<OfferForModal | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const openDeleteModal = (offer: Offer) => {
        const modalData: OfferForModal = {
            id: offer.id,
            name: offer.description,
        };
        setSelectedOffer(modalData);
        setIsDeleteModalOpen(true);
    };

    const columns = [
        { data: 'startDate' },
        { data: 'endDate' },
        { data: 'description' },
        { data: 'priceNormal' },
        { data: 'priceOffers' },
        { data: 'product_id' },
        {
            data: null,
            orderable: false,
            searchable: false,
            createdCell: (td: HTMLTableCellElement, cellData: any, rowData: Offer) => {
                let actions = "";
                if (hasPermission("editar oferta")) {
                    actions += `<a href="/offers/${rowData.id}/edit" class="edit-btn bg-orange-400 text-sm text-white px-3 py-1 rounded hover:bg-orange-500">Editar</a>`;
                }
                if (hasPermission("eliminar oferta")) {
                    actions += `<button class="delete-btn bg-red-500 text-sm text-white px-3 py-1 rounded hover:bg-red-600">Eliminar</button>`;
                }
                td.innerHTML = actions;

                if (hasPermission("eliminar oferta")) {
                    td.querySelector('.delete-btn')?.addEventListener('click', () => openDeleteModal(rowData));
                }
            }
        }
    ];

    return (
        <AppLayout>
            <Head title="Ofertas" />
            <Toaster position="top-right" richColors />

            <div className="flex flex-col gap-6 p-6 bg-white text-black shadow-lg rounded-xl dark:bg-black/10 dark:text-white">
                <div className="flex justify-end">
                    {hasPermission("crear oferta") && (
                        <Link
                            href="/offers/create"
                            className="bg-green-600 text-white rounded px-3 py-1 text-sm hover:bg-green-700 transition"
                        >
                            Agregar Oferta
                        </Link>
                    )}
                </div>

                <DataTable ajax="/api/offers/getOfferData" options={{
                    language: languageES,
                    responsive: true,
                    dom: 'lBrtip',
                    layout: {
                        topStart: ['pageLength'],
                    },
                }} columns={columns} className="display">
                    <thead>
                        <tr>
                            <th>Inicio</th>
                            <th>Fin</th>
                            <th>Descripción</th>
                            <th>Precio Normal</th>
                            <th>Precio Oferta</th>
                            <th>Producto</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                </DataTable>
            </div>

            <DeleteEntityModal
                isOpen={isDeleteModalOpen}
                closeModal={() => setIsDeleteModalOpen(false)}
                entity={selectedOffer}
                entityType="offer"
                deleteEndpoint="/offers"
            />
        </AppLayout>
    );
}

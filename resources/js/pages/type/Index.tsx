import { useState } from "react";
import { Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Toaster } from "sonner";
import { Link } from "@inertiajs/react";
import DeleteCategoryModal from "@/components/DeleteCategoryModal";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import languageES from "datatables.net-plugins/i18n/es-ES.mjs";
import "datatables.net-buttons-dt";
import "datatables.net-responsive-dt";
// import "datatables.net-buttons/js/buttons.html5";
// import "datatables.net-buttons/js/buttons.print";
import jszip from "jszip";
import DeleteEntityModal from "../../components/DeleteEntityModal";

window.JSZip = jszip;
DataTable.use(DT);

interface Type {
    id: number;
    name: string;
}

export default function Types() {
    const [selectedType, setSelectedType] = useState<Type | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const openDeleteModal = (type: Type) => {
        setSelectedType(type);
        setIsDeleteModalOpen(true);
    };

    const columns = [
        { data: 'type' },
        { data: 'description' },
        {
            data: null,
            title: "Acciones",
            orderable: false,
            searchable: false,
            createdCell: (td: HTMLTableCellElement, cellData: any, rowData: any) => {
                td.innerHTML = `
            <a href="types/${rowData.id}/edit" class="edit-btn bg-orange-400 text-sm text-white px-3 py-1 rounded hover:bg-orange-500">Editar</a>
            <button class="delete-btn bg-red-500 text-sm text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
        `;

                td.querySelector('.delete-btn')?.addEventListener('click', () => openDeleteModal(rowData));
            }
        },
    ];

    return (
        <AppLayout>
            <Head title="Tipos" />
            <Toaster position="top-right" richColors />

            <div className="flex flex-col gap-6 p-6 bg-white text-black shadow-lg rounded-xl dark:bg-black/10 dark:text-white">
                <div className="flex justify-end">
                    {/* Botón para agregar tipo de movimiento */}
                    <Link
                        href="/types/create"
                        className="bg-green-600 text-white rounded px-3 py-1 text-sm hover:bg-green-700 transition"
                    >
                        Agregar tipo
                    </Link>
                </div>

                <DataTable ajax="/api/types/getTypeData" options={{
                    language: languageES,
                    responsive: true,
                    dom: 'lBrtip',
                    layout: {
                        topStart: ["pageLength"],
                    },
                }}
                    columns={columns} className="display" >
                    <thead>
                        <tr>
                            <th>Tipo de movimiento</th>
                            <th>Descripción</th>
                        </tr>
                    </thead>
                </DataTable>
            </div>

            <DeleteEntityModal
                isOpen={isDeleteModalOpen}
                closeModal={() => setIsDeleteModalOpen(false)}
                entity={selectedType}
                entityType="Tipo de movimiento"
                deleteEndpoint="/types"
            />
        </AppLayout>
    );
}

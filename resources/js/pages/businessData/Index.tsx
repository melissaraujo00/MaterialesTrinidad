import { Head, usePage, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Toaster } from "sonner";
import { useState, useEffect } from "react";
import axios from "axios";
import { useHasPermission } from "@/globals/permissions";

interface BusinessData {
    id: number;
    name: string;
    nit: string;
    address: string;
    phoneNumber: string;
    email: string;
    logo_path: string;
    description: string;
}

export default function BusinessData() {

    const [businessData, setBusinessData] = useState<BusinessData | null>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/businessData/getBusinessData');

                if (response.data.data && response.data.data.length > 0) {
                    setBusinessData(response.data.data[0]);
                }
            } catch (error) {
                console.error("Error al cargar los datos de la empresa:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <AppLayout>
            <Head title="Datos de la Empresa" />
            <Toaster position="top-right" richColors />

            <div className="max-w-4xl p-6 bg-white text-black shadow-lg rounded-xl">{/* Quité mx-auto para alinearlo a la izquierda */}

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="text-xl text-gray-500">Cargando datos...</div>
                    </div>
                ) : businessData ? (
                    <div className="flex flex-col">
                        {/* Logo centrado */}
                        <div className="flex justify-start mb-8">
                            {businessData.logo_path ? (
                                <img
                                    src={businessData.logo_path.startsWith('/storage')
                                        ? businessData.logo_path
                                        : `/storage/${businessData.logo_path}`}
                                    alt="Logo de la empresa"
                                    className="h-32 w-auto object-contain"
                                    onError={(e) => {
                                        console.error("Error al cargar la imagen:", e);
                                        (e.target as HTMLImageElement).src = "https://via.placeholder.com/150?text=Sin+Logo";
                                    }}
                                />
                            ) : (
                                <div className="h-32 w-32 flex items-center justify-center bg-gray-200 rounded-full">
                                    <span className="text-gray-500 text-xl">Sin Logo</span>
                                </div>
                            )}
                        </div>

                        {/* Datos de la empresa en formato vertical tipo formulario */}
                        <div className="border rounded-lg p-6 bg-gray-50">
                            {/* Encabezado */}
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">{businessData.name}</h2>
                                <p className="text-gray-600">{businessData.description}</p>
                            </div>

                            {/* Campos en formato tipo formulario */}
                            <div className="space-y-6">
                                <div className="flex flex-col">
                                    <label className="text-sm font-medium text-gray-700 mb-1">Nombre de la Empresa</label>
                                    <div className="p-2 bg-white border border-gray-300 rounded-md">
                                        {businessData.name}
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-sm font-medium text-gray-700 mb-1">NIT</label>
                                    <div className="p-2 bg-white border border-gray-300 rounded-md">
                                        {businessData.nit}
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-sm font-medium text-gray-700 mb-1">Dirección</label>
                                    <div className="p-2 bg-white border border-gray-300 rounded-md">
                                        {businessData.address}
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                                    <div className="p-2 bg-white border border-gray-300 rounded-md">
                                        {businessData.phoneNumber}
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                                    <div className="p-2 bg-white border border-gray-300 rounded-md">
                                        {businessData.email}
                                    </div>
                                </div>


                            </div>
                        </div>

                        {/* Botones de acción */}
                        {useHasPermission('editar datos empresa') && (
                            <div className="mt-6 flex justify-center">
                                <Link
                                    href={`/businessData/${businessData.id}/edit`}
                                    className="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-500"
                                >
                                    Editar Información
                                </Link>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-64">
                        <div className="text-xl text-gray-500 mb-4">No hay información de la empresa disponible</div>

                    </div>
                )}
            </div>
        </AppLayout>
    );
}

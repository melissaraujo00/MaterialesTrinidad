import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { ArrowLeft, Building2, Calendar, DollarSign, Package, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';

interface QuoteDetail {
    id?: number;
    product_id?: number;
    product_name: string;
    amount: number;
    price: number;
    subtotal: number;
}

interface Quote {
    id: number;
    date: string;
    subtotal: number;
    total: number;
    status: string;
    customer: {
        id: number;
        name: string;
    };
    user: {
        id: number;
        name: string;
    };
}

export default function QuoteShow() {
    const pageProps = usePage().props as any;

    const details = pageProps.details as QuoteDetail[];

    const quote = pageProps.quote as Quote;
    const initialDetails = pageProps.details as QuoteDetail[];
    const page = usePage();
    const permissions = page.props.auth?.user?.permissions && Array.isArray(page.props.auth.user.permissions) ? page.props.auth.user.permissions : [];
    const hasPermission = (perm: string) => permissions.includes(perm);

    // Estados para manejo de edición
    const [isEditing, setIsEditing] = useState(false);
    const [editedDetails, setEditedDetails] = useState<QuoteDetail[]>(initialDetails || []);
    const [loading, setLoading] = useState(false);

    // Recalcular totales cuando cambien los detalles
    const [calculatedTotals, setCalculatedTotals] = useState({
        subtotal: quote?.subtotal || 0,
        total: quote?.total || 0,
    });

    useEffect(() => {
        const newSubtotal = editedDetails.reduce((sum, detail) => sum + detail.subtotal, 0);
        setCalculatedTotals({
            subtotal: newSubtotal,
            total: newSubtotal, // Asumiendo que no hay impuestos, ajusta según tu lógica
        });
    }, [editedDetails]);

    if (!quote || !initialDetails) {
        return (
            <AppLayout>
                <Head title="Error - Cotización no encontrada" />
                <div className="flex min-h-screen items-center justify-center">
                    <div className="text-center">
                        <h1 className="mb-4 text-2xl font-bold text-red-600">Error al cargar la cotización</h1>
                        <p className="mb-4 text-gray-600">No se pudieron cargar los datos de la cotización.</p>
                        <Link href="/quotes" className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">
                            Volver a cotizaciones
                        </Link>
                    </div>
                </div>
            </AppLayout>
        );
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-SV', {
            style: 'currency',
            currency: 'USD',
        }).format(amount || 0);
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return 'Fecha no disponible';
        return new Date(dateString).toLocaleDateString('es-SV', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const handleQuantityChange = (index: number, newAmount: number) => {
        if (newAmount < 1) return;

        const updatedDetails = [...editedDetails];
        updatedDetails[index].amount = newAmount;
        updatedDetails[index].subtotal = newAmount * updatedDetails[index].price;
        setEditedDetails(updatedDetails);
    };

    const handleRemoveProduct = (index: number) => {
        const updatedDetails = editedDetails.filter((_, i) => i !== index);
        setEditedDetails(updatedDetails);
        toast.success('Producto eliminado de la cotización');
    };

    const handleSaveChanges = async () => {
        if (editedDetails.length === 0) {
            toast.error('No puedes guardar una cotización sin productos');
            return;
        }

        setLoading(true);

        try {
            const updateData = {
                details: editedDetails.map((detail) => ({
                    id: detail.id,
                    product_id: detail.product_id,
                    amount: detail.amount,
                    price: detail.price,
                    subtotal: detail.subtotal,
                })),
                subtotal: calculatedTotals.subtotal,
                total: calculatedTotals.total,
            };

            router.put(`/quotes/${quote.id}`, updateData, {
                onSuccess: () => {
                    toast.success('Cotización actualizada exitosamente');
                    setIsEditing(false);
                },
                onError: (errors) => {
                    console.error('Error al actualizar:', errors);
                    toast.error('Error al actualizar la cotización');
                },
            });
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error al actualizar la cotización');
        } finally {
            setLoading(false);
        }
    };

    const handleCancelEdit = () => {
        setEditedDetails(initialDetails);
        setIsEditing(false);
        toast.info('Cambios cancelados');
    };

    return (
        <AppLayout>
            <Head title="Cotizaciónes" />
            <Toaster position="top-right" richColors />

            <div className="space-y-6 p-6">
                {/* Header with back button */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/quotes" className="flex items-center gap-2 text-gray-600 transition hover:text-gray-800">
                            <ArrowLeft className="h-4 w-4" />
                            Volver a cotizaciones
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-800">Cotización #{quote.id}</h1>
                        {isEditing && <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800">Modo edición</span>}
                    </div>

                    {!isEditing ? (
                        <div className="flex items-center gap-4">
                            {hasPermission('realizar ventas') && (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center gap-2 rounded bg-orange-500 px-4 py-2 text-white transition hover:bg-orange-600"
                                >
                                    Editar
                                </button>
                            )}
                            <a
                                href={`/quotesReport/${quote.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                            >
                                Generar PDF
                            </a>
                            <button
                                className="rounded bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
                                onClick={async () => {
                                    try {
                                        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '';
                                        const response = await fetch(`/quotes/send-whatsapp/${quote.id}`, {
                                            method: 'POST',
                                            headers: {
                                                'X-CSRF-TOKEN': csrfToken || '',
                                                Accept: 'application/json',
                                            },
                                        });
                                        const data = await response.json();
                                        if (data.ultramsg_response) {
                                            alert('¡Cotización enviada por WhatsApp!');
                                        } else {
                                            alert('Ocurrió un error al enviar la cotización.');
                                        }
                                    } catch (error) {
                                        alert('Error de red o del servidor.');
                                    }
                                }}
                            >
                                Enviar por WhatsApp
                            </button>
                        </div>
                    ) : (
                        <div>
                            <button
                                onClick={handleSaveChanges}
                                disabled={loading}
                                className="flex items-center gap-2 rounded bg-green-600 px-4 py-2 text-white transition hover:bg-green-700 disabled:opacity-50"
                            >
                                {loading ? 'Guardando...' : 'Guardar'}
                            </button>
                            <button
                                onClick={handleCancelEdit}
                                className="flex items-center gap-2 rounded bg-gray-500 px-4 py-2 text-white transition hover:bg-gray-600"
                            >
                                Cancelar
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Quote information card */}
            <div className="rounded-lg bg-white p-6 shadow-md">
                <h2 className="mb-4 text-xl font-semibold text-gray-800">Información de la Cotización</h2>

                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Building2 className="h-5 w-5 text-blue-600" />
                            <div>
                                <p className="text-sm text-gray-600">Cliente</p>
                                <p className="font-medium text-gray-800">{quote.customer?.name || 'Cliente no disponible'}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Calendar className="h-5 w-5 text-blue-600" />
                            <div>
                                <p className="text-sm text-gray-600">Fecha</p>
                                <p className="font-medium text-gray-800">{formatDate(quote.date)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <User className="h-5 w-5 text-blue-600" />
                            <div>
                                <p className="text-sm text-gray-600">Vendedor</p>
                                <p className="font-medium text-gray-800">{quote.user?.name || 'Vendedor no disponible'}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <DollarSign className="h-5 w-5 text-green-600" />
                            <div>
                                <p className="text-sm text-gray-600">Total</p>
                                <p className="text-xl font-bold text-green-600">{formatCurrency(isEditing ? calculatedTotals.total : quote.total)}</p>
                                {isEditing && calculatedTotals.total !== quote.total && (
                                    <p className="text-sm text-gray-500">Original: {formatCurrency(quote.total)}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quote details table */}
            <div className="overflow-hidden rounded-lg bg-white shadow-md">
                <div className="border-b bg-gray-50 px-6 py-4">
                    <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-800">
                        <Package className="h-5 w-5" />
                        Detalles de la Cotización
                    </h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Producto</th>
                                <th className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase">Cantidad</th>
                                <th className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase">Precio Unitario</th>
                                <th className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase">Subtotal</th>
                                {isEditing && (
                                    <th className="px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-500 uppercase">Acciones</th>
                                )}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {editedDetails && editedDetails.length > 0 ? (
                                editedDetails.map((detail, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{detail.product_name || 'Producto no disponible'}</div>
                                        </td>
                                        <td className="px-6 py-4 text-right whitespace-nowrap">
                                            {isEditing ? (
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={detail.amount}
                                                    onChange={(e) => handleQuantityChange(index, parseInt(e.target.value) || 1)}
                                                    className="w-20 rounded border px-2 py-1 text-center text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                />
                                            ) : (
                                                <div className="text-sm text-gray-900">{detail.amount || 0}</div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{formatCurrency(detail.price)}</div>
                                        </td>
                                        <td className="px-6 py-4 text-right whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{formatCurrency(detail.subtotal)}</div>
                                        </td>
                                        {isEditing && (
                                            <td className="px-6 py-4 text-center whitespace-nowrap">
                                                <button
                                                    onClick={() => handleRemoveProduct(index)}
                                                    className="text-red-600 transition hover:text-red-800"
                                                    title="Eliminar producto"
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        )}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={isEditing ? 5 : 4} className="px-6 py-4 text-center text-gray-500">
                                        No hay detalles disponibles para esta cotización
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Total summary */}
                <div className="border-t bg-gray-50 px-6 py-4">
                    <div className="flex justify-end">
                        <div className="w-64 space-y-2">
                            <div className="flex justify-between border-t pt-2 text-lg font-bold">
                                <span>Total:</span>
                                <span className="text-green-600">{formatCurrency(isEditing ? calculatedTotals.total : quote.total)}</span>
                            </div>
                            {isEditing && calculatedTotals.total !== quote.total && (
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>Total original:</span>
                                    <span>{formatCurrency(quote.total)}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

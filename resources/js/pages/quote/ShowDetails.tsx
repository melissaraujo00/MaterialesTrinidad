import { Head, usePage, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Toaster } from "sonner";
import { ArrowLeft, Calendar, User, Building2, DollarSign, Package } from "lucide-react";

interface QuoteDetail {
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

    const quote = pageProps.quote as Quote;
    const details = pageProps.details as QuoteDetail[];

    if (!quote || !details) {
        return (
            <AppLayout>
                <Head title="Error - Cotización no encontrada" />
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-red-600 mb-4">Error al cargar la cotización</h1>
                        <p className="text-gray-600 mb-4">No se pudieron cargar los datos de la cotización.</p>
                        <Link
                            href="/quotes"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                        >
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
            currency: 'USD'
        }).format(amount || 0);
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return 'Fecha no disponible';
        return new Date(dateString).toLocaleDateString('es-SV', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <AppLayout>
            <Head title={`Cotización #${quote.id}`} />
            <Toaster position="top-right" richColors />

            <div className="space-y-6 p-6">
                {/* Header with back button */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/quotes"
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Volver a cotizaciones
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Cotización #{quote.id}
                        </h1>
                    </div>

                    <div className="flex gap-2">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                            Generar PDF
                        </button>
                        <a href={`/quotesReport/${quote.id}`} target="_blank" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition ">
                            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
                            Enviar por WhatsApp
                        </button>
                        </a>
                    </div>
                </div>

                {/* Quote information card */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">
                        Información de la Cotización
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Building2 className="w-5 h-5 text-blue-600" />
                                <div>
                                    <p className="text-sm text-gray-600">Cliente</p>
                                    <p className="font-medium text-gray-800">{quote.customer?.name || 'Cliente no disponible'}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Calendar className="w-5 h-5 text-blue-600" />
                                <div>
                                    <p className="text-sm text-gray-600">Fecha</p>
                                    <p className="font-medium text-gray-800">{formatDate(quote.date)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <User className="w-5 h-5 text-blue-600" />
                                <div>
                                    <p className="text-sm text-gray-600">Vendedor</p>
                                    <p className="font-medium text-gray-800">{quote.user?.name || 'Vendedor no disponible'}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <DollarSign className="w-5 h-5 text-green-600" />
                                <div>
                                    <p className="text-sm text-gray-600">Total</p>
                                    <p className="font-bold text-xl text-green-600">{formatCurrency(quote.total)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quote details table */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="px-6 py-4 bg-gray-50 border-b">
                        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                            <Package className="w-5 h-5" />
                            Detalles de la Cotización
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Producto
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Cantidad
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Precio Unitario
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Subtotal
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {details && details.length > 0 ? (
                                    details.map((detail, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {detail.product_name || 'Producto no disponible'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <div className="text-sm text-gray-900">
                                                    {detail.amount || 0}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <div className="text-sm text-gray-900">
                                                    {formatCurrency(detail.price)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {formatCurrency(detail.subtotal)}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                                            No hay detalles disponibles para esta cotización
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Total summary */}
                    <div className="px-6 py-4 bg-gray-50 border-t">
                        <div className="flex justify-end">
                            <div className="w-64 space-y-2">
                                <div className="flex justify-between text-lg font-bold border-t pt-2">
                                    <span>Total:</span>
                                    <span className="text-green-600">{formatCurrency(quote.total)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
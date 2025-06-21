import { Head, usePage, Link, router } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Toaster, toast } from "sonner";
import { ArrowLeft, Calendar, User, Building2, DollarSign, Package, Edit3, Save, X, Trash2, Receipt, Phone, Mail, MapPin } from "lucide-react";
import { useState, useEffect } from "react";

export default function SaleShow() {
    const pageProps = usePage().props as any;
    const sale = pageProps.sale;
    
    const page = usePage();
    const permissions = page.props.auth?.user?.permissions && Array.isArray(page.props.auth.user.permissions) ? page.props.auth.user.permissions : [];
    const hasPermission = (perm: string) => permissions.includes(perm);

    const formatCurrency = (amount: string | number) => {
        return new Intl.NumberFormat('es-SV', {
            style: 'currency',
            currency: 'USD'
        }).format(Number(amount));
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-SV', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (!sale) {
        return (
            <AppLayout>
                <Head title="Error - Venta no encontrada" />
                <div className="flex min-h-screen items-center justify-center">
                    <div className="text-center">
                        <h1 className="mb-4 text-2xl font-bold text-red-600">Error al cargar la venta</h1>
                        <p className="mb-4 text-gray-600">No se pudieron cargar los datos de la venta.</p>
                        <Link href="/sales" className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">
                            Volver a ventas
                        </Link>
                    </div>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <Head title={`Venta #${sale.id}`} />
            <Toaster position="top-right" richColors />

            <div className="space-y-6 p-6">
                {/* Header with back button */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/sales" className="flex items-center gap-2 text-gray-600 transition hover:text-gray-800">
                            <ArrowLeft className="h-4 w-4" />
                            Volver a ventas
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-800">Venta #{sale.id}</h1>
                    </div>
                    <div className="flex gap-2">
                        <div className="flex items-center gap-4">
                            {hasPermission('edit_sales') && (
                                <Link
                                    href={`/sales/${sale.id}/edit`}
                                    className="flex items-center gap-2 rounded bg-orange-500 px-4 py-2 text-white transition hover:bg-orange-600"
                                >
                                    <Edit3 className="w-4 h-4" />
                                    Editar
                                </Link>
                            )}
                       
                        </div>
                    </div>
                </div>

                {/* Sale information card */}
                <div className="rounded-lg bg-white p-6 shadow-md">
                    <h2 className="mb-4 text-xl font-semibold text-gray-800">Información de la Venta</h2>

                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-4">

                            <div className="flex items-center gap-3">
                                <Calendar className="h-5 w-5 text-blue-600" />
                                <div>
                                    <p className="text-sm text-gray-600">Fecha</p>
                                    <p className="font-medium text-gray-800">{formatDate(sale.date)}</p>
                                </div>
                            </div>

                            {sale.quote_id && (
                                <div className="flex items-center gap-3">
                                    <Package className="h-5 w-5 text-blue-600" />
                                    <div>
                                        <p className="text-sm text-gray-600">Cotización</p>
                                        <Link
                                            href={`/quotes/${sale.quote_id}`}
                                            className="font-medium text-blue-600 hover:text-blue-500"
                                        >
                                            #{sale.quote_id}
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <User className="h-5 w-5 text-blue-600" />
                                <div>
                                    <p className="text-sm text-gray-600">Vendedor</p>
                                    <p className="font-medium text-gray-800">{sale.user?.name || 'Vendedor no disponible'}</p>
                                </div>
                            </div>

                            {sale.customer && (
                                <div className="flex items-center gap-3">
                                    <Building2 className="h-5 w-5 text-blue-600" />
                                    <div>
                                        <p className="text-sm text-gray-600">Cliente</p>
                                        <p className="font-medium text-gray-800">{sale.customer.name}</p>
                                        {sale.customer.company && (
                                            <p className="text-sm text-gray-500">{sale.customer.company}</p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Products table */}
                <div className="rounded-lg bg-white shadow-md">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800">Productos Vendidos</h3>
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
                                {sale.details && sale.details.length > 0 ? (
                                    sale.details.map((detail: any, index: number) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                            <Package className="h-5 w-5 text-blue-600" />
                                                        </div>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {detail.product?.name || 'Producto sin nombre'}
                                                        </div>
                                                       
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <div className="text-sm text-gray-900">
                                                    {detail.amount}
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
                                            No hay productos en esta venta
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Total summary */}
                    <div className="px-6 py-4 bg-gray-50 border-t">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <DollarSign className="h-5 w-5 text-green-600" />
                                <div>
                                    <p className="text-sm text-gray-600">Subtotal</p>
                                    <p className="text-lg font-semibold text-gray-900">{formatCurrency(sale.subtotal)}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-600">Total</p>
                                <p className="text-2xl font-bold text-green-600">{formatCurrency(sale.total)}</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </AppLayout>
    );
}
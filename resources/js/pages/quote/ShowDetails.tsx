import { Head, usePage, Link, router } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Toaster, toast } from "sonner";
import { ArrowLeft, Calendar, User, Building2, DollarSign, Package, Edit3, Save, X, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import ProductList from "./ProducList";
import SaleFromQuoteModal from "@/components/SaleFromQuoteModal"; // Ajusta la ruta si es necesario

// Mantén QuoteDetail tal cual, si realmente representa la estructura del backend
interface QuoteDetail {
    id?: number; // ID del registro de detalle de la cotización en sí
    product_id?: number; // ID del producto real
    product_name: string;
    amount: number; // Esta es la cantidad en el detalle de la cotización
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

interface Product { // Esta interfaz parece describir un producto completo de tu inventario
    id: number;
    name: string;
    priceWithTax: number;
    discountPrice: number | null;
    brand_id: string;
    category_id: string;
    image: string;
    stock: number;
    stockMinimun: number;
}

interface CartItem extends Product {
    quantity: number; // Cantidad en el carrito
    applyDiscount: boolean; // Asumiendo que esto está presente en tu lógica de selección de productos
    totalPrice: number;
}

// Interfaz para los productos que se pasarán a SaleFromQuoteModal
// Esto se alinea con la expectativa de la interfaz 'Product' de SaleFromQuoteModal
interface ProductForSaleModal {
    id: number;
    name: string;
    quantity: number;
    price: number;
}


export default function QuoteShow() {
    const pageProps = usePage().props as any;

    const quote = pageProps.quote as Quote;
    const initialDetails = pageProps.details as QuoteDetail[];
    const page = usePage();
    const permissions =
        page.props.auth?.user?.permissions && Array.isArray(page.props.auth.user.permissions)
            ? page.props.auth.user.permissions
            : [];
    const hasPermission = (perm: string) => permissions.includes(perm);

    // Estados para manejo de edición
    const [isEditing, setIsEditing] = useState(false);
    const [editedDetails, setEditedDetails] = useState<QuoteDetail[]>(initialDetails || []);
    const [loading, setLoading] = useState(false);
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [isSaleModalOpen, setIsSaleModalOpen] = useState(false);

    const [cart, setCart] = useState<CartItem[]>([]);
    const [existingProductIds, setExistingProductIds] = useState<number[]>([]);

    // Recalcular totales cuando cambien los detalles
    const [calculatedTotals, setCalculatedTotals] = useState({
        subtotal: quote?.subtotal || 0,
        total: quote?.total || 0
    });

    useEffect(() => {
        if (isEditing && editedDetails) {
            const productIds = editedDetails
                .map(detail => detail.product_id)
                .filter((id): id is number => id !== undefined);
            setExistingProductIds(productIds);
        }
    }, [isEditing, editedDetails]);

    useEffect(() => {
        const newSubtotal = editedDetails.reduce((sum, detail) => sum + detail.subtotal, 0);
        setCalculatedTotals({
            subtotal: newSubtotal,
            total: newSubtotal // Asumiendo que el total es igual al subtotal por ahora
        });
    }, [editedDetails]);

    if (!quote || !initialDetails) {
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

    const handleQuantityChange = (index: number, newAmount: number) => {
        if (newAmount < 1) return;

        const updatedDetails = [...editedDetails];
        updatedDetails[index].amount = newAmount;
        updatedDetails[index].subtotal = newAmount * updatedDetails[index].price;
        setEditedDetails(updatedDetails);
    };

    const handleRemoveProduct = (index: number) => {
        const productToRemove = editedDetails[index];
        const updatedDetails = editedDetails.filter((_, i) => i !== index);

        setEditedDetails(updatedDetails);

        // Si el producto removido tenía product_id, quitarlo de la lista de existentes
        if (productToRemove.product_id) {
            setExistingProductIds(prev => prev.filter(id => id !== productToRemove.product_id));
        }

        toast.success('Producto eliminado de la cotización');
    };

    // NUEVA FUNCIÓN: Crear lista combinada para el modal (ProductList)
    const getCombinedCartForModal = (): CartItem[] => {
        // Convertir productos existentes en la cotización a formato CartItem
        const existingAsCartItems: CartItem[] = editedDetails
            .filter(detail => detail.product_id) // Solo detalles que tienen un product_id real
            .map(detail => ({
                id: detail.product_id!, // Usar product_id como ID
                name: detail.product_name,
                priceWithTax: detail.price,
                discountPrice: null,
                brand_id: '', // Valores de marcador de posición
                category_id: '', // Valores de marcador de posición
                image: '', // Valores de marcador de posición
                stock: 999, // Valor de marcador de posición
                stockMinimun: 0, // Valor de marcador de posición
                quantity: detail.amount, // Mapea 'amount' a 'quantity'
                applyDiscount: false, // Asume falso para productos existentes por defecto
                totalPrice: detail.subtotal // Usa el subtotal calculado
            }));

        // Combinar con nuevos productos del carrito (si los hay)
        return [...existingAsCartItems, ...cart];
    };


    const handleSelectProduct = (productWithDetails: CartItem) => {
        // Verificar si el producto ya existe en la cotización (editedDetails) o en el carrito
        const existsInQuote = editedDetails.some(detail => detail.product_id === productWithDetails.id);
        const existsInCart = cart.some(item => item.id === productWithDetails.id);

        if (existsInQuote || existsInCart) {
            toast.error('Este producto ya está en la cotización');
            return;
        }

        // Calcular precio final
        // La propiedad 'applyDiscard' debería ser 'applyDiscount' según tu interfaz CartItem
        const finalPrice = productWithDetails.applyDiscount && productWithDetails.discountPrice
            ? productWithDetails.discountPrice
            : productWithDetails.priceWithTax;

        // Agregar al carrito temporal
        const newCartItem: CartItem = {
            ...productWithDetails,
            totalPrice: finalPrice * productWithDetails.quantity
        };

        setCart(prev => [...prev, newCartItem]);

        // Agregar también a editedDetails inmediatamente
        const newQuoteDetail: QuoteDetail = {
            product_id: productWithDetails.id,
            product_name: productWithDetails.name,
            amount: productWithDetails.quantity,
            price: finalPrice,
            subtotal: finalPrice * productWithDetails.quantity
        };

        setEditedDetails(prev => [...prev, newQuoteDetail]);
        setExistingProductIds(prev => [...prev, productWithDetails.id]);

        toast.success(`${productWithDetails.name} agregado a la cotización`);
    };

    const removeProductFromCart = (id: number) => {
        // Remover del carrito temporal
        setCart(prev => prev.filter(p => p.id !== id));

        // Remover también de editedDetails si no tenía ID original (era nuevo)
        setEditedDetails(prev => prev.filter(detail =>
            !(detail.product_id === id && !detail.id)
        ));

        // Remover de la lista de productos existentes
        setExistingProductIds(prev => prev.filter(existingId => existingId !== id));

        toast.success('Producto eliminado de la cotización');
    };

    const updateProductQuantity = (id: number, quantity: number) => {
        if (quantity <= 0) {
            removeProductFromCart(id);
            return;
        }

        // Actualizar en carrito temporal
        setCart(prev => prev.map(item => {
            if (item.id === id) {
                const price = item.applyDiscount && item.discountPrice // Corregido 'applyDiscard' a 'applyDiscount'
                    ? item.discountPrice
                    : item.priceWithTax;
                return {
                    ...item,
                    quantity,
                    totalPrice: price * quantity
                };
            }
            return item;
        }));

        // Actualizar también en editedDetails
        setEditedDetails(prev => prev.map(detail => {
            if (detail.product_id === id) {
                return {
                    ...detail,
                    amount: quantity,
                    subtotal: detail.price * quantity
                };
            }
            return detail;
        }));
    };

    const handleSaveChanges = async () => {
        if (editedDetails.length === 0) {
            toast.error('No puedes guardar una cotización sin productos');
            return;
        }

        setLoading(true);

        try {
            const updateData = {
                details: editedDetails.map(detail => ({
                    id: detail.id,
                    product_id: detail.product_id,
                    amount: detail.amount,
                    price: detail.price,
                    subtotal: detail.subtotal
                })),
                subtotal: calculatedTotals.subtotal,
                total: calculatedTotals.total
            };

            router.put(`/quotes/${quote.id}`, updateData, {
                onSuccess: () => {
                    toast.success('Cotización actualizada exitosamente');
                    setIsEditing(false);
                    setCart([]); // Limpiar carrito temporal
                    setExistingProductIds([]);
                },
                onError: (errors) => {
                    console.error('Error al actualizar:', errors);
                    toast.error('Error al actualizar la cotización');
                }
            });
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error al actualizar la cotización');
        } finally {
            setLoading(false);
        }
    };

    const handleCancelEdit = () => {
        // Restaurar los detalles originales
        setEditedDetails(initialDetails);
        setCart([]); // Limpiar carrito temporal
        setExistingProductIds([]); // Limpiar IDs de productos existentes
        setIsEditing(false);
        toast.info('Cambios cancelados');
    };

    const handleStartEdit = () => {
        setIsEditing(true);
        // Al iniciar la edición, los editedDetails ya deben tener los initialDetails
        // Y el carrito debe estar vacío para nuevos productos
        setCart([]);
        const productIds = initialDetails
            .map(detail => detail.product_id)
            .filter((id): id is number => id !== undefined);
        setExistingProductIds(productIds);
    };

    // --- Preparación de props para SaleFromQuoteModal ---
    // Mapea initialDetails (QuoteDetail[]) a ProductForSaleModal[]
    const productsForSaleModal = initialDetails.map(detail => ({
        id: detail.product_id || detail.id || 0, // Asegura que haya un ID de producto
        name: detail.product_name,
        quantity: detail.amount, // ¡Aquí está la corrección clave! Mapear 'amount' a 'quantity'
        price: detail.price,
    }));

    return (
        <AppLayout>
            <Head title="Cotizaciones" />
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
                        {isEditing && (
                            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                                Modo edición
                            </span>
                        )}
                    </div>

                    <div className="flex gap-2">

                        {!isEditing ? (
                            <>
                                {hasPermission("realizar ventas") && (
                                    <button
                                        onClick={handleStartEdit}
                                        className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition flex items-center gap-2"
                                    >
                                        Editar
                                    </button>
                                )}
                                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                                    Generar PDF
                                </button>

                                <button
                                    className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition"
                                    onClick={() => {
                                        console.log("Abriendo modal de venta. Quote:", quote);
                                        console.log("Detalles para el modal de venta:", productsForSaleModal);
                                        setIsSaleModalOpen(true);
                                    }}
                                >
                                    Pasar a ventas
                                </button>



                                <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition "
                                    onClick={async () => {
                                        try {
                                            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '';
                                            const response = await fetch(`/quotes/send-whatsapp/${quote.id}`, {
                                                method: 'POST',
                                                headers: {
                                                    'X-CSRF-TOKEN': csrfToken || '',
                                                    'Accept': 'application/json'
                                                }
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
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={handleSaveChanges}
                                    disabled={loading}
                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition flex items-center gap-2 disabled:opacity-50"
                                >
                                    {loading ? 'Guardando...' : 'Guardar'}
                                </button>
                                <button
                                    onClick={() => setIsProductModalOpen(true)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                                >
                                    Agregar Productos
                                </button>
                                <button
                                    onClick={handleCancelEdit}
                                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition flex items-center gap-2"
                                >
                                    Cancelar
                                </button>
                            </>
                        )}

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
                                    <p className="font-bold text-xl text-green-600">
                                        {formatCurrency(isEditing ? calculatedTotals.total : quote.total)}
                                    </p>
                                    {isEditing && calculatedTotals.total !== quote.total && (
                                        <p className="text-sm text-gray-500">
                                            Original: {formatCurrency(quote.total)}
                                        </p>
                                    )}
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
                                    {isEditing && (
                                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Acciones
                                        </th>
                                    )}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {editedDetails && editedDetails.length > 0 ? (
                                    editedDetails.map((detail, index) => {
                                        const isNewProduct = !detail.id; // Producto agregado en esta sesión de edición
                                        return (
                                            <tr key={index} className={`hover:bg-gray-50 ${isNewProduct ? 'bg-blue-50' : ''}`}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {detail.product_name || 'Producto no disponible'}
                                                        {isNewProduct && (
                                                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                                Nuevo
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                                    {isEditing ? (
                                                        <input
                                                            type="number"
                                                            min="1"
                                                            value={detail.amount}
                                                            onChange={(e) => handleQuantityChange(index, parseInt(e.target.value) || 1)}
                                                            className="w-20 px-2 py-1 text-sm border rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        />
                                                    ) : (
                                                        <div className="text-sm text-gray-900">
                                                            {detail.amount || 0}
                                                        </div>
                                                    )}
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
                                                {isEditing && (
                                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                                        <button
                                                            onClick={() => handleRemoveProduct(index)}
                                                            className="text-red-600 hover:text-red-800 transition text-sm"
                                                            title="Eliminar producto"
                                                        >
                                                            Eliminar
                                                        </button>
                                                    </td>
                                                )}
                                            </tr>
                                        );
                                    })
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
                    <div className="px-6 py-4 bg-gray-50 border-t">
                        <div className="flex justify-end">
                            <div className="w-64 space-y-2">
                                <div className="flex justify-between text-lg font-bold border-t pt-2">
                                    <span>Total:</span>
                                    <span className="text-green-600">
                                        {formatCurrency(isEditing ? calculatedTotals.total : quote.total)}
                                    </span>
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
            </div>

            {/* Modal de productos - Solo pasar la lista combinada cuando esté en modo edición */}
            <ProductList
                items={getCombinedCartForModal()}
                isOpen={isProductModalOpen}
                closeModal={() => setIsProductModalOpen(false)}
                onSelectProduct={handleSelectProduct}
            />

            {/* Modal de confirmación de venta */}
            <SaleFromQuoteModal
                isOpen={isSaleModalOpen}
                onClose={() => setIsSaleModalOpen(false)}
                quote={quote}
                // Aquí pasamos los productos mapeados con 'quantity' en lugar de 'amount'
                quoteDetails={productsForSaleModal}
                onSaleCreated={() => {
                    // Lógica para recargar la página o actualizar datos después de crear una venta
                    toast.success("Venta creada con éxito!");
                    router.reload({ only: ['quote', 'details'] }); // Recargar la página o solo los datos de la cotización
                    setIsSaleModalOpen(false); // Cerrar el modal
                }}
            />
        </AppLayout>
    );
}

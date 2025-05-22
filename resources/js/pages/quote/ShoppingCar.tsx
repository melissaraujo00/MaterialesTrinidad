interface Product {
    id: number;
    name: string;
    price: number;
    priceWithTax: number;
    discountPrice: number | null;
    brand_id: string;
    category_id: string;
    image: string;
    stock: number;
    stockMinimun: number;
}

interface ProducItem extends Product {
    quantity: number;
    applyDiscount: boolean;
    totalPrice: number;
}

interface Props {
    items: ProducItem[];
    isOpen: boolean;
    closeModal: () => void;
    onDeleteProduct: (id: number) => void;
    onClearCart?: () => void; // Nueva prop opcional
}

export default function ShoppingCart({ 
    items, 
    isOpen, 
    closeModal, 
    onDeleteProduct, 
    onClearCart 
}: Props) {
    if (!isOpen || !items) return null;

    // Calcular total general
    const totalGeneral = items.reduce((acc, item) => {
        const precioUnitario = item.applyDiscount && item.discountPrice != null
            ? item.discountPrice
            : item.priceWithTax;
        return acc + precioUnitario * item.quantity;
    }, 0);

    const handleClearCart = () => {
        
            onClearCart?.();
            closeModal();
     
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="relative w-full max-w-4xl mx-auto bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-6">
                

                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                        Carrito de compras ({items.length} productos)
                    </h2>
                    {items.length > 0 && onClearCart && (
                        <button
                            onClick={handleClearCart}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition  mr-"
                        >
                            Limpiar Todo
                        </button>
                    )}
                </div>

                {items.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-500 italic text-lg">No hay productos en el carrito.</p>
                        <p className="text-gray-400 text-sm mt-2">
                            Los productos que agregues se guardarán automáticamente
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto max-h-[60vh] overflow-y-auto mt-4 rounded-md border">
                            <table className="min-w-full bg-white dark:bg-zinc-800 border border-gray-300 rounded-lg text-sm">
                                <thead className="sticky top-0 bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-white font-semibold">
                                    <tr>
                                        <th className="px-4 py-2 border">Producto</th>
                                        <th className="px-4 py-2 border">Marca</th>
                                        <th className="px-4 py-2 border">Categoría</th>
                                        <th className="px-4 py-2 border">Cantidad</th>
                                        <th className="px-4 py-2 border">Precio Unitario</th>
                                        <th className="px-4 py-2 border">Descuento C/U</th>
                                        <th className="px-4 py-2 border">Descuento Total</th>
                                        <th className="px-4 py-2 border">Total</th>
                                        <th className="px-4 py-2 border">Eliminar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item) => (
                                        <tr key={item.id} className="text-gray-800 dark:text-white text-center">
                                            <td className="px-4 py-2 border text-left">{item.name}</td>
                                            <td className="px-4 py-2 border">{item.brand_id}</td>
                                            <td className="px-4 py-2 border">{item.category_id}</td>
                                            <td className="px-4 py-2 border">{item.quantity}</td>
                                            <td className="px-4 py-2 border">
                                                ${item.applyDiscount && item.discountPrice ? item.discountPrice : item.priceWithTax}
                                            </td>
                                            <td className="px-4 py-2 border font-bold">
                                                {item.applyDiscount
                                                    ? `Sí (-$${(item.priceWithTax - (item.discountPrice ?? 0)).toFixed(2)})`
                                                    : 'No'}
                                            </td>
                                            <td className="px-4 py-2 border font-bold">
                                                {item.applyDiscount
                                                    ? `${((item.priceWithTax - (item.discountPrice ?? 0)) * item.quantity).toFixed(2)}`
                                                    : 'No'
                                                }
                                            </td>

                                            <td className="px-4 py-2 border">
                                                ${(
                                                    (item.applyDiscount && item.discountPrice != null
                                                        ? item.discountPrice
                                                        : item.priceWithTax) * item.quantity
                                                ).toFixed(2)}
                                            </td>

                                            <td className="px-4 py-2 border">
                                                <button
                                                    onClick={() => onDeleteProduct(item.id)}
                                                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition"
                                                    title="Eliminar producto"
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Total y botones */}
                        <div className="flex justify-between items-center mt-6 px-4">
                            <div className="text-xl font-bold text-gray-800 dark:text-white">
                                Total: ${totalGeneral.toFixed(2)}
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={closeModal}
                                    className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-xl font-semibold shadow-lg transition"
                                >
                                    Continuar Comprando
                                </button>
                                <button
                                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl font-semibold shadow-lg transition"
                                >
                                    Procesar Pedido
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
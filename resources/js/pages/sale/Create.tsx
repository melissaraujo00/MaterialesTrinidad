import { Head, Link, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { useState } from "react";
import { toast, Toaster } from "sonner";
import CustomerList from "../quote/CustomersList";
import CustomerListButton from "../../components/CustomerListButton";
import ProductList from "../quote/ProducList";
import { router } from "@inertiajs/react";
import CreateCustomertButton from "@/components/CreateCustomerButton";
import CreateCustomerModal from "../quote/CreateCustomer";
import { useEffect } from "react";
import { Product } from "@/interfaces/productsInterfaces";
import { CartItem } from "@/interfaces/shoppingCartInterfaces";
import { Customer } from "@/interfaces/customersInterfaces";


export default function CreateQuote() {
    const page = usePage() as any;
    const clienteCreated = page.props.customer
    const { departments, municipalities, districts, } = usePage<{
        departments: { id: number; name: string }[];
        municipalities: { id: number; name: string; department_id: number }[];
        districts: { id: number; name: string; municipality_id: number }[];

    }>().props;

    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const userId = page.props.auth?.user?.id;
    const userName = page.props.auth?.user?.name;

    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [openCustomerList, setOpenCustomerList] = useState(false);
    const [openCustomerCreate, setOpenCustomerCreate] = useState(false);


    const openCustomerListModal = () => {
        setOpenCustomerList(true);
    };

    const closeCustomerListModal = () => {
        setOpenCustomerList(false);
    };

    const openCustomerCreatetModal = () => {
        setOpenCustomerCreate(true);
    };

    const closeCustomerCreatetModal = () => {
        setOpenCustomerCreate(false);
    };

    const handleSelectCustomer = (customer: Customer) => {
        setSelectedCustomer(customer);
        toast.success(`Cliente ${customer.name} seleccionado`);
    };

    useEffect(() => {
        if (clienteCreated) {
            setSelectedCustomer(clienteCreated);
            toast.success(`Cliente ${clienteCreated.name} creado y seleccionado`);
        }
    }, [clienteCreated]);

    const handleSelectProduct = (productWithDetails: Product & { quantity: number; applyDiscount: boolean }) => {
        const productExistsInCart = cart.some(item => item.id === productWithDetails.id);

        if (productExistsInCart) {
            toast.error('Este producto ya está en la cotización');
            return;
        }

        // LÓGICA CORREGIDA: Usar el precio que ya viene calculado desde ProducList
        const price = productWithDetails.applyDiscount && productWithDetails.discountPrice
            ? productWithDetails.discountPrice
            : productWithDetails.priceWithTax;

        const newItem: CartItem = {
            ...productWithDetails,
            totalPrice: price * productWithDetails.quantity
        };

        setCart(prev => [...prev, newItem]);

        // El mensaje ya viene desde ProducList, no necesitamos duplicarlo aquí
    };

    const removeProductFromCart = (id: number) => {
        setCart(prev => prev.filter(p => p.id !== id));
        toast.success('Producto eliminado de la cotización');
    };

    const updateProductQuantity = (id: number, quantity: number) => {
        if (quantity <= 0) {
            removeProductFromCart(id);
            return;
        }

        setCart(prev => prev.map(item => {
            if (item.id === id) {
                const price = item.applyDiscount && item.discountPrice
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
    };

    const getTotalCart = () => {
        return cart.reduce((total, item) => total + item.totalPrice, 0);
    };

    const getSubtotal = () => {
        return cart.reduce((total, item) => total + (item.priceWithTax * item.quantity), 0);
    };

    const getTotalDiscount = () => {
        return cart.reduce((total, item) => {
            if (item.applyDiscount && item.discountPrice) {
                return total + ((item.priceWithTax - item.discountPrice) * item.quantity);
            }
            return total;
        }, 0);
    };

    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const clearCart = () => {
        setCart([]);
        toast.success('Cotización limpiada');
    };

    const saveQuotation = () => {
        if (!selectedCustomer || cart.length === 0) {
            toast.error("Debe seleccionar un cliente y agregar productos.");
            return;
        }

        if (isSubmitting) return;

        setIsSubmitting(true);

        const details = cart.map((item) => {
            const price = item.applyDiscount && item.discountPrice
                ? item.discountPrice
                : item.priceWithTax;

            return {
                amount: item.quantity,
                price: price,
                subtotal: price * item.quantity,
                quote_id: 1,
                product_id: item.id,
            };
        });

        const quotationData = {
            total: getTotalCart(),
            date: currentDate,
            subtotal: getSubtotal(),
            customer_id: selectedCustomer.id,
            user_id: userId,
            details
        };

        router.post("/quotes", quotationData, {
            onSuccess: (response: any) => {
                toast.success("Cotización guardada exitosamente.");

            },
            onError: (errors) => {
                toast.error("Ocurrió un error al guardar la cotización.");
                console.error(errors);
                setIsSubmitting(false);
            }
        });





    };

    return (
        <AppLayout>
            <Head title="Crear Cotización" />
            <Toaster position="top-right" richColors />

            <div className="p-6 bg-white rounded-xl shadow dark:bg-black/10 text-black dark:text-white space-y-6">
                <h1 className="text-2xl font-bold">Nueva Cotización</h1>
                <h1 className="text-md font-bold">Vendedor: {userName}</h1>

                {/* Información del cliente seleccionado */}
                {selectedCustomer && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800 w-100">
                        <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Cliente Seleccionado:</h3>
                        <div className="grid grid-cols-[auto,1fr] gap-4 text-blue-800 dark:text-blue-200 text-sm">
                            <div>
                                <p className="font-medium">{selectedCustomer.name}</p>
                                <p>{selectedCustomer.email}</p>
                            </div>
                            <div>
                                <p>{selectedCustomer.phoneNumber}</p>
                                <p>NIT: {selectedCustomer.nit}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Botones de acción */}
                <div className="flex gap-4 flex-wrap">
                    <CustomerListButton openModal={openCustomerListModal} />
                    <CreateCustomertButton openModal={openCustomerCreatetModal} />

                    <button
                        onClick={() => setIsProductModalOpen(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        Agregar Productos
                    </button>

                    {cart.length > 0 && (
                        <button
                            onClick={clearCart}
                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                        >
                            Limpiar Cotización
                        </button>
                    )}
                </div>

                {/* Resumen de carrito */}
                <div className="border-t pt-4">
                    <h2 className="text-lg font-semibold mb-4">Productos en la Cotización:</h2>
                    {cart.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-gray-500 text-lg">No hay productos en la cotización.</p>
                            <p className="text-gray-400 text-sm mt-2">Haz clic en "Agregar Productos" para comenzar.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm border-collapse border border-gray-200 dark:border-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-800">
                                    <tr>
                                        <th className="text-left p-3 border border-gray-200 dark:border-gray-700">Producto</th>
                                        <th className="text-left p-3 border border-gray-200 dark:border-gray-700">Categoria</th>
                                        <th className="text-center p-3 border border-gray-200 dark:border-gray-700">Cantidad</th>
                                        <th className="text-right p-3 border border-gray-200 dark:border-gray-700">Precio Unit.</th>
                                        <th className="text-center p-3 border border-gray-200 dark:border-gray-700">Descuento C/U</th>
                                        <th className="text-center p-3 border border-gray-200 dark:border-gray-700">Descuento Total</th>
                                        <th className="text-right p-3 border border-gray-200 dark:border-gray-700">Total</th>
                                        <th className="text-center p-3 border border-gray-200 dark:border-gray-700">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map(item => (
                                        <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                            <td className="p-3 border border-gray-200 dark:border-gray-700">
                                                <div>
                                                    <div className="font-medium">{item.name}</div>
                                                </div>
                                            </td>
                                            <td className="p-3 border border-gray-200 dark:border-gray-700">
                                                <div>
                                                    <div className="font-medium">{item.category_id}</div>
                                                </div>
                                            </td>
                                            <td className="p-3 text-center border border-gray-200 dark:border-gray-700">
                                                <div className="flex items-center justify-center space-x-2">
                                                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                                                </div>
                                            </td>
                                            <td className="p-3 text-right border border-gray-200 dark:border-gray-700">
                                                {item.applyDiscount && item.discountPrice ? (
                                                    <div>
                                                        <div className="text-green-600 font-medium">
                                                            ${item.discountPrice}
                                                        </div>
                                                        <div className="text-xs text-gray-500 line-through">
                                                            ${item.priceWithTax}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="font-medium">${item.priceWithTax}</div>
                                                )}
                                            </td>
                                            <td className="p-3 text-center border border-gray-200 dark:border-gray-700">
                                                {item.applyDiscount && item.discountPrice ? (
                                                    <span className="text-green-700 dark:text-green-400">
                                                        ${(item.priceWithTax - item.discountPrice).toFixed(2)}
                                                    </span>
                                                ) : (
                                                    <span className="text-gray-400 italic">NO</span>
                                                )}
                                            </td>
                                            <td className="p-3 text-right font-semibold border border-gray-200 dark:border-gray-700">
                                                {item.applyDiscount && item.discountPrice ? (
                                                    <span className="text-green-700 dark:text-green-400">
                                                        ${((item.priceWithTax - item.discountPrice) * item.quantity).toFixed(2)}
                                                    </span>
                                                ) : (
                                                    <span className="text-gray-400 italic">NO</span>
                                                )}
                                            </td>
                                            <td className="p-3 text-center border border-gray-200 dark:border-gray-700">
                                                ${item.totalPrice}
                                            </td>
                                            <td className="p-3 text-center border border-gray-200 dark:border-gray-700">
                                                <button
                                                    className="text-red-600 hover:text-red-800 text-xs px-2 py-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition"
                                                    onClick={() => removeProductFromCart(item.id)}
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot className="bg-gray-50 dark:bg-gray-800">
                                    <tr>
                                        <td colSpan={6} className="p-3 text-right font-semibold border border-gray-200 dark:border-gray-700">
                                            subtotal:
                                        </td>
                                        <td colSpan={2} className="p-3 text-center text-lg font-bold border border-gray-200 dark:border-gray-700">
                                            ${getSubtotal()}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={6} className="p-3 text-right font-semibold border border-gray-200 dark:border-gray-700">
                                            descuento total:
                                        </td>
                                        <td colSpan={2} className="p-3 text-center text-lg font-bold border border-gray-200 dark:border-gray-700">
                                            ${getTotalDiscount().toFixed(2)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={6} className="p-3 text-right font-semibold border border-gray-200 dark:border-gray-700">
                                            Total general:
                                        </td>
                                        <td colSpan={2} className="p-3 text-center text-lg font-bold border border-gray-200 dark:border-gray-700">
                                            ${getTotalCart().toFixed(2)}
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    )}
                </div>

                {/* Botón para enviar cotización */}
                <div className="pt-4 border-t">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={saveQuotation}
                            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                            disabled={!selectedCustomer || cart.length === 0 || isSubmitting}
                        >
                            {isSubmitting ? 'Guardando...' : 'Guardar Cotización'}
                        </button>

                        {(!selectedCustomer || cart.length === 0) && (
                            <div className="text-sm text-gray-500">
                                {!selectedCustomer && (
                                    <p>• Selecciona un cliente</p>
                                )}
                                {cart.length === 0 && (
                                    <p>• Agrega al menos un producto</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modales */}
            <CustomerList
                isOpen={openCustomerList}
                closeModal={closeCustomerListModal}
                onSelectCustomer={handleSelectCustomer}
            />

            <ProductList
                items={cart}
                isOpen={isProductModalOpen}
                closeModal={() => setIsProductModalOpen(false)}
                onSelectProduct={handleSelectProduct}
            />

            <CreateCustomerModal
                isOpen={openCustomerCreate}
                onClose={closeCustomerCreatetModal}
                departments={departments}
                municipalities={municipalities}
                districts={districts}
            />
        </AppLayout>
    );
}

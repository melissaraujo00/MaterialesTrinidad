import { Head, usePage, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { toast, Toaster } from "sonner";
import { useState, useEffect, useRef } from "react";
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import languageES from 'datatables.net-plugins/i18n/es-ES.mjs';
import ShoppingCarButton from '../../components/shoppingCarButton';
import ShoppingCart from "./ShoppingCar";

DataTable.use(DT);

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

interface CartItem extends Product {
    quantity: number;
    applyDiscount: boolean;
    totalPrice: number;
}

// Clave para localStorage
const CART_STORAGE_KEY = 'shopping_cart_items';

export default function AddToCart() {
    const page = usePage();
    const permissions =
        page.props.auth?.user?.permissions && Array.isArray(page.props.auth.user.permissions)
            ? page.props.auth.user.permissions
            : [];
    const hasPermission = (perm: string) => permissions.includes(perm);

    //array que se actualiza cuando se agrega un item
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    //variable para controlar cuando se abre el modal del carrito
    const [openShoppingCar, setOpenShoppingCar] = useState(false);
    const tableRef = useRef<any>(null);

    // Función para cargar el carrito desde localStorage
    const loadCartFromStorage = (): CartItem[] => {
        try {
            const savedCart = localStorage.getItem(CART_STORAGE_KEY);
            if (savedCart) {
                return JSON.parse(savedCart);
            }
        } catch (error) {
            console.error('Error al cargar el carrito desde localStorage:', error);
        }
        return [];
    };

    // Función para guardar el carrito en localStorage
    const saveCartToStorage = (items: CartItem[]) => {
        try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
        } catch (error) {
            console.error('Error al guardar el carrito en localStorage:', error);
        }
    };

    // Cargar el carrito al montar el componente
    useEffect(() => {
        const savedCart = loadCartFromStorage();
        if (savedCart.length > 0) {
            setCartItems(savedCart);
            toast.success(`Se cargaron ${savedCart.length} productos del carrito guardado`);
        }
    }, []);

    // Guardar el carrito cada vez que cambie
    useEffect(() => {
        if (cartItems.length > 0) {
            saveCartToStorage(cartItems);
        } else {
            // Si el carrito está vacío, también limpiamos el localStorage
            localStorage.removeItem(CART_STORAGE_KEY);
        }
    }, [cartItems]);

    //funicon para eliminar un producto del array del carrito
    const handleDeleteProduct = (id: number) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    //funcion para agregar los productos al carrito
    const addToCart = (product: Product, quantity: number, applyDiscount: boolean) => {
        // Verificar si el producto ya existe en el carrito (sin importar el descuento)
        const productExistsInCart = cartItems.some(item => item.id === product.id);

        if (productExistsInCart) {
            toast.error(`${product.name} ya está en el carrito. No se pueden agregar más unidades.`);
            return;
        }

        // Verificar stock disponible
        if (quantity > product.stock) {
            toast.error(`Solo quedan ${product.stock} unidades disponibles`);
            return;
        }

        const price = applyDiscount && product.discountPrice ? product.discountPrice : product.price;

        const newItem: CartItem = {
            ...product,
            quantity,
            applyDiscount,
            totalPrice: price * quantity
        };

        setCartItems(prevItems => [...prevItems, newItem]);
        toast.success(`${product.name} ${applyDiscount ? 'con descuento' : 'sin descuento'} agregado al carrito`);
    };


    // Función para limpiar completamente el carrito
    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem(CART_STORAGE_KEY);
        toast.success('Carrito limpiado');
    };

    const openShoppingCarModal = () => {
        setOpenShoppingCar(true);
    };

    const closeShoppingCarModal = () => {
        setOpenShoppingCar(false);
    };

    // Función para actualizar botones cuando cambie el carrito
    const updateButtons = () => {
        if (tableRef.current) {
            const table = tableRef.current.dt();
            table.rows().every(function () {
                const rowData = this.data() as Product;
                const button = document.querySelector(`#add-btn-${rowData.id}`) as HTMLButtonElement;

                if (button) {
                    const productExistsInCart = cartItems.some(item => item.id === rowData.id);

                    if (productExistsInCart) {
                        button.disabled = true;
                        button.innerText = 'En Carrito';
                        button.className = 'bg-gray-400 text-white rounded px-3 py-2 text-xs cursor-not-allowed';
                    } else if (rowData.stock <= rowData.stockMinimun) {
                        button.disabled = true;
                        button.innerText = 'Sin Stock';
                        button.className = 'bg-gray-400 text-white rounded px-3 py-2 text-xs cursor-not-allowed';
                    } else {
                        button.disabled = false;
                        button.innerText = 'Agregar';
                        button.className = 'bg-blue-600 text-white rounded px-3 py-2 text-xs hover:bg-blue-700 transition';
                    }
                }
            });
        }
    };

    // Actualizar botones cuando cambie el carrito
    useEffect(() => {
        updateButtons();
    }, [cartItems]);

    const columns = [
        {
            data: 'name',
        },
        {
            data: 'brand_id',
        },
        {
            data: 'category_id',
        },
        {
            data: 'priceWithTax',
        },
        {
            data: 'discountPrice',
        },
        {
            data: 'image',
            createdCell: (td: HTMLTableCellElement, cellData: any, rowData: any) => {
                if (cellData) {
                    td.innerHTML = `<img src="${cellData}" alt="Imagen del producto" class="h-20 w-20 object-cover rounded shadow-sm transition-transform duration-200 hover:scale-105 m-0 p-0"/>`;
                } else {
                    td.innerHTML = `<div class="flex justify-center"><span class="text-gray-500 italic">Sin imagen</span></div>`;
                }
            }
        },
        {
            data: null,
            orderable: false,
            searchable: false,
            createdCell: (td: HTMLTableCellElement, cellData: any, rowData: Product) => {
                const formId = `product-${rowData.id}`;

                td.innerHTML = `
                    <div class="flex flex-col items-center">
                        <input id="${formId}-quantity" 
                               class="rounded border border-gray-300 p-1 w-16 text-center" 
                               type="number" 
                               min="1" 
                               value="1">       
                    </div>
                `;
            }
        },
        {
            data: null,
            orderable: false,
            searchable: false,
            createdCell: (td: HTMLTableCellElement, cellData: any, rowData: Product) => {
                const formId = `product-${rowData.id}`;
                if (rowData.discountPrice) {
                    td.innerHTML = `
                        <div class="flex flex-col items-center">
                            <input type="checkbox" id="${formId}-discount" class="rounded">
                            <label for="${formId}-discount" class="text-xs font-medium text-center">
                                (-$${(rowData.priceWithTax - rowData.discountPrice).toFixed(2)})
                            </label>
                        </div>
                    `;
                } else {
                    td.innerHTML = `<span class="text-xs text-gray-500 italic">No disponible</span>`;
                }
            }
        },
        {
            data: null,
            orderable: false,
            searchable: false,
            createdCell: (td: HTMLTableCellElement, cellData: any, rowData: Product) => {
                const formId = `product-${rowData.id}`;
                td.innerHTML = '';

                // Crear contenedor para el botón
                const buttonContainer = document.createElement('div');
                buttonContainer.className = 'flex items-center justify-center';

                const button = document.createElement('button');
                button.id = `add-btn-${rowData.id}`;
                button.className = 'bg-blue-600 text-white rounded px-3 py-2 text-xs hover:bg-blue-700 transition';
                button.innerText = 'Agregar';

                // Verificar stock inicial
                if (rowData.stock <= rowData.stockMinimun) {
                    button.disabled = true;
                    button.innerText = 'Sin Stock';
                    button.className = 'bg-gray-400 text-white rounded px-3 py-2 text-xs cursor-not-allowed';
                }

                // Agregar evento click al botón
                button.addEventListener('click', () => {
                    const quantitySelect = document.getElementById(`${formId}-quantity`) as HTMLInputElement;
                    const discountCheckbox = document.getElementById(`${formId}-discount`) as HTMLInputElement;

                    const quantity = parseInt(quantitySelect?.value) || 1;
                    const applyDiscount = discountCheckbox ? discountCheckbox.checked : false;

                    // Llamar función addToCart
                    addToCart(rowData, quantity, applyDiscount);
                });

                // Agregar botón al contenedor y al td
                buttonContainer.appendChild(button);
                td.appendChild(buttonContainer);
            }
        }
    ];

    return (
        <AppLayout>
            <Head title="Agregar al Carrito" />
            <Toaster position="top-right" richColors />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <ShoppingCarButton
                    Products={cartItems}
                    openModal={openShoppingCarModal}
                />

                {/* Products table - takes 2/3 of the screen on large displays */}
                <div className="lg:col-span-3 bg-white text-black shadow-lg rounded-xl p-4 dark:bg-black/10 dark:text-white">
                    <div className="flex justify-between items-center mb-5">
                        <h2 className="text-xl font-bold">Productos Disponibles</h2>
                        {cartItems.length > 0 && (
                            <button
                                onClick={clearCart}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                            >
                                Limpiar Carrito
                            </button>
                        )}
                    </div>

                    <DataTable
                        ref={tableRef}
                        ajax="/api/products/getProductData"
                        options={{
                            language: languageES,
                            responsive: true,
                            dom: 'lBrtip',
                            layout: {
                                topStart: ['pageLength'],
                            },
                        }}
                        columns={columns}
                        className="display"
                    >
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Marca</th>
                                <th>Categoría</th>
                                <th>Precio</th>
                                <th>Precio con descuento</th>
                                <th>Imagen</th>
                                <th>Cantidad</th>
                                <th>Descuento</th>
                                <th>Agregar al carrito</th>
                            </tr>
                        </thead>
                    </DataTable>
                </div>
            </div>

            <ShoppingCart
                isOpen={openShoppingCar}
                items={cartItems}
                closeModal={closeShoppingCarModal}
                onDeleteProduct={handleDeleteProduct}
                onClearCart={clearCart}
            />
        </AppLayout>
    );
}
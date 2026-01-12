import { useState, useEffect, useRef } from "react";
import { Head, usePage, Link } from "@inertiajs/react";
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import languageES from 'datatables.net-plugins/i18n/es-ES.mjs';
import 'datatables.net-responsive-dt';
import { toast, Toaster } from "sonner";
import AppLayout from "@/layouts/app-layout";
import { Item } from "@radix-ui/react-navigation-menu";

DataTable.use(DT);

interface OfferInfo {
    id: number;
    description: string;
    startDate: string;
    endDate: string;
    priceOffers: number;
}

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
    allOffers: OfferInfo[];
}

interface CartItem extends Product {
    quantity: number;
    applyDiscount: boolean;
    totalPrice: number;
}

interface ProductListProps {
    items: CartItem[];
    isOpen: boolean;
    closeModal: () => void;
    onSelectProduct: (product: CartItem) => void;
}

export default function ProductList({ isOpen, closeModal, onSelectProduct, items }: ProductListProps) {
    const page = usePage() as any;
    const permissions =
        page.props.auth?.user?.permissions && Array.isArray(page.props.auth.user.permissions)
            ? page.props.auth.user.permissions
            : [];
    const useHasPermissionionion = (perm: string) => permissions.includes(perm);

    const userId = page.props.auth?.user?.id;





    const tableRef = useRef<any>(null);

    const handleAddProduct = (product: Product) => {
        const formId = `product-${product.id}`;
        const quantityInput = document.getElementById(`${formId}-quantity`) as HTMLInputElement;
        const discountCheckbox = document.getElementById(`${formId}-discount`) as HTMLInputElement;
        const offerSelect = document.getElementById(`${formId}-offer-select`) as HTMLSelectElement;

        const quantity = parseInt(quantityInput?.value) || 1;

        // Verificar que la cantidad no exceda el stock disponible
        if (quantity > product.stock) {
            toast.error(`La cantidad solicitada (${quantity}) excede el stock disponible (${product.stock})`);
            return;
        }

        // Verificar stock mínimo
        if (product.stock === 0) {
            toast.error(`El producto ${product.name} no tiene stock suficiente`);
            return;
        }

        // Verificar que el producto no se haya agregado al carrito
        const productExistsInCart = items.some(item => item.id === product.id);
        if (productExistsInCart) {
            toast.error(`${product.name} ya se agregó a la tabla. No se pueden agregar más unidades.`);
            return;
        }

        // LÓGICA CORREGIDA PARA DETERMINAR EL PRECIO
        let finalPrice: number;
        let applyDiscount: boolean = false;
        let discountType: string = 'none';

        // 1. Prioridad: Verificar si hay una oferta seleccionada
        if (offerSelect && offerSelect.value !== '') {
            const selectedOption = offerSelect.options[offerSelect.selectedIndex];
            const priceAttr = selectedOption.getAttribute('data-price');
            if (priceAttr) {
                finalPrice = parseFloat(priceAttr);
                applyDiscount = true;
                discountType = 'offer';
                // Actualizar el producto para incluir el precio de oferta
                product.discountPrice = finalPrice;
            } else {
                finalPrice = product.priceWithTax;
            }
        }
        // 2. Si no hay oferta, verificar si hay descuento manual aplicado
        else if (discountCheckbox && discountCheckbox.checked && product.discountPrice) {
            finalPrice = product.discountPrice;
            applyDiscount = true;
            discountType = 'discount';
        }
        // 3. Si no hay ni oferta ni descuento, usar precio normal
        else {
            finalPrice = product.priceWithTax;
            applyDiscount = false;
            discountType = 'none';
        }

        const productWithDetails: CartItem = {
            ...product,
            quantity,
            applyDiscount,
            totalPrice: finalPrice * quantity,
            // Asegurar que discountPrice refleje el precio final si hay descuento
            discountPrice: applyDiscount ? finalPrice : product.discountPrice
        };


        toast.success(`${product.name} agregado al carrito`);
        onSelectProduct(productWithDetails);
    };



    const updateButtons = () => {
        if (tableRef.current) {
            const table = tableRef.current.dt();
            table.rows().every(function () {
                const rowData = this.data() as Product;
                const button = document.querySelector(`#add-btn-${rowData.id}`) as HTMLButtonElement;

                if (button) {
                    const productExistsInCart = items.some(item => item.id === rowData.id);

                    if (productExistsInCart) {
                        button.disabled = true;
                        button.innerText = 'En Carrito';
                        button.className = 'bg-gray-400 text-white rounded px-3 py-2 text-xs cursor-not-allowed';
                    }
                }
            });
        }
    };
    useEffect(() => {
        updateButtons();
    }, [items]);

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
        //cantidad
        {
            data: null,
            orderable: false,
            searchable: false,
            createdCell: (td: HTMLTableCellElement, cellData: any, rowData: Product) => {
                const formId = `product-${rowData.id}`;
                const maxStock = rowData.stock > rowData.stockMinimun ? rowData.stock : 0;

                td.innerHTML = `
                    <div class="flex flex-col items-center">
                        <input id="${formId}-quantity"
                               class="rounded border border-gray-300 p-1 w-16 text-center"
                               type="number"
                               min="1"
                               max="${maxStock}"
                               value="1"
                               ${maxStock === 0 ? 'disabled' : ''}>
                        <span class="text-xs text-gray-500 mt-1">Máx: ${maxStock}</span>
                    </div>
                `;
            }
        },
        //descuento/oferta
        // Reemplaza la columna de descuento/oferta (índice 7) en tu array de columns con este código:

        {
            data: null,
            orderable: false,
            searchable: false,
            createdCell: (td: HTMLTableCellElement, cellData: any, rowData: Product) => {
                const formId = `product-${rowData.id}`;

                // Limpiar la celda primero
                td.innerHTML = '';

                const container = document.createElement('div');
                container.className = 'flex flex-col items-center space-y-2 min-w-[150px]';

                // Verificar si hay ofertas disponibles
                if (rowData.allOffers && rowData.allOffers.length > 0) {
                    // Crear select para ofertas
                    const selectContainer = document.createElement('div');
                    selectContainer.className = 'w-full';

                    const select = document.createElement('select');
                    select.id = `${formId}-offer-select`;
                    select.className = 'w-full text-xs rounded border border-gray-300 p-1';

                    // Opción por defecto (sin oferta)
                    const defaultOption = document.createElement('option');
                    defaultOption.value = '';
                    defaultOption.textContent = 'Sin oferta';
                    select.appendChild(defaultOption);

                    // Agregar opciones de ofertas
                    rowData.allOffers.forEach((offer: OfferInfo) => {
                        const option = document.createElement('option');
                        option.value = offer.id.toString();
                        option.textContent = `${offer.description} (-$${((rowData.priceWithTax - offer.priceOffers)).toFixed(2)})`;
                        option.setAttribute('data-price', offer.priceOffers.toString());
                        select.appendChild(option);
                    });

                    selectContainer.appendChild(select);
                    container.appendChild(selectContainer);

                    // Evento para manejar cambio de oferta
                    select.addEventListener('change', (e) => {
                        const target = e.target as HTMLSelectElement;
                        console.log('Oferta seleccionada:', target.value);
                        // Aquí puedes agregar lógica adicional si necesitas
                    });

                } else if (rowData.discountPrice && rowData.discountPrice > 0) {
                    // Si no hay ofertas pero sí hay precio con descuento, mostrar checkbox
                    const checkboxContainer = document.createElement('div');
                    checkboxContainer.className = 'flex flex-col items-center';

                    checkboxContainer.innerHTML = `
                <input type="checkbox" id="${formId}-discount" class="rounded">
                <label for="${formId}-discount" class="text-xs font-medium text-center">
                    Descuento (-$${((rowData.priceWithTax - rowData.discountPrice)).toFixed(2)})
                </label>
            `;

                    container.appendChild(checkboxContainer);
                } else {
                    // No hay ofertas ni descuentos disponibles
                    const noOfferSpan = document.createElement('span');
                    noOfferSpan.className = 'text-xs text-gray-500 italic';
                    noOfferSpan.textContent = 'No disponible';
                    container.appendChild(noOfferSpan);
                }

                td.appendChild(container);
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
                const productExistsInCart = items.some(item => item.id === rowData.id);

                // Verificar stock inicial
                if (rowData.stock == 0) {
                    button.disabled = true;
                    button.innerText = 'Sin Stock';
                    button.className = 'bg-red-400 text-white rounded px-3 py-2 text-xs cursor-not-allowed';
                }

                else if (productExistsInCart) {
                    button.disabled = true;
                    button.innerText = 'En Carrito';
                    button.className = 'bg-gray-400 text-white rounded px-3 py-2 text-xs cursor-not-allowed';
                }
                else {
                    // Agregar evento click al botón solo si hay stock
                    button.addEventListener('click', () => {
                        handleAddProduct(rowData);
                    });
                }

                // Agregar botón al contenedor y al td
                buttonContainer.appendChild(button);
                td.appendChild(buttonContainer);
            }
        }
    ];

    if (!isOpen) return null;
    return (


        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">

            {/* Products table - takes full width */}
            <div className="lg:col-span-3 bg-white text-black shadow-lg rounded-xl p-4 dark:bg-black/10 dark:text-white">

                {/* Header con información del cliente seleccionado */}
                <div className="flex justify-between items-center mb-5 gap-6">
                    <div className="flex gap-4 items-center">
                        <h2 className="text-xl font-bold">Productos Disponibles</h2>

                    </div>
                    <button
                        onClick={closeModal}
                        className="text-white bg-red-500 hover:bg-red-600 transition px-3 py-1 rounded text-sm"
                    >
                        ✕ Cerrar
                    </button>

                </div>

                <DataTable
                    ref={tableRef}
                    ajax="/api/products/getProductData"
                    options={{
                        language: languageES,
                        responsive: true,
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

    );
}

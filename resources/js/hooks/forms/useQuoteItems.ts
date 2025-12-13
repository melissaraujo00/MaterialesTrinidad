// resources/js/hooks/forms/useQuoteItems.ts
import { useState, useEffect } from 'react';
import { Product } from '@/types/entities/product';

interface QuoteItem {
    product_id: string | number;
    quantity: number;
    price: number;
    subtotal?: number;
}

interface UseQuoteItemsProps {
    products: Product[];
    initialItems?: QuoteItem[];
}

export function useQuoteItems({ products, initialItems }: UseQuoteItemsProps) {
    const [items, setItems] = useState<QuoteItem[]>(initialItems || [
        { product_id: '', quantity: 1, price: 0 }
    ]);

    const [discount, setDiscount] = useState<number>(0); // Porcentaje (0-100)

    // Agregar nueva fila
    const addItem = () => {
        setItems([...items, { product_id: '', quantity: 1, price: 0 }]);
    };

    // Eliminar fila
    const removeItem = (index: number) => {
        if (items.length > 1) {
            const newItems = items.filter((_, i) => i !== index);
            setItems(newItems);
        }
    };

    // Actualizar un campo de una fila específica
    const updateItem = (index: number, field: keyof QuoteItem, value: any) => {
        const newItems = [...items];
        newItems[index] = {
            ...newItems[index],
            [field]: value
        };
        setItems(newItems);
    };

    // Obtener precio de un producto por ID
    const getProductPrice = (productId: string | number) => {
        const product = products.find(p => p.id == productId);
        return product ? parseFloat(product.price.toString()) : 0;
    };

    // Calcular subtotal de una línea
    const calculateItemSubtotal = (item: QuoteItem) => {
        return (item.quantity || 0) * (item.price || 0);
    };

    // --- Cálculos Generales ---

    // 1. Subtotal (Suma de todos los items)
    const subtotal = items.reduce((sum, item) => sum + calculateItemSubtotal(item), 0);

    // 2. Monto del Descuento
    const discountAmount = subtotal * (discount / 100);

    // 3. Subtotal menos descuento
    const subtotalLessDiscount = subtotal - discountAmount;

    // 4. Impuestos (IVA 13%) - Calculado sobre el subtotal con descuento aplicado
    const taxRate = 0.13;
    const taxAmount = subtotalLessDiscount * taxRate;

    // 5. Total Final
    const total = subtotalLessDiscount + taxAmount;

    return {
        items,
        addItem,
        removeItem,
        updateItem,
        getProductPrice,
        calculateItemSubtotal,
        // Valores calculados
        subtotal,
        discount,       // El porcentaje
        setDiscount,    // Setter del porcentaje
        discountAmount, // El dinero descontado
        taxAmount,
        total
    };
}

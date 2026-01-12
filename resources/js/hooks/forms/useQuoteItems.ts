import { useState, useEffect } from 'react';

interface QuoteItem {
    product_id: string | number;
    quantity: number;
    price: number;
}

interface UseQuoteItemsProps {
    products: any[];
    initialItems?: QuoteItem[];
}

export function useQuoteItems({ products = [], initialItems = [] }: UseQuoteItemsProps) {
    // Inicializamos con los items que vienen o un array vacío (NUNCA undefined)
    const [items, setItems] = useState<QuoteItem[]>(initialItems.length > 0 ? initialItems : []);

    const [discount, setDiscount] = useState<number>(0);

    const addItem = () => {
        setItems([...items, { product_id: '', quantity: 1, price: 0 }]);
    };

    const removeItem = (index: number) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems.length > 0 ? newItems : [{ product_id: '', quantity: 1, price: 0 }]);
    };

    const updateItem = (index: number, field: keyof QuoteItem, value: any) => {
        const newItems = [...items];
        newItems[index] = { ...newItems[index], [field]: value };
        setItems(newItems);
    };

    const getProductPrice = (productId: string | number) => {
        const product = products.find(p => p.id == productId);
        return product ? parseFloat(product.priceWithTax || product.price) : 0;
    };

    const calculateItemSubtotal = (item: QuoteItem) => {
        return (Number(item.quantity) || 0) * (Number(item.price) || 0);
    };

    // Cálculos
    const grossTotal = items.reduce((sum, item) => sum + calculateItemSubtotal(item), 0);
    const discountAmount = grossTotal * (discount / 100);
    const total = grossTotal - discountAmount;
    const subtotal = total / 1.13;
    const taxAmount = total - subtotal;

    return {
        items: items || [], // Blindaje extra
        addItem,
        removeItem,
        updateItem,
        getProductPrice,
        calculateItemSubtotal,
        subtotal,
        discount,
        setDiscount,
        discountAmount,
        taxAmount,
        total
    };
}

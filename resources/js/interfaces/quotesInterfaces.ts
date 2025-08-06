// Mantén QuoteDetail tal cual, si realmente representa la estructura del backend
export interface QuoteDetail {
    id?: number; // ID del registro de detalle de la cotización en sí
    product_id?: number; // ID del producto real
    product_name: string;
    amount: number; // Esta es la cantidad en el detalle de la cotización
    price: number;
    subtotal: number;
}

export interface Quote {
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

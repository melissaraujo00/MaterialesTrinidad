export interface Product { // Esta interfaz parece describir un producto completo de tu inventario
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

// Interfaz para los productos que se pasarán a SaleFromQuoteModal
// Esto se alinea con la expectativa de la interfaz 'Product' de SaleFromQuoteModal
export interface ProductForSaleModal {
    id: number;
    name: string;
    quantity: number;
    price: number;
}

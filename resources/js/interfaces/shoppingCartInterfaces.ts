import { Product } from "./productsInterfaces";

export interface CartItem extends Product {
    quantity: number; // Cantidad en el carrito
    applyDiscount: boolean; // Asumiendo que esto está presente en tu lógica de selección de productos
    totalPrice: number;
}




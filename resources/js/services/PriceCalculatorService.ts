//price with tax
//price without tax

import { CartItem } from "@/interfaces/shoppingCartInterfaces"

export function priceCalculator  = (productWithDetails: CartItem): number => {
    return productWithDetails.applyDiscount && productWithDetails.discountPrice
        ? productWithDetails.discountPrice
        : productWithDetails.priceWithTax;
}


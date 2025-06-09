import { ShoppingCart } from "lucide-react";


interface Product {
    id: number;
    name: string;
    price: number;
    discountPrice: number | null;
    brand_id: string;
    category_id: string;
    image: string;
    stock: number;
    quantity?: number;
    totalPrice?: number;
    applyDiscount?: boolean;
}

interface Props {
    Products: Array<Product>;
    openModal: () => void;
}

export default function ShoppingCarButton({ Products,openModal }: Props) {
    return (
        <button
            className="bg-green-600 text-white rounded px-2 py-1 text-sm hover:bg-green-700 transition flex items-center gap-1   "
            onClick={openModal}
            >
           <ShoppingCart className="w-4 h-4" />
            Ver carrito: {Products.length}
        </button>
    );
}
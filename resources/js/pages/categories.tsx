import { Head } from '@inertiajs/react';
import { Category } from '@/types';

interface CategoriesProps {
    categories: Category[];
}

export default function Categories({ categories }: CategoriesProps) {
    return (
        <>
            <Head title="Categorías" />
            <div className="p-6">
                <h1 className="text-2xl font-bold">Categorías</h1>
                <ul className="mt-4">
                    {categories.map((category: Category) => (
                        <li key={category.id} className="border p-2 my-2">
                            {category.name} - {category.description}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

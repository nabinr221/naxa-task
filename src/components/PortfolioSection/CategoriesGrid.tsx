// components/CategoriesGrid.tsx
import React from "react";

interface Category {
  id: number;
  name: string;
}

interface CategoriesGridProps {
  categories: Category[];
  selectedCategory: number;
  onCategorySelect: (categoryId: number) => void;
}

export const CategoriesGrid: React.FC<CategoriesGridProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
}) => {
  return (
    <div className="w-[80%] -mt-16 mx-auto custom-shadow p-10 grid grid-cols-5 gap-1 items-center bg-white">
      {categories.map((category) => (
        <div
          key={category.id}
          className={`w-full h-fit px-3 py-2 text-sm capitalize transition-all duration-200 cursor-pointer font-semibold ${
            selectedCategory === category.id
              ? "bg-amber-400 text-blue-900 border-amber-500"
              : "text-gray-400 hover:bg-amber-400 hover:text-blue-900"
          }`}
          onClick={() => onCategorySelect(category.id)}
        >
          {category.name}
        </div>
      ))}
    </div>
  );
};

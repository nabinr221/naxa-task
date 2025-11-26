// components/CategoryHeader.tsx
import React from "react";

interface CategoryHeaderProps {
  categoryName: string;
  projectCount: number;
}

export const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  categoryName,
  projectCount,
}) => {
  return (
    <h2 className="text-2xl font-bold mb-6">
      {categoryName}
      <span className="text-gray-500 ml-2">({projectCount} projects)</span>
    </h2>
  );
};

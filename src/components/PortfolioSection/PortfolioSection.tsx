// components/PortfolioSection.tsx
import React from "react";
import { CategoriesGrid } from "./CategoriesGrid";
import { CategoryHeader } from "./CategoryHeader";
import { ProjectsGrid } from "./ProjectsGrid";
import type { Project } from "../../types";

interface Category {
  id: number;
  name: string;
}

interface PortfolioSectionProps {
  categories: Category[];
  selectedCategory: number;
  filteredProjects: Project[];
  onCategorySelect: (categoryId: number) => void;
  showDebugInfo?: boolean;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  categories,
  selectedCategory,
  filteredProjects,
  onCategorySelect,
}) => {
  const selectedCategoryName = categories.find(
    (cat) => cat.id === selectedCategory
  )?.name;

  return (
    <section className="w-full h-full relative">
      {/* Categories Grid */}
      <CategoriesGrid
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={onCategorySelect}
      />

      {/* Projects Display */}
      <div className="w-[80%] mx-auto mt-10">
        <CategoryHeader
          categoryName={selectedCategoryName || ""}
          projectCount={filteredProjects.length}
        />

        <ProjectsGrid
          projects={filteredProjects}
          categoryName={selectedCategoryName || ""}
        />
      </div>
    </section>
  );
};

import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { PortfolioService } from "../services/portfolio.sevices";

const useProjects = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const categories = useMemo(
    () => [
      { id: 0, name: "Key Highlights" },
      { id: 1, name: "Web GIS and Data Visualization" },
      { id: 2, name: "Agriculture" },
      { id: 3, name: "Disaster Risk Resilience" },
      { id: 4, name: "Training & Capacity Building" },
      { id: 5, name: "Software & Application Development" },
      { id: 6, name: "E-Governance" },
      { id: 7, name: "Surveying and GIS Mapping" },
      { id: 8, name: "Open Data Initiatives" },
      { id: 9, name: "Innovation in Land Reform and Management" },
      { id: 10, name: "Tourism" },
      { id: 11, name: "Frontier Technologies" },
    ],
    []
  );

  // Fetch ALL projects once
  const { data: allProjects } = useSuspenseQuery({
    queryKey: ["projects"],
    queryFn: () => PortfolioService.getPortfolios(),
  });

  // Filter data based on selected category
  const filteredData = useMemo(() => {
    if (!allProjects || !Array.isArray(allProjects)) return [];

    const selectedCategoryName = categories.find(
      (cat) => cat.id === selectedCategory
    )?.name;

    const filtered =
      selectedCategory === 0
        ? // Key Highlights - show featured projects
          allProjects.filter((project) => project.is_key_highlight)
        : // Other categories - filter by category_title array
          allProjects.filter((project) =>
            project.category_title?.includes(selectedCategoryName || "")
          );

    // Convert string id to number
    return filtered.map((project) => ({
      ...project,
      id:
        typeof project.id === "string" ? parseInt(project.id, 10) : project.id,
    }));
  }, [allProjects, selectedCategory, categories]);

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  return { filteredData, categories, selectedCategory, handleCategorySelect };
};

export default useProjects;

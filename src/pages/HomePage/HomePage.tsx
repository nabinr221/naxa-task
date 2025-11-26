// pages/HomePage.tsx
import { useState, useMemo } from "react";
import bannerImage from "../../assets/bannerImage.svg";
import { useSuspenseQuery } from "@tanstack/react-query";
import { PortfolioService } from "../../services/portfolio.sevices";
import { PortfolioSection } from "../../components/PortfolioSection";

export const HomePage = () => {
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
      id: typeof project.id === "string" ? parseInt(project.id, 10) : project.id,
    }));
  }, [allProjects, selectedCategory, categories]);

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="mb-10">
      {/* Banner Section */}
      <section className="relative w-full h-[450px]">
        <div className="bg-[#f5f5f5] w-full h-full relative overflow-hidden">
          <div className="absolute -top-7 -left-24 w-1/2 h-1/2 z-0">
            <img
              src={bannerImage}
              alt="Background"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex items-center justify-center h-full relative z-10">
            <div className="w-1/2 text-center space-y-5">
              <h6 className="text-[#ffab00] font-bold text-[20px]">
                Portfolio
              </h6>
              <h1 className="text-6xl font-medium">
                Diverse,<span className="text-blue-500"> Impactful</span>, and
                Reliable.
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section with Components */}
      <PortfolioSection
        categories={categories}
        selectedCategory={selectedCategory}
        filteredProjects={filteredData}
        onCategorySelect={handleCategorySelect}
        showDebugInfo={false} // Set to true for debugging
      />
    </div>
  );
};

export default HomePage;

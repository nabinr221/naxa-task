import BannerSection from "../../components/BannerSection/BannerSection";
import { PortfolioSection } from "../../components/PortfolioSection";
import useProjects from "../../hooks/useProjects";

export const HomePage = () => {
  const { categories, selectedCategory, filteredData, handleCategorySelect } =
    useProjects();
  return (
    <div className="mb-10">
      <BannerSection />
      <PortfolioSection
        categories={categories}
        selectedCategory={selectedCategory}
        filteredProjects={filteredData}
        onCategorySelect={handleCategorySelect}
        showDebugInfo={false}
      />
    </div>
  );
};

export default HomePage;

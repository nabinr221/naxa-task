// components/ProjectsGrid.tsx
import React from "react";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "../../types";

interface ProjectsGridProps {
  projects: Project[];
  categoryName: string;
}

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({ projects }) => {
  if (projects.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No projects found in this category.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

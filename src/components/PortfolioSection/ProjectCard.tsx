// components/ProjectCard.tsx
import React from "react";
import type { Project } from "../../types";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className=" hover:shadow-lg transition-shadow bg-white">
      <div className="bg-blue-600 p-10 text-white ">
        <h3 className="text-2xl font-semibold mt-10 mb-5">{project.title}</h3>
        <p className="">{project.subtitle}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
          <div>
            <h6 className="text-amber-400 text-sm font-semibold">Client</h6>
            <p className="text-sm font-semibold">{project.clients}</p>
          </div>
          <div>
            <h6 className="text-amber-400 text-sm font-semibold">
              Time duration
            </h6>
            <p className="text-sm font-semibold">
              {project.start_date} - {project.end_date}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full h-full">
        <img src={project.photo} alt="" className="w-full " />
      </div>
    </div>
  );
};

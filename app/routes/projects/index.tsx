import type { Route } from "./+types";
import type { Project, StrapiResponse, StrapiProject } from "~/types";
import ProjectCard from "~/components/ProjectCard";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Pagination from "~/components/Pagination";

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: Array<Project> }> {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/projects?populate=*`
  );
  const json: StrapiResponse<StrapiProject> = await res.json();

  const data = json.data.map((item) => ({
    id: item.id,
    documentId: item.documentId,
    title: item.title,
    description: item.description,
    image: item.image?.url
      ? `${import.meta.env.VITE_STRAPI_URL}${item.image.url}`
      : "/images/no-image.png",
    url: item.url,
    date: item.date,
    category: item.category,
    featured: item.featured,
  }));

  return { projects: data };
}

const ProjectsPage = ({ loaderData }: Route.ComponentProps) => {
  const [selectedCategory, setSelectecCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 5;

  const { projects } = loaderData as { projects: Array<Project> };

  const categories = [
    "All",
    ...new Set(projects.map((project) => project.category)),
  ];
  console.log(categories);
  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  //calculate total pages
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  //get current page projects
  const indexOfLast = currentPage * projectsPerPage;
  const indexOfFirst = indexOfLast - projectsPerPage;

  //get the projects to show in the current page
  const currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast);

  return (
    <>
      <h2 className="text-3xl text-white font-bold mb-8">Projects</h2>

      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectecCategory(category);
              setCurrentPage(1);
            }}
            className={`px-3 py-1 rounded text-sm cursor-pointer
                         ${selectedCategory === category ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-200"}`}
          >
            {category}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div layout className="grid gap-6 sm:grid-cols-2">
          {currentProjects.map((project) => (
            <motion.div key={project.id} layout>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default ProjectsPage;

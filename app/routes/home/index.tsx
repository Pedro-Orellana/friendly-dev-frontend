import type { Route } from "./+types/index";
import Hero from "~/components/Hero";
import FeaturedProjects from "~/components/FeaturedProjects";
import AboutPreview from "~/components/AboutPreview";
import LatestPosts from "~/components/LatestPosts";

import type { PostMeta, Project } from "~/types";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "The Friendly dev | Welcome" },
    { name: "description", content: "Webpage to showcase my work" },
  ];
}

export async function loader({ request }: Route.LoaderArgs): Promise<{
  projects: Array<Project>;
  posts: Array<PostMeta>;
}> {
  const postsURL = new URL(request.url);

  const [projectsRes, postsRes] = await Promise.all([
    fetch(`${import.meta.env.VITE_API_URL}/projects`),
    fetch(new URL("/posts-meta.json", postsURL)),
  ]);

  // const res = await fetch(`${import.meta.env.VITE_API_URL}/projects`);
  // if(!res.ok) throw new Response("Something went wrong trying to fetch data");

  if (!projectsRes.ok || !postsRes.ok)
    throw new Error("Something went wrong trying to fetch the data");

  const [projects, posts] = await Promise.all([
    projectsRes.json(),
    postsRes.json(),
  ]);

  //const projects : Array<Project> = await res.json();

  //declare a limit of how many posts we want
  const postLimit = 3;

  //getting the newest posts
  const latestPosts = [...posts]
    .sort((a: PostMeta, b: PostMeta) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .slice(0, postLimit);

  const featuredProjects: Array<Project> = projects.filter(
    (project: Project) => project.featured === true
  );
  return {
    projects: featuredProjects,
    posts: latestPosts,
  };
}

const HomePage = ({ loaderData }: Route.ComponentProps) => {
  const { projects, posts } = loaderData;

  return (
    <>
      <FeaturedProjects projects={projects} count={2} />
      <AboutPreview />
      <LatestPosts />
    </>
  );
};

export default HomePage;

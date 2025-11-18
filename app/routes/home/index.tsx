import type { Route } from "./+types/index";
import Hero from "~/components/Hero";
import FeaturedProjects from "~/components/FeaturedProjects";
import AboutPreview from "~/components/AboutPreview";
import LatestPosts from "~/components/LatestPosts";
import type { StrapiProject, StrapiResponse, StrapiPost } from "~/types";

import type { PostMeta, Project } from "~/types";
import { body } from "framer-motion/client";

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
    fetch(`${import.meta.env.VITE_API_URL}/projects?populate=*`),
    fetch(`${import.meta.env.VITE_API_URL}/posts?populate=*`),
  ]);

  // const res = await fetch(`${import.meta.env.VITE_API_URL}/projects`);
  // if(!res.ok) throw new Response("Something went wrong trying to fetch data");

  if (!projectsRes.ok || !postsRes.ok)
    throw new Error("Something went wrong trying to fetch the data");

  const [projectsJson, postsJson] = await Promise.all([
    projectsRes.json(),
    postsRes.json(),
  ]);

  const projects: Array<Project> = projectsJson.data.map(
    (item: StrapiProject) => ({
      id: item.id,
      documentId: item.documentId,
      title: item.title,
      description: item.description,
      image: item.image?.url ? `${item.image.url}` : "/images/no-image.png",
      url: item.url,
      date: item.date,
      category: item.category,
      featured: item.featured,
    })
  );

  const posts: Array<PostMeta> = postsJson.data.map((item: StrapiPost) => ({
    id: item.id,
    documentId: item.documentId,
    title: item.title,
    slug: item.slug,
    excerpt: item.excerpt,
    date: item.date,
    body: item.body,
    image: item.image ? `${item.image?.url}` : "/images/no-image.png",
  }));

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
      <LatestPosts posts={posts} />
    </>
  );
};

export default HomePage;

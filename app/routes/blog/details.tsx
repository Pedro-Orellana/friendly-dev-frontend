import ReactMarkDown from "react-markdown";
import type { Route } from "./+types/details";
import type { PostMeta } from "~/types";
import { Link } from "react-router";

export async function loader({
  request,
  params,
}: Route.LoaderArgs): Promise<{ postMeta: PostMeta; markdown: string }> {
  const { slug } = params;

  //getting url to fetch from
  const url = new URL("/posts-meta.json", request.url);
  //fetching all data from this resource
  const res = await fetch(url);
  if (!res.ok) throw new Error("There was an error trying to fetch the data");

  const allData: Array<PostMeta> = await res.json();

  //getting the PostMeta for this post
  const postMeta = allData.find((meta) => meta.slug === slug) as PostMeta;

  //throw response in case the postMeta is not found
  if (!postMeta) throw new Response("Not found", { status: 404 });

  //getting the markdown for this specific post
  const markdown = await import(`../../posts/${slug}.md?raw`);

  return {
    postMeta,
    markdown: markdown.default,
  };
}

const BlogPostDetailsPage = ({ loaderData }: Route.ComponentProps) => {
  const { postMeta, markdown } = loaderData;

  return (
    <div className="max-w-3xl bg-gray-900 mx-auto px-8 py-10 mt-10">
      <h1 className="text-2xl text-blue-400">{postMeta.title}</h1>
      <p className="text-gray-400 text-sm mb-10">
        {new Date(postMeta.date).toDateString()}
      </p>

      <div className="prose prose-invert max-w-none mb-12">
        <ReactMarkDown>{markdown}</ReactMarkDown>
      </div>

      <Link
        className="bg-blue-500 px-5 py-3 rounded-lg hover:bg-blue-600 transition"
        to={"/blog"}
      >
        Back to Posts
      </Link>
    </div>
  );
};

export default BlogPostDetailsPage;

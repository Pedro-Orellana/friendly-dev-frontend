import ReactMarkDown from "react-markdown";
import type { Route } from "./+types/details";
import type { PostMeta, StrapiResponse, StrapiPost } from "~/types";
import { Link } from "react-router";

export async function loader({
  request,
  params,
}: Route.LoaderArgs): Promise<{ postMeta: PostMeta }> {
  const { slug } = params;

  //fetching all data from this resource
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/posts?filters[slug][$eq]=${slug}&populate=*`
  );
  if (!res.ok) throw new Error("There was an error trying to fetch the data");

  const json: StrapiResponse<StrapiPost> = await res.json();

  //getting the PostMeta for this post
  const post = await json.data[0];

  const postMeta = {
    id: post.id,
    documentId: post.documentId,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    body: post.body,
    date: post.date,
    image: post.image
      ? `${import.meta.env.VITE_STRAPI_URL}${post.image?.url}`
      : "/images/no-image.png",
  };

  //throw response in case the postMeta is not found
  if (!postMeta) throw new Response("Not found", { status: 404 });

  return {
    postMeta,
  };
}

const BlogPostDetailsPage = ({ loaderData }: Route.ComponentProps) => {
  const { postMeta } = loaderData;

  return (
    <div className="max-w-3xl bg-gray-900 mx-auto px-8 py-10 mt-10">
      <h1 className="text-2xl text-blue-400">{postMeta.title}</h1>
      <p className="text-gray-400 text-sm mb-10">
        {new Date(postMeta.date).toDateString()}
      </p>

      <img
        src={postMeta.image}
        alt={postMeta.slug}
        className="w-full h-64 rounded object-cover mb-8"
      />

      <div className="prose prose-invert max-w-none mb-12">
        <ReactMarkDown>{postMeta.body}</ReactMarkDown>
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

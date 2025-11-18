import type { Route } from "./+types";
import type { PostMeta, StrapiPost, StrapiResponse } from "~/types";
import { useState } from "react";

//components
import PostCard from "~/components/PostCard";
import Pagination from "~/components/Pagination";
import PostFilter from "~/components/PostFilter";

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ posts: Array<PostMeta> }> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/posts?populate=*`);

  if (!res.ok) throw new Error("There was an error trying to fetch the data");

  const json: StrapiResponse<StrapiPost> = await res.json();

  const data: Array<PostMeta> = json.data.map((item) => ({
    id: item.id,
    documentId: item.documentId,
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    date: item.date,
    image: item.image?.url ? `${item.image.url}` : "/images/no-image.png",
  }));

  //sort data by date
  data.sort((a: PostMeta, b: PostMeta) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return { posts: data };
}

const BlogPage = ({ loaderData }: Route.ComponentProps) => {
  const { posts } = loaderData;

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery) ||
      post.excerpt.toLowerCase().includes(searchQuery)
  );

  const postsPerPage = 10;
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;

  const currentPosts = filteredPosts.slice(indexOfFirst, indexOfLast);

  return (
    <div className="max-w-3xl bg-gray-900 mx-auto px-8 py-5">
      <h2 className="text-3xl text-white text-bold mb-8">Blog</h2>

      <PostFilter query={searchQuery} setQuery={setSearchQuery} />

      {currentPosts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
      {totalPages > 0 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default BlogPage;

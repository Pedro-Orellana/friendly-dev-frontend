import type { PostMeta } from "~/types";
import { Link } from "react-router";

const PostCard = ({ post }: { post: PostMeta }) => {
  return (
    <article className="bg-gray-800 px-5 py-6 mb-5">
      <h3 className="text-blue-400 text-xl">{post.title}</h3>
      <p className="text-sm text-gray-400">
        {new Date(post.date).toDateString()}
      </p>

      <p className="text-white mt-4 mb-6">{post.excerpt}</p>

      <Link
        to={`/blog/${post.slug}`}
        className="text-blue-300 hover:text-blue-400 transition"
      >
        Read more
      </Link>
    </article>
  );
};

export default PostCard;

import type { PostMeta } from "~/types";
import { Link } from "react-router";

type PostHomeCardProps = {
  post: PostMeta;
};

const PostHomeCard = ({ post }: PostHomeCardProps) => {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="py-5 px-3 bg-gray-800 rounded-xl hover:shadow-xl hover:scale-103 hover:cursor-pointer transition duration-150"
    >
      <h3 className="text-lg text-blue-500">{post.title}</h3>
      <p className="text-white text-sm">{post.excerpt}</p>
      <p className="text-xs text-gray-400 mt-2">
        {new Date(post.date).toDateString()}
      </p>
    </Link>
  );
};

export default PostHomeCard;

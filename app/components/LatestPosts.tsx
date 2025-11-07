import type { PostMeta } from "~/types";

//components
import PostHomeCard from "./PostHomeCard";

type LatestPostsProps = {
  posts: Array<PostMeta>;
};

const LatestPosts = ({ posts }: LatestPostsProps) => {
  return (
    <div className="py-10 px-5 text-center md:text-left">
      <h3 className="text-xl text-white mb-4">Latest Posts</h3>
      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        {posts.map((post) => (
          <PostHomeCard post={post} />
        ))}
      </div>
    </div>
  );
};

export default LatestPosts;

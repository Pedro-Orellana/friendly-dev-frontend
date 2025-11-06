type PostFilterProps = {
  query: string;
  setQuery: (query: string) => void;
};

const PostFilter = ({ query, setQuery }: PostFilterProps) => {
  return (
    <div>
      <input
        value={query}
        placeholder="search posts..."
        className="w-full px-3 py-3 rounded-xl mb-8 bg-gray-800"
        onChange={(e) => {
          const newQuery = e.target.value.toLowerCase();
          setQuery(newQuery);
        }}
      />
    </div>
  );
};

export default PostFilter;

import { Link } from "react-router";
const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[70vh] space-y-4">
      <h1 className="text-6xl text-blue-400 font-bold">404</h1>
      <h2 className="text-2xl text-white font-bold">Page not found</h2>
      <p>Sorry, the page you're looking for does not exist</p>
      <Link
        className="bg-blue-600 px-5 py-3 rounded-md hover:bg-blue-700 transition"
        to={"/"}
      >
        Go back home
      </Link>
    </div>
  );
};

export default NotFoundPage;

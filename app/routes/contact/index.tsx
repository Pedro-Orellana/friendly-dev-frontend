import type { Route } from "./+types";

const ContactPage = ({ actionData }: Route.ComponentProps) => {
  return (
    <form
      method="post"
      action="https://formspree.io/f/mzzobozl"
      className="bg-gray-900 max-w-3xl mt-12 py-8 px-6 mx-auto"
    >
      <h2 className="text-3xl font-bold mb-10 text-white text-center">
        Contact Me
      </h2>

      {/* inputs */}
      <div className="mb-8">
        <label htmlFor="name" className="text-sm block">
          Full name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full bg-gray-700 px-2 py-2 rounded-lg"
        />
      </div>

      <div className="mb-8">
        <label htmlFor="email" className="text-sm block">
          Email
        </label>
        <input
          type="text"
          id="email"
          name="email"
          className="w-full bg-gray-700 px-2 py-2 rounded-lg"
        />
      </div>

      <div className="mb-8">
        <label htmlFor="subject" className="text-sm block">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          className="w-full bg-gray-700 px-2 py-2 rounded-lg"
        />
      </div>

      <div className="mb-8">
        <label htmlFor="message" className="text-sm block">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          className="w-full bg-gray-700 px-2 py-2 rounded-lg"
        />
      </div>

      <button className="bg-blue-600 text-white w-full rounded-lg py-3">
        Send Message
      </button>
    </form>
  );
};

export default ContactPage;

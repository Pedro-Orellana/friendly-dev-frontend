import type { Route } from "./+types";
import { Form } from "react-router";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const fullName = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  //now that we have the data obtained from the from, we can do anything we want from here
  //e.g. update a database, make an http call, etc. and we can return whatever we need to return

  const errors: Record<string, string> = {};

  if (!fullName) errors.name = "Name field is required";
  if (!email) errors.email = "Email field is required";
  if (!subject) errors.subject = "Subject field is required";
  if (!message) errors.message = "Message field is required";

  if (Object.keys(errors).length > 0) {
    //this means that there is at least one error, and we have to return the errors
    return { errors };
  }

  const data = {
    fullName,
    email,
    subject,
    message,
  };

  return {
    message: "Form submitted successfully!",
    data,
  };
}

const ContactPage = ({ actionData }: Route.ComponentProps) => {
  const errors = actionData?.errors || {};

  return (
    <Form
      method="post"
      className="bg-gray-900 max-w-3xl mt-12 py-8 px-6 mx-auto"
    >
      <h2 className="text-3xl font-bold mb-10 text-white text-center">
        Contact Me
      </h2>

      {actionData?.message ? (
        <p className="text-green-100 text-center rounded-lg bg-green-600 border-2 border-green-800 py-5 mb-10">
          {actionData.message}
        </p>
      ) : null}

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
        {errors.name ? (
          <p className="text-red-500 text-sm">{errors.name}</p>
        ) : null}
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
        {errors.email ? (
          <p className="text-red-500 text-sm">{errors.email}</p>
        ) : null}
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
        {errors.subject ? (
          <p className="text-red-500 text-sm">{errors.subject}</p>
        ) : null}
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
        {errors.message ? (
          <p className="text-red-500 text-sm">{errors.message}</p>
        ) : null}
      </div>

      <button className="bg-blue-600 text-white w-full rounded-lg py-3">
        Send Message
      </button>
    </Form>
  );
};

export default ContactPage;

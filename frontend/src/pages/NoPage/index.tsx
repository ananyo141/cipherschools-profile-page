import { Link } from "react-router-dom";

import svg404 from "../../assets/404.svg";

type Props = {};

const NoPage = (props: Props) => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center ">
      <img
        src={svg404}
        alt="404"
        className="md:1/3 w-1/2 text-blue-600 lg:w-1/4"
      />
      <div className="flex flex-col items-center justify-center">
        <p className="mt-12 text-3xl text-gray-800 md:text-4xl lg:text-5xl">
          Page Not Found
        </p>
        <p className="mt-8 text-gray-600 md:text-lg lg:text-xl">
          Sorry, the page you are looking for could not be found.
        </p>
        <a
          href="#"
          className="mt-12 flex items-center space-x-2 rounded bg-blue-600 px-4 py-2 text-gray-100 transition duration-150 hover:bg-blue-700"
          title="Return Home"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          <Link to="/">
            <span>Return Home</span>
          </Link>
        </a>
      </div>
    </div>
  );
};

export default NoPage;

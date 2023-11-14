import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="fixed bottom-0 left-0 z-10 w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-2 dark:bg-gray-800 dark:border-gray-600">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        Copyright &copy; 2023 by {" "}
          <a href="http://localhost:5173/" className="hover:underline">
            Dynamic Island™
          </a>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <Link to="/about" className="mr-4 hover:underline md:mr-6">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:underlin mr-10">
              Contact
            </Link>
          </li>
        </ul>
      </footer>
    </>
  );
};

export default Footer;

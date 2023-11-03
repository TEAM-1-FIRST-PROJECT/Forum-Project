import { Link } from "react-router-dom";
import Categories from "../../views/Categories/Categories";
import AppleLogo from "../../assets/apple.png";

const Navbar = () => {
  return (
    <div>
      <nav className="p-2.5 bg-gray-800 shadow md:flex md:items-center md:justify-between">
        <div className="flex justify-between font-semibold items-center ">
          <Link to="/">
            <img src={AppleLogo} className="h-10 cursor-pointer mr-3" />
          </Link>
          <Link
            to="/"
            className="text-white font-semibold cursor-pointer text-2xl"
          >
            Dynamic Island
          </Link>
        </div>
        <div className="">
          <input
            className="w-[400px] bg-gray-300 relative p-1 rounded-full border-none"
            type="search"
          />
        </div>
        <ul className="md:flex md:items-center z-[-1] md:z-auto md:static absolute font-semibold w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-500">
          <Link
            to="/home"
            className="text-xl text-white hover:text-teal-500 duration-500 mx-4 my-6 md:my-0"
          >
            Home
          </Link>

          <Link
            to="/"
            className="text-xl text-white hover:text-teal-500 duration-500 mx-4 my-6 md:my-0"
          >
            < Categories />
          </Link>

          <Link
            to="#"
            className="text-xl text-white hover:text-teal-500 duration-500 mx-4 my-6 md:my-0"
          >
            Editor&rsquo;s choice
          </Link>

          <Link
            to="/About"
            className="text-xl text-white hover:text-teal-500 duration-500 mx-4 my-6 md:my-0"
          >
            About
          </Link>
          <Link to="/Login">
            <button className="bg-teal-500 hover:bg-teal-600 text-white font-semibold duration-500 px-6 py-2 mx-4 rounded-lg">
              Login
            </button>
          </Link>
          <Link to="/Signup">
            <button className="bg-teal-500 hover:bg-teal-600 text-white font-semibold duration-500 px-6 py-2 mx-4 rounded-lg">
              Sign up
            </button>
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;

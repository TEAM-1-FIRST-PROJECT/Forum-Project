import { Link } from "react-router-dom";
const Navbar = () => {

  return (
    <div>
      <nav className="p-2.5 bg-gray-800 shadow md:flex md:items-center md:justify-between">
        <div className="flex justify-between font-semibold items-center ">
          <img
            className="h-10 inline text-2xl font-semibold cursor-pointer"
            src=""
          />
          <Link className="font-semibold cursor-pointer text-2xl" to="/">
            Dynamic Island
          </Link>
        </div>
        <div className="text-xl bg-gray-400">
          <input type="search" />
        </div>
        <ul className="md:flex md:items-center z-[-1] md:z-auto md:static absolute font-semibold w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-500">
          <Link
            to="/"
            className="text-xl hover:text-teal-500 duration-500 mx-4 my-6 md:my-0"
          >
            HOME
          </Link>

          <Link
            to=""
            className="text-xl hover:text-teal-500 duration-500 mx-4 my-6 md:my-0"
          >
            CATEGORIES
          </Link>

          <Link
            to="#"
            className="text-xl hover:text-teal-500 duration-500 mx-4 my-6 md:my-0"
          >
            SOMETHING
          </Link>

          <Link
            to="/About"
            className="text-xl hover:text-teal-500 duration-500 mx-4 my-6 md:my-0"
          >
            ABOUT
          </Link>

          <button className="bg-teal-500 hover:bg-teal-600 text-white font-semibold duration-500 px-6 py-2 mx-4 rounded-lg">
            <Link to="/Login">Login</Link>
          </button>

          <button className="bg-teal-500 hover:bg-teal-600 text-white font-semibold duration-500 px-6 py-2 mx-4 rounded-lg">
            <Link to="/Signup">Sign up</Link>
          </button>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
<button className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg">
  SIGN UP
</button>;

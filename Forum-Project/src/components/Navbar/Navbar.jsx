import { Link } from "react-router-dom";
import Categories from "../../views/Categories/Categories";
import ProfileSettings from "../ProfileSetings/ProfileSetings";
import AppleLogo from "../../assets/apple.png";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";


const Navbar = () => {

  const { user } = useContext(AuthContext);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav
            className={`absolute right-0 w-full bg-white rounded-lg shadow-xl overflow-hidden lg:static lg:bg-transparent lg:overflow-visible lg:w-auto ${
              isOpen ? "block" : "hidden"
            } lg:flex`}
          >
            <Link
              to="/"
              className="block px-4 py-7 text-gray-800 hover:bg-indigo-500 hover:text-white"
            >
              Home
            </Link>
            {user !== null && <Link
              to="/"
              className="block px-4 py-2  text-gray-800 hover:bg-indigo-500 hover:text-white"
            
          >
            < Categories />
          </Link>}
          {user !== null && <Link
            to="/EditorsChoice"
            className="block px-4 py-5 items-center text-center text-gray-800 hover:bg-indigo-500 hover:text-white"
          >
            Editor&rsquo;s choice
          </Link>}
          {user === null && <Link to="/Login">
            <button className="block px-4 py-7 text-gray-800 hover:bg-indigo-500 hover:text-white">
              Login
            </button>
          </Link>}
          {user === null && <Link to="/Signup">
            <button className="block px-4 py-7 text-center text-gray-800 hover:bg-indigo-500 hover:text-white">
              Sign up
            </button>
          </Link>}
          {user !== null && <Link
            to="/"
            className="block px-4 py-2 text-center text-gray-800 hover:bg-indigo-500 hover:text-white"
          ><ProfileSettings />
          </Link>}
          </nav>
    </>
  );
};

export default Navbar;

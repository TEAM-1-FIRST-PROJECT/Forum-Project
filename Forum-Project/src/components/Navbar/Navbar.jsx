import { Link } from "react-router-dom";
import { useEffect, useState } from "react"; // Import useState hook
import logo from "../../assets/apple.png";
import Categories from "../../views/Categories/Categories";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { logoutUser } from "../../services/auth.services";
import { getDownloadURL } from "firebase/storage";
import { listImg } from "../../services/uploadToStorage.services";

const Navbar = () => {
  const { setUser, user, userData } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for tracking menu visibility
  const [isOpen, setIsOpen] = useState(false); // State for tracking menu visibility
  const [imageUrls, setImageUrls] = useState([]);

  const userName = userData?.firstName;
  const userEmail = userData?.email;

  const onLogout = () => {
    logoutUser().then(() => {
      setUser({
        user: null,
      });
    });
  };

  useEffect(() => {
    listImg().then((response) => {
      if (response.length === 0) {
        return;
      }
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, [isOpen]);

  return (
    <nav className=" bg-white h-20 rounded-2xl">
      <div className=" flex flex-wrap justify-between mx-auto p-1">
        <Link
          to="/"
          className="flex items-center space-x-3 "
        >
          <img src={logo} className="h-8 ml-5" alt="Dynamic Island logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-black">
            Dynamic Island
          </span>
        </Link>
        <div className="flex mr-5 items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {user !== null && (
            <div className="">
              <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded={isMenuOpen}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Link className="sr-only"></Link>
                <img className="w-9 h-9 rounded-full" src={imageUrls} />
              </button>
              {isMenuOpen && (
                <div
                  className="absolute z-50 right-0 mt-2 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                  id="user-dropdown"
                >
                  <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900 dark:text-white">
                      {userName}
                    </span>
                    <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                      {userEmail}
                    </span>
                  </div>
                  <ul className="py-2" aria-labelledby="user-menu-button">
                    <li>
                      <Link
                        to="/newPost"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        New Post
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Setting
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/"
                        onClick={onLogout}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Sign out
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        <div
          className={` justify-between  md:flex md:w-auto md:order-1 ${
            isOpen ? "block" : "hidden"
          } md:block`}
          id="navbar-user"
        >
          <ul className="flex flex-col items-center  font-medium p-4 md:p-0 mt-4 border border-gray-100  bg-gray-50 md:space-x-10 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {userData && userData.isAdmin === true && (
              <li>
                <Link
                  to="/admin"
                  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                  aria-current="page"
                >
                  Admin Dashboard
                </Link>
              </li>
            )}
            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-black rounded md:bg-transparent md:text-black md:p-0  md:dark:text-blue-500 hover:text-blue-400"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            {user !== null && (
              <li className="blocktext-black rounded md:bg-transparent md:text-black md:p-0  md:dark:text-blue-500 hover:text-blue-400">
                <Categories />
              </li>
            )}
            {user !== null && (
              <li>
                <Link
                  to="/EditorsChoice"
                  className="block py-2 px-3 text-black rounded md:bg-transparent md:text-black md:p-0  md:dark:text-blue-500 hover:text-blue-400"
                >
                  Editors&apos; Choice
                </Link>
              </li>
            )}
            {user === null && (
              <li>
                <Link
                  to="/Login"
                  className="block py-2 px-3 text-black rounded md:bg-transparent md:text-black md:p-0  md:dark:text-blue-500 hover:text-blue-400"
                >
                  Login
                </Link>
              </li>
            )}
            {user === null && (
              <li>
                <Link
                  to="/SignUp"
                  className="block py-2 px-3 text-black rounded md:bg-transparent md:text-black md:p-0  md:dark:text-blue-500 hover:text-blue-400"
                >
                  SignUp
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

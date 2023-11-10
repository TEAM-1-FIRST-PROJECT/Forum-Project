import BgImg from "../../assets/background.jpg";
import { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import Categories from "../../views/Categories/Categories";
import ProfileSettings from "../ProfileSetings/ProfileSetings";
import { toast } from "react-toastify";

import { getPostByTitle } from "../../services/posts.service";
function Header() {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState([]);

  const node = useRef();

  const handleSearchChange = (event) => {
    event.stopPropagation();
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchTerm === "") {
      toast.warning("Please enter a username, email, or first name");
      return;
    }

    getPostByTitle(searchTerm)
      .then((posts) => {
    
        const postsArray = Array.isArray(posts) ? posts : [posts];

        setPosts(postsArray);
      })
      .catch((error) => {
        toast.error("Error fetching posts:", error);
      });
  };

  const handleClickOutside = (e) => {
    if (node.current.contains(e.target)) {
      return;
    }
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative h-[400px] lg:h-[450px]" ref={node}>
      <img
        src={BgImg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <header className="relative max-h-[200px] flex items-center justify-between px-4 bg-opacity-80 bg-white bottom-0 inset-x-0 mx-auto max-w-screen-md w-full">
        <div>
          <h1 className="text-2xl font-bold">
            <Link to="/">Dynamic Island</Link>
          </h1>
        </div>
        <button onClick={toggleMenu} className="hamburger lg:hidden ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6 text-gray-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        <nav
          className={`absolute right-0  bg-white rounded-lg overflow-hidden lg:static lg:bg-transparent lg:overflow-visible lg:w-auto ${
            isOpen ? "block" : "hidden"
          } lg:flex`}
        >
          <Link
            to="/"
            className="block px-4 py-7 text-gray-800 hover:bg-indigo-500 hover:text-white"
          >
            Home
          </Link>
          {user !== null && (
            <Link
              to="/"
              className="block px-4 py-2  text-gray-800 hover:bg-indigo-500 hover:text-white"
            >
              <Categories />
            </Link>
          )}
          {user !== null && (
            <Link
              to="/EditorsChoice"
              className="block px-4 py-5 items-center text-center text-gray-800 hover:bg-indigo-500 hover:text-white"
            >
              Editor&rsquo;s choice
            </Link>
          )}
          {user === null && (
            <Link to="/Login">
              <button className="block px-4 py-7 text-gray-800 hover:bg-indigo-500 hover:text-white">
                Login
              </button>
            </Link>
          )}
          {user === null && (
            <Link to="/Signup">
              <button className="block px-4 py-7 text-center text-gray-800 hover:bg-indigo-500 hover:text-white">
                Sign up
              </button>
            </Link>
          )}
          {user !== null && (
            <Link
              to="/"
              className="block px-4 py-2 text-center text-gray-800 hover:bg-indigo-500 hover:text-white"
            >
              <ProfileSettings />
            </Link>
          )}
        </nav>
      </header>
      <div
        className={`absolute bottom-2 inset-x-0 flex justify-center items-center ${
          isOpen ? "block" : "hidden"
        } lg:flex`}
      >
        <div
          className={`absolute bottom-2 inset-x-0 flex justify-center items-center ${
            isOpen ? "block" : "hidden"
          } lg:flex`}
        >
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-1/3 p-2 rounded-l-2xl focus:outline-none focus:ring-0 z-30"
              placeholder="Search..."
            />
            {searchTerm && (
              <div className="absolute bg-white border border-gray-200 w-full rounded-md mt-2 z-10">
                {posts
                  .filter(
                    (post) =>
                      post.title &&
                      post.title
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                  )
                  .map((post) => (
                    <Link
                      to={"/search"}
                      state={{ post }}
                      key={post.id}
                      className="block p-2 hover:bg-gray-200 cursor-pointer"
                    >
                      {post.title}
                    </Link>
                  ))}
              </div>
            )}
            <button
              onClick={handleSearchSubmit}
              className="p-2 bg-blue-500 text-white rounded-r-2xl hover:bg-emerald-600 hover:animate-pulse"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;

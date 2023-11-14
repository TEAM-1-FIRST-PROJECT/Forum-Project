import BgImg from "../../assets/laptop.jpg";
import { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

import { toast } from "react-toastify";

import { getPostByTitle } from "../../services/posts.service";
import Navbar from "../Navbar/Navbar";

function Header() {
  const { user, userData } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState([]);

  const node = useRef();

  const handleSearchChange = (event) => {
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

  // const toggleMenu = () => {
  //   setIsOpen(!isOpen);
  // };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
  <>
 
    <div className="bg-fixed bg-hero-pattern bg-contain relative h-[400px] rounded-xl lg:h-[400px]">
      <img
        src={BgImg}
        alt=""
        className="absolute  h-full w-full object-cover"
      />
      <header className="relative ">
       
      <Navbar />
      
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
          {user !== null && userData && userData.isAdmin !== true && (
            <div className="relative z-10">
              <input
                ref={node}
                type="text"
                value={searchTerm}
             onChange={handleSearchChange}
                className="w-[300px] p-2 rounded-l-2xl focus:outline-none focus:ring-0 "
                placeholder="Search..."
              />
              {searchTerm && (
                <div className="absolute bg-white border border-gray-200 w-full rounded-md mt-2">
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
                        
                        onChange={() => setSearchTerm(post.title)}
                        className="block p-2 hover:bg-gray-200 cursor-pointer"
                      >
                        {post.title}
                      </Link>
                    ))}
                </div>
              )}
              <button
                type="submit"
                onClick={handleSearchSubmit}
                className="p-2 bg-blue-500 text-white rounded-r-2xl hover:bg-blue-600 hover:animate-pulse"
              >
                Search
              </button>
            </div>
          )}
        </div>
      </div>
      </div>
      </>
  );
}

export default Header;

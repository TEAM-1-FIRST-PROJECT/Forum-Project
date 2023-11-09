import BgImg from "../../assets/background.jpg";
import { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import Categories from "../../views/Categories/Categories";
import ProfileSettings from "../ProfileSetings/ProfileSetings";
import { toast } from "react-toastify";
import { searchUser } from "../../services/users.services";
import { getUsersLength } from "../../services/users.services";
import { getPostsLength } from "../../services/posts.service";

function Header() {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [usersLength, setUsersLength] = useState([]);
  const [postsLength, setPostsLength] = useState([]);
  const node = useRef();
  
  useEffect(() => {
    getUsersLength()
      .then(length => {
        setUsersLength(length);
      })
      .catch(error => {
        toast.error(error);
      });
  
    getPostsLength()
      .then(length => {
        setPostsLength(length);
      })
      .catch(error => {
        toast.error(error);
      });
  }); 


const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  
  };

const handleSearchSubmit = () => {
    if (searchTerm === "") {
      
toast.warning("Please enter a username, email or first name");
      setUsers([]); 
      return;
    }
    searchUser(searchTerm).then(setUsers);
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
    <>
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
          <button onClick={toggleMenu} className="lg:hidden ">
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
        </header>
        <div
          className={`absolute bottom-2 inset-x-0 flex justify-center items-center ${
            isOpen ? "block" : "hidden"
          } lg:flex`}
        >
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-1/3 p-2 rounded-l-2xl focus:outline-none focus:ring-0"
            placeholder="Search..."
          />
          <button
            onClick={handleSearchSubmit}
            className="p-2 bg-blue-500 text-white rounded-r-2xl hover:bg-emerald-600 hover:animate-pulse">
            Search
          </button>
        </div>

        <div className="mb-8">
  {users.length > 0 && (
    <>
      <h2 className="text-xl font-bold mb-2">Users</h2>
      {users.map((user) => (
        <div key={user.uid} className="border p-2 mb-2 mt-10">
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>First Name:</strong> {user.firstName}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      ))}
    </>
  )}
</div>
        <div
          className={`absolute bottom-2 inset-x-0 flex justify-center items-center ${
            isOpen ? "block" : "hidden"
          } lg:flex`}
        >
          <div className="flex flex-col items-center justify-center space-y-2"></div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-5 space-x-4">
        <div className="flex flex-col items-center bg-white shadow-xl shadow-indigo-300 p-5 rounded-md">
          <p className="text-lg font-extrabold text-red-600">{ usersLength }</p>
          <p className="font-sans font-bold text-lg">Registered Users</p>
        </div>
        <div className=" border-l border-gray-300 h-20 "></div>
        <div className="flex flex-col items-center bg-white shadow-xl shadow-indigo-300 p-5 rounded-md">
          <span className="text-lg font-extrabold text-red-600">{ postsLength }</span>
          <span className="font-sans font-bold text-lg">Total Posts</span>
        </div>
      </div>
    </>
  );
}
export default Header;

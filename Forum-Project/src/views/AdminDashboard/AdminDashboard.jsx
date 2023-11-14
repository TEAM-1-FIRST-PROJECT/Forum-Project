import { useEffect, useState } from "react";
import { getAllPosts } from "../../services/posts.service";
import {
  adminSearchUser,
  blockUser,
  deletePost,
  makeModerator,
} from "../../services/admin.services";
import UserAndCommentsCounter from "../../components/UserAndCommentsCounter/UserAndCommentsCounter";
import SortButton from "../../components/SortButton/Sortbutton";
import { getCommentCount } from "../../services/comments.services";


const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState({});
  const [moderators, setModerators] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [recentlyAddedPosts, setRecentlyAddedPosts] = useState([]);
  const [originalPosts, setOriginalPosts] = useState([]);


  useEffect(() => {
    getAllPosts().then(setPosts);
    adminSearchUser("").then(setUsers);
  }, [
    setPosts,
    setUsers,
  ]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);

    if (event.target.value.length > 0) {
      const filteredUsers = users.filter(user =>
      user.username &&  user.username.toLowerCase().includes(event.target.value.toLowerCase()) ||
       user.email && user.email.toLowerCase().includes(event.target.value.toLowerCase()) ||
       user.firstName && user.firstName.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setResults(filteredUsers);
    } else {
      setResults([]);
    }
  };


  const handleBlockUser = (username, blockStatus) => {

    setBlockedUsers({
      ...blockedUsers,
      [username]: blockStatus,
    });

    blockUser(username, blockStatus).then(() => {
      setUsers(
        users.map((user) =>
          user.username === username
            ? { ...user, isBlocked: blockStatus }
            : user
        )
      );
    });
  };

  const handleMakeModerator = (username, moderatorStatus) => {

    setModerators({
      ...moderators,
      [username]: moderatorStatus,
    });

    makeModerator(username, moderatorStatus).then(() => {
      setUsers(
        users.map((user) =>
          user.username === username
            ? { ...user, isModerator: moderatorStatus }
            : user
        )
      );
    });
  };


  const handleUserClick = (username) => {
    const user = users.find(user => user.username === username);
    setSelectedUser(user);
  };


  const handleDeletePost = (postId) => {
    deletePost(postId).then(() => {
      setPosts(posts.filter((post) => post.id !== postId));
    });
  };

  useEffect(() => {
    getAllPosts()
      .then((fetchedPosts) => {
        setRecentlyAddedPosts(fetchedPosts);
        setOriginalPosts(fetchedPosts);
      })
      .catch((error) => {
        console.error('Error fetching recently added posts:', error);
      });
  }, []);

  const sortPosts = () => {
    const sortedPostsByDate = [...recentlyAddedPosts].sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn));
    setRecentlyAddedPosts(sortedPostsByDate);
  };
  
  const sortPostsByComments = () => {
    Promise.all(
      recentlyAddedPosts.map((post) =>
        getCommentCount(post.id).then((commentCount) => ({ ...post, commentCount }))
      )
    ).then((sortedPostsByComments) => {
      const sortedPostsByCommentsOnly = [...sortedPostsByComments].sort(
        (a, b) => b.commentCount - a.commentCount
      );
      setRecentlyAddedPosts(sortedPostsByCommentsOnly);
    });
  };
  
  
  ///*bg-fixed bg-hero-pattern bg-contain
  return (
    <div className="bg-fixed bg-hero-pattern bg-contain">
        <UserAndCommentsCounter/>
      <div className="pb-20">
      <SortButton onSort={sortPosts} onSortByComments={sortPostsByComments} />
      
      </div>
      <form>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative z-10">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 hover:shadow-violet-200 shadow-xl opacity-90 focus:outline-none "
            placeholder="Search by username, email or first name"
            autoComplete="off"
            value={searchTerm}
            onChange={handleSearchChange}
            required
          />
          {results.length > 0 && (
            <div className="absolute w-full mt-2 bg-white rounded-md shadow-lg">
              {results.map((user, index) => (
                <div key={index} className="border-b border-gray-200 p-2 cursor-pointer" onClick={() => handleUserClick(user.username)}>
                  {user.username}
                </div>
              ))}
            </div>
          )}
        </div>
      </form>
      {selectedUser ? (
        <div className="flex flex-col items-start justify-between mx-auto p-5 border-gray-300">
          <div className="bg-gray-300 m-4 opacity-95 rounded-xl p-6 hover:shadow-zinc-100">
            <div className="grid text-lg">
              <div className="bg-gray-100 p-6 rounded-md">
                <h2 className="text-2xl font-bold mb-5">User</h2>
                <p className="mb-2">
                  <span className="font-bold">Username:</span> {selectedUser.username}
                </p>
                <p className="mb-2">
                  <span className="font-bold">First Name:</span> {selectedUser.firstName}
                </p>
                <p className="mb-2">
                  <span className="font-bold">Email:</span> {selectedUser.email}
                </p>
                <button
                  className={`mt-2 px-4 py-2 rounded text-white ${blockedUsers[selectedUser.username] ? ("bg-green-500") : ("bg-red-500")
                    } hover:shadow-lg active:bg-green-400`}
                  onClick={() =>
                    handleBlockUser(selectedUser.username, !blockedUsers[selectedUser.username])
                  }
                >
                  {blockedUsers[selectedUser.username] ? "Unblock" : "Block"}
                </button>
                <button
                  className={`mt-2 ml-2 px-4 py-2 rounded text-white ${moderators[selectedUser.username] ? ("bg-red-500") : ("bg-green-500")
                    } hover:shadow-lg active:bg-green-400`}
                  onClick={() =>
                    handleMakeModerator(selectedUser.username, !moderators[selectedUser.username])
                  }
                >
                  {moderators[selectedUser.username] ? "Remove Moderator" : "Add Moderator"}
                </button>
              </div>
              <div className="overflow-scroll h-10 pb-80">
                <h2 className="text-xl font-bold mb-2">Posts</h2>
                {posts
                  .filter((post) => post.author === selectedUser.username)
                  .map((post) => (
                    <div key={post.id} className="bg-white rounded-lg shadow-md m-4">
                      <div className="p-6">
                        <h2 className="text-xl font-bold mb-2 text-indigo-800">
                          <span className="mr-1">{post.title}</span>
                        </h2>
                        <p className="text-gray-700">
                          <span className="font-bold mr-1">By {post.author}</span>
                        </p>
                        <p className="mt-2 bg-indigo-100 text-indigo-800 p-2 rounded">
                          <span className="font-bold mr-1">{post.content}</span>
                        </p>
                        <button
                          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                          onClick={() => handleDeletePost(post.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-4">
          {posts.map((post, index) => (
            <div key={index} className="p-4 bg-white rounded-md shadow-lg hover:shadow-violet-300 mb-4">
              <h2 className="text-xl font-bold mb-2">{post.title}</h2>
              <h2 className="text-xl font-bold mb-2">By {post.author}</h2>
              <p>{post.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

import { useEffect, useState } from "react";
import { getAllPosts } from "../../services/posts.service";
import { adminSearchUser, blockUser, deletePost } from "../../services/admin.services";
import { toast } from "react-toastify";


const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // const blockedUser = () => users.map(user => user.isBlocked === true ? logoutUser() : null);
 
 
  useEffect(() => {
    getAllPosts().then(setPosts);
    adminSearchUser("").then(setUsers); 
  }, []);


  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  
  };

  const handleSearchSubmit = () => {
    if (searchTerm === "") {
      toast.warning("Please enter a username, email or first name");
      return;
    }
    adminSearchUser(searchTerm).then(setUsers);
  };

  const handleBlockUser = (username, blockStatus) => {
    blockUser(username, blockStatus).then(() => {
      setUsers(
        users.map((user) =>
          user.username === username ? { ...user, isBlocked: blockStatus } : user
        )
      );
    });
  };

  const handleDeletePost = (postId) => {
    deletePost(postId).then(() => {
      setPosts(posts.filter((post) => post.id !== postId));
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search users..."
          className="border p-2 mr-2"
        />
       <button
          onClick={handleSearchSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Search
        </button>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Users</h2>
        {users.map((user) => (
          <div key={user.uid} className="border p-2 mb-2">
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>First Name:</strong> {user.firstName}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <button
              className={`mt-2 px-4 py-2 ${
                user.isBlocked ? "bg-green-500" : "bg-red-500" 
              } text-white rounded`}
              onClick={() => handleBlockUser(user.username, !user.isBlocked)}
            >
              {user.isBlocked ? "Unblock" : "Block"}
            </button>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2">Posts</h2>
        {posts.map((post) => (
          <div key={post.id} className="border p-2 mb-2">
            <p>
              <strong>Title:</strong> {post.title}
            </p>
            <p>
              <strong>Author:</strong> {post.author}
            </p>
            <p>
              <strong>Content:</strong> {post.content}
            </p>
            <button
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
              onClick={() => handleDeletePost(post.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;

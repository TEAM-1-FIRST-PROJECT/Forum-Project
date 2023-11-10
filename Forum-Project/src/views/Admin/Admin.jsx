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
    <div className="mb-10">
    <h2 className="text-2xl font-bold mb-5">Users</h2>
    {users.map((user) => (
      <div key={user.uid} className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 border bg-yellow-100 border-green-600 rounded-3xl p-10 pt-20 sm:mt-10 sm:pt-10 lg:mx-0 lg:max-w-none lg:grid-cols-1">
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
        <div>
          <h2 className="text-xl font-bold mb-2">Posts by {user.username}</h2>
          {posts
            .filter((post) => post.author === user.username)
            .map((post) => (
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
    ))}
  </div>
  
  );
};

export default AdminDashboard;

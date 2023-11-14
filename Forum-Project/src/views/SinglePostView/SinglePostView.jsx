import Login from "../Login/Login";
import SinglePost from "../SinglePost/SinglePost";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import { getAllPosts } from "../../services/posts.service";


const SinglePostView = () => {
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const allPosts = await getAllPosts();
      const recentPost = allPosts[0];
      setPost(recentPost);
    };
  
    fetchPosts();
  }, []);

  return (
    <>
      {user ? (
        <div className="text-gray-600 pl-10 pt-10" >
          {post && <SinglePost value={post}></SinglePost>}
        </div >
      ) : (
        <Login></Login>
      )}</>
  )
}

export default SinglePostView


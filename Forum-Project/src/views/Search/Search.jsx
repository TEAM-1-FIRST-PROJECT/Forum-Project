import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { toast } from "react-toastify";
import { deletePost } from "../../services/posts.service";
import {
  FaTrash,
  FaRegThumbsUp,
  FaRegCommentDots,
  FaInfoCircle,
} from "react-icons/fa";

const Search = () => {
  const { state } = useLocation();
  const { post } = state || {};
  const navigate = useNavigate();
  const { userData } = useContext(AuthContext);

  const postId = post.id;
  console.log(post);
  const postAuthor = post.author;
console.log(post);
  const deletePostHandler = () => {
    if (postAuthor === userData.username) {
      deletePost(postId)
        .then(() => {
          navigate("/home");
          toast("You post deleted permanently!");
        })
        .catch((error) => toast.error(error));
    } else {
      toast("Only author can delete the post!");
    }
  };

  const myDate = new Date(post.createdOn);
  const options = {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };
  const formattedDate = myDate.toLocaleString("bg-BG", options);

  return (
    <article
      key={postId}
      className="flex flex-col items-start justify-between mx-auto my-4 p-4 border border-gray-200 shadow-lg md:max-w-xl"
    >
      <div className="flex items-center gap-x-4 text-xs justify-between">
        <div className="flex items-center gap-x-4">
          <time dateTime={formattedDate} className="text-gray-500">
            {formattedDate}
          </time>
          <div className="flex flex-wrap">
            <p
              key={post.id}
              className="m-1 px-2 py-1 bg-gray-200 rounded-full text-xs"
            >
              {post.tags}
            </p>
          </div>
        </div>
      </div>
      <h2 className="text-3xl font-bold">Author: {postAuthor}</h2>
      <div className="group relative">
        <h3 className="mt-3 text-2xl font-semibold leading-6 text-gray-900 hover:text-violet-400">
          <a>
            <span className="absolute inset-0 " />
            Post Title: {post.title}
          </a>
        </h3>
        <p className="mt-5 line-clamp-3 text-lg leading-6 text-gray-600">
          Post Description: {post.description}
        </p>
        <p className="mt-5 line-clamp-3 text-lg leading-6 text-gray-600">
          Post Content: {post.content}
        </p>
      </div>
      <div className="flex items-center gap-x-4 text-xs mt-4">
        <button
          className="rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
          onClick={() => {}}
        >
          <FaRegThumbsUp /> {"98"}
        </button>

        <Link
          to={`/NewComment/${postId}`}
          className="rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
        >
          <FaRegCommentDots /> Reply
        </Link>
        <Link
          to={`/post/${postId}`}
          className="rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
        >
          <FaRegCommentDots /> See all comments
        </Link>
        <Link
          to={`/post/${postId}`}
          className="rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
        >
          <FaInfoCircle /> Post Details
        </Link>
        <button
          className="rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
          onClick={deletePostHandler}
        >
          <FaTrash /> Delete Post
        </button>
      </div>
    </article>
  );
};

export default Search;

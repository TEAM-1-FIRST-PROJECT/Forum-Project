import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { toast } from "react-toastify";
import { deletePost, dislikePost, getLikesPerPost, likePost } from "../../services/posts.service";
import {
  FaTrash,
  FaRegThumbsUp,
  FaRegCommentDots,
  FaInfoCircle,
  FaReply,
} from "react-icons/fa";
import { getUserByHandle } from "../../services/users.services";
import { useEffect, useState } from "react";

const Search = () => {
  const { state } = useLocation();
  const { post } = state || {};
  const navigate = useNavigate();
  const { user, userData } = useContext(AuthContext);
  const [img, setImg] = useState('');
  const [commentCount, setCommentCount] = useState(0);
  const [likesCount, setLikesCount] = useState(0);

  const userName = userData ? userData.username : null;
  const isAuthor = post.author === userName;
  const permissionChecker = userData.isModerator || isAuthor;
  const userLike = userData ? userData.likedPosts : null;


  useEffect(() => {
    getUserByHandle(post.author)
      .then((snapshot) => {
        setImg(snapshot.val().profilePhoto)
      });
  }, [post.author]);

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

  const toggleLikePostHandler = () => {
    if (userData.likedPosts) {

      dislikePost(userName, postId)
        .then(() => {
          getLikesPerPost(postId)
            .then((result) => {
              setLikesCount(result)
            });

          userData.likedPosts = false;
        })
        .catch((error) => console.error(error));
    } else {

      likePost(userName, postId)
        .then(() => {
          getLikesPerPost(postId)
            .then((result) => {
              setLikesCount(result)
            });

          userData.likedPosts = true;
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    // <article
    //   key={postId}
    //   className="flex flex-col items-start justify-between mx-auto my-4 p-4 border border-gray-200 shadow-lg md:max-w-xl"
    // >
    //   <div className="flex items-center gap-x-4 text-xs justify-between">
    //     <div className="flex items-center gap-x-4">
    //       <time dateTime={formattedDate} className="text-gray-500">
    //         {formattedDate}
    //       </time>
    //       <div className="flex flex-wrap">
    //         <p
    //           key={post.id}
    //           className="m-1 px-2 py-1 bg-gray-200 rounded-full text-xs"
    //         >
    //           {post.tags}
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    //   <h2 className="text-3xl font-bold">Author: {postAuthor}</h2>
    //   <div className="group relative">
    //     <h3 className="mt-3 text-2xl font-semibold leading-6 text-gray-900 hover:text-violet-400">
    //       <a>
    //         <span className="absolute inset-0 " />
    //         Post Title: {post.title}
    //       </a>
    //     </h3>
    //     <p className="mt-5 line-clamp-3 text-lg leading-6 text-gray-600">
    //       Post Description: {post.description}
    //     </p>
    //     <p className="mt-5 line-clamp-3 text-lg leading-6 text-gray-600">
    //       Post Content: {post.content}
    //     </p>
    //   </div>
    //   <div className="flex items-center gap-x-4 text-xs mt-4">
    //     <button
    //       className="rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
    //       onClick={() => {}}
    //     >
    //       <FaRegThumbsUp /> {"98"}
    //     </button>

    //     <Link
    //       to={`/NewComment/${postId}`}
    //       className="rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
    //     >
    //       <FaRegCommentDots /> Reply
    //     </Link>
    //     <Link
    //       to={`/post/${postId}`}
    //       className="rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
    //     >
    //       <FaRegCommentDots /> See all comments
    //     </Link>
    //     <Link
    //       to={`/post/${postId}`}
    //       className="rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
    //     >
    //       <FaInfoCircle /> Post Details
    //     </Link>
    //     <button
    //       className="rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
    //       onClick={deletePostHandler}
    //     >
    //       <FaTrash /> Delete Post
    //     </button>
    //   </div>
    // </article>

    <section className=" bg-white dark:bg-gray-900 bg-fixed bg-hero-pattern bg-contain">
         <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div className="mx-auto max-w-screen-sm text-center lg:mb-0 mb-8  box-decoration-slice bg-gradient-to-r from-indigo-600 to-black-500 text-white px-2 rounded-md">
        <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-white">Search result 🔍</h2>
      </div>
      <div className="grid gap-8 lg:grid-cols-3">
        <div></div>
      <div className="col-span-1">
      <article className="flex flex-col w-full min-h-full p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-between items-center mb-5 text-gray-400">
          <span className="bg-primary-100 text-black text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
            <div className="flex items-center space-x-4">
              <img className="w-7 h-7 rounded-full" src={img} alt={`Profile of ${post.author}`} />
              <span className="font-medium dark:text-white">{post.author}</span>
            </div>
          </span>
          <div className="flex items-center gap-x-4">
            <div className="flex flex-wrap">
              <p
                key={post.id}
                className="m-1 px-2 py-1 bg-gray-200 rounded-full text-xs"
              >
                {post.tags}
              </p>
            </div>
            <time dateTime={formattedDate} className=" text-sm text-gray-500">
              {formattedDate}
            </time>
          </div>
        </div>
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          <Link to={`/PostDetails/${post.id}`}>{post.title}</Link>
        </h2>
        <p className="mb-5 font-light text-gray-500 dark:text-gray-400">{post.content}</p>
        <div className="flex justify-between items-center">
        </div>
        <div className="flex items-center gap-x-4 text-xs mt-4">
          {user && <button
            className={`rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100 ${userLike ? 'text-blue-500' : 'text-gray-600'}`}
            onClick={toggleLikePostHandler}
          >
            <FaRegThumbsUp /> {likesCount}
          </button>
          }

          {user && <Link
            to={`/NewComment/${postId}`}
            className="rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
          >
            <FaReply /> Reply
          </Link>}
          {user && <Link
            to={`/PostDetails/${postId}`}
            className="rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
          >
            <FaRegCommentDots /> Comments({commentCount})
          </Link>}
          {user && <Link
            to={`/PostDetails/${postId}`}
            className="rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
          >
            <FaInfoCircle /> Post Details
          </Link>}
          {permissionChecker && <Link
            to={`/EditPost/${postId}`}
            className="rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
          >
            <FaRegCommentDots /> Edit post
          </Link>}
          {permissionChecker && <button
            className="rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
            onClick={deletePostHandler}
          >
            <FaTrash /> Delete Post
          </button>}
        </div>
      </article>
      </div>
      </div>
      </div>
    </section>
  );
};

export default Search;

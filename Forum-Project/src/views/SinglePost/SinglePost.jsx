import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { deletePost, likePost, dislikePost, getLikesPerPost } from "../../services/posts.service";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { toast } from "react-toastify";
import { getCommentCount } from "../../services/comments.services";
import { useEffect, useState } from "react";
import { removeTags } from "../../services/tags.services.js";
import {
  FaTrash,
  FaRegThumbsUp,
  FaRegCommentDots,
  FaInfoCircle,
  FaReply,
} from "react-icons/fa";
import { getUserByHandle } from "../../services/users.services.js";

const SinglePost = (props) => {

  const [commentCount, setCommentCount] = useState(0);
  const [likesCount, setLikesCount] = useState(0);
  const [img, setImg] = useState('');
  const navigate = useNavigate();
  const { user, userData } = useContext(AuthContext);

  const [likedPosts, setLikedPosts] = useState(userData ? userData.likedPosts : false);

  const post = props.value;
  const postId = post.id;

  const postAuthor = post.author;
  const postTags = post.tags;
  const userLike = userData ? userData.likedPosts : null;

  const userName = userData ? userData.username : null;
  const isAuthor = postAuthor === userName;
  const permissionChecker = userData?.isModerator || isAuthor;
  useEffect(() => {
    getUserByHandle(post.author)
      .then((snapshot) => {
        setImg(snapshot.val()?.profilePhoto)
      });
  }, [post.author]);

  const deletePostHandler = () => {
    if (postAuthor === userName) {
      deletePost(postId).then(() => {
        navigate("/home");
        toast("You post deleted permanently!")
      }).catch((error) => console.error(error));
    } else { toast('Only author can delete the post!') }

    removeTags(postTags, postId)
      .then(() => console.log(`${postTags} removed successfully`))
      .catch((e) => console.log(e.message))
  };

  const toggleLikePostHandler = () => {
    if (likedPosts) {
      dislikePost(userName, postId)
        .then(() => {
          getLikesPerPost(postId)
            .then((result) => {
              setLikesCount(result)
            });
  
          setLikedPosts(false);
        })
        .catch((error) => console.error(error));
    } else {
      likePost(userName, postId)
        .then(() => {
          getLikesPerPost(postId)
            .then((result) => {
              setLikesCount(result)
            });
  
          setLikedPosts(true);
        })
        .catch((error) => console.error(error));
    }
  };

  useEffect(() => {

    getLikesPerPost(postId)
      .then((result) => {
        setLikesCount(result)
      });
  }, [postId, likesCount]);

  useEffect(() => {

    getCommentCount(postId)
      .then(count => setCommentCount(count));
  }, [postId]);
  useEffect(() => {
  }, [postId]);

  const myDate = new Date(post.createdOn);
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  };
  const formattedDate = myDate.toLocaleString("bg-BG", options);

  return (

    <article className="flex flex-col min-h-full p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
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
  )
}

SinglePost.propTypes = {
  value: PropTypes.object.isRequired,
};
export default SinglePost

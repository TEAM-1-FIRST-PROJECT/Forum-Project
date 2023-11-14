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
  
  const post = props.value;
  const postId = post.id;

  const postAuthor = post.author;
  const postTags = post.tags;
  const userLike = userData ? userData.likedPosts : null;

  const userName = userData ? userData.username : null;
  const isAuthor = postAuthor === userName;
  useEffect(() => {
    getUserByHandle(post.author)
      .then((snapshot) => {
        setImg(snapshot.val().profilePhoto)
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

      <div className="pl-3">
        <img
          src={img}
          className="h-10 w-10 rounded-full bg-gray-50"
        />
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
          <FaRegCommentDots /> Comments ({commentCount})
        </Link>}
        {user && <Link
          to={`/PostDetails/${postId}`}
          className="rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
        >
          <FaInfoCircle /> Post Details
        </Link>}
        {isAuthor && <Link
          to={`/EditPost/${postId}`}
          className="rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
        >
          <FaRegCommentDots /> Edit post
        </Link>}
        {isAuthor && <button
          className="rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
          onClick={deletePostHandler}
        >
          <FaTrash /> Delete Post
        </button>}
      </div>
    </article>
  );
}

SinglePost.propTypes = {
  value: PropTypes.object.isRequired,
};
export default SinglePost

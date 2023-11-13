import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { deletePost, getPostById} from "../../services/posts.service";   //pending
import { likePost, dislikePost, likesReverse  } from "../../services/likePost.services.js";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { toast } from "react-toastify";
import { getCommentCount } from "../../services/comments.services";
import { useEffect, useState } from "react";

const SinglePost = (props) => {

  const [commentCount, setCommentCount] = useState(0);
  const [liked, setLiked]= useState({})
  const [counter] = useState([]);           //pending
  const navigate = useNavigate();
  const { user, userData } = useContext(AuthContext);

  const post = props.value;
  const postId = post.id;
  const postAuthor = post.author;

  const userName = userData ? userData.username : null;
  
  const deletePostHandler = () => {
    if (postAuthor === userName) {
      deletePost(postId).then(() => {
        navigate("/home");
        toast("You post deleted permanently!")
      }).catch((error) => console.error(error));
    } else { toast('Only author can delete the post!') }
  };
////----------------------
      useEffect(() => {
        getPostById(postId)
        .then((snapshot) => {
          setLiked(snapshot.likedBy); 
      })
      .catch((error) => console.error(error));
      }, [postId]);
   

  console.log (userData, user)
  const likePostHandler = () => {   
    console.log (userData.likedPosts, user)

    if (userData.likedPosts) {
      console.log('-disli') 
      const disliked=Object.keys(disliked).filter(key => disliked[key] !== true);
      if (disliked.includes(userData.username)){
      likesReverse(userName, postId)
      .then(() => {
        toast("Post disliked !")
      })
      .catch((error) => console.error(error))
    }
    } else {
    console.log("li")
    likePost(userName, postId)
      .then(() => {
        toast("Post liked !")
      })
      .catch((error) => console.error(error))
    }
  }
  const dislikePostHandler = () => {
    console.log (userData.likedPosts, 'd')
    if (userData.likedPosts) {
      console.log('-li') 
      const liked=Object.keys(liked).filter(key => liked[key] !== true);
      console.log(liked, userData.username)
         if (liked.includes(userData.username)){
      likesReverse(userName, postId)
      .then(() => {
        toast("Post disliked !")
      })
      .catch((error) => console.error(error))
    }
    } else {
    console.log("disli")
    dislikePost(userName, postId)
      .then(() => {
        toast("Post liked !")
      })
      .catch((error) => console.error(error))
    }
  }
 //-----------------------------------------------
  useEffect(() => {
  
    getCommentCount(postId)
      .then(count => setCommentCount(count));
  
  }, [postId]); // добавяме userName като зависимост

  useEffect(() => {
  
  
  
  }, [postId]);
  

  const myDate = new Date(post.createdOn);
  const hours = myDate.getHours().toString().padStart(2, '0'); // Get hours (0-23), convert to string, and pad with leading zero if necessary
  const minutes = myDate.getMinutes().toString().padStart(2, '0'); // Get minutes (0-59), convert to string, and pad with leading zero if necessary
  const formattedDate = `${hours}:${minutes} ${myDate.getDate()}/${myDate.getMonth() + 1}`;

  return (
    <article className="flex max-w-xl flex-col items-start justify-between">
      <div className="flex items-center gap-x-4 text-xs">
        <time dateTime={formattedDate} className="text-gray-500">
          {formattedDate}
        </time>
        {user && <button className=" rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
          onClick={likePostHandler}>
          like{counter}
        </button>}
        {user && <button className=" rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
          onClick={dislikePostHandler}>
          dislike
        </button>}
        {user && <Link to={user && `/editPost/${post.id}`} className="rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
          Edit post
        </Link>}
        {user && <Link to={`/postDetails/${post.id}`} className="rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
          Post Details
        </Link>}
        {user && <button className=" rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
          onClick={deletePostHandler}>
          Delete Post
        </button>}
      </div>
      <div className="group relative">
        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
          <a>
            <span className="absolute inset-0" />
            {post.title}
          </a>
        </h3>
        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
          {post.description}
        </p>
        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
          {post.content}
        </p>
      </div>
      <div className="relative mt-8 flex items-center gap-x-4 text-sm leading-6">


        <div className="font-semibold text-gray-900">
         <img
         src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      
          alt=""
          className="h-10 w-10 rounded-full bg-gray-50"
/>
          <span className="absolute inset-0" />
         
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p className='pl-3'>{post.author}</p>
            <p style={{ marginLeft: '1rem' }}>{post.tags}</p>
          </div>

        </div>


      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
      {user && <Link to={`/NewComment/${post.id}`} className="rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
          Reply
        </Link>}
        {user && <Link to={`/postDetails/${post.id}`} className="rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
          See all comments ({commentCount})
        </Link>}
      </div>
    </article>
  )
}

SinglePost.propTypes = {
  value: PropTypes.object.isRequired,
};
export default SinglePost

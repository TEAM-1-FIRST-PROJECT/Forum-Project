import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { deletePost } from "../../services/posts.service";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { toast } from "react-toastify";

const SinglePost = (props) => {
  const navigate = useNavigate();
  const { userData } = useContext(AuthContext);

  const post = props.value;
  const postId = post.id;
  const postAuthor = post.author;


  const deletePostHandler = () => {
    if (postAuthor === userData.username) {
      deletePost(postId).then(() => {
        navigate("/home");
        toast("You post deleted permanently!")
      }).catch((error) => console.error(error));

    } else { toast('Only author can delete the post!') }
  };
  //console.log(post.id)
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
        <button className=" rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100" onClick={() => { }}>
          liked {'98'}
        </button>
        <Link to={`/post/${post.id}`} className="rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
          Post Details
        </Link>
        <button className=" rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
          onClick={deletePostHandler}>
          Delete Post
        </button>
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


        <p className="font-semibold text-gray-900">
          <span className="absolute inset-0" />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p className='pl-3'>{post.author}</p>
            <p style={{ marginLeft: '1rem' }}>{post.tags}</p>
          </div>

        </p>


      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link to={`/NewComment/${post.id}`} className="rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
          Reply
        </Link>
        <Link to='/seeAllComment' className="rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
          See all comments
        </Link>
      </div>
    </article>
  )
}

SinglePost.propTypes = {
  value: PropTypes.object.isRequired,
};
export default SinglePost

{/* <img
src={post.author.imageUrl}
alt=""
className="h-10 w-10 rounded-full bg-gray-50"
/> */}

{/* <time dateTime={post.createdOn.toString()} className="text-gray-500">
          {post.createdOn.toString()}
        </time> */}
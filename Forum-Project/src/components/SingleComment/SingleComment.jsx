import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { deleteComment } from "../../services/comments.services";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const SingleComment = (props) => {
  const { userData } = useContext(AuthContext);
  const comment = props.value
  const commentAuthor = comment.userName
  const navigate = useNavigate();

  const deleteCommentHandler = () => {
    if (commentAuthor === userData.username) {
      deleteComment(comment.id).then(() => {
        navigate("/home");
        toast("You comment deleted permanently!");

      }).catch((error) => console.error(error));

    } else { toast.error('Only author can delete the comment!') }
  };

  return (
    <div>
      <div className="flex items-center gap-x-4 text-xs">
        <div className="text-gray-500">
          <div className='pl-3'>{comment.title}</div>
        </div>
        <button className=" rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100" onClick={() => { }}>
          liked {'98'}
        </button>
        <button className=" rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
          onClick={deleteCommentHandler}>
          Delete Post
        </button>
      </div>
      <div className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
        {comment.content}
      </div>
    </div>
  )
}

SingleComment.propTypes = {
  value: PropTypes.object.isRequired,
};

export default SingleComment


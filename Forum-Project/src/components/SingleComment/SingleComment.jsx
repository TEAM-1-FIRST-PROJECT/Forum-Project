import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { deleteComment } from "../../services/comments.services";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserByHandle } from "../../services/users.services";

const SingleComment = (props) => {
  const [img, setImg] = useState('');

  const { userData } = useContext(AuthContext);
  const comment = props.value;
  const commentAuthor = comment.userName;
  const isAuthor = commentAuthor === userData.username;
  
  const navigate = useNavigate();

  const permissionChecker = userData.isModerator || isAuthor;
  const deleteCommentHandler = () => {
    if (permissionChecker) {
      deleteComment(comment.id).then(() => {
        navigate("/home");
        toast("You comment deleted permanently!");

      }).catch((error) => console.error(error));

    } else { toast.error('Only author can delete the comment!') }
  };

  useEffect(() => {
    getUserByHandle(comment.userName)
      .then((snapshot) => {
        setImg(snapshot.val().profilePhoto)
      });
  }, [comment.userName]);

  return (
    <div className=" bg-white min-h-full border border-gray-200 shadow-lg md:max-w-xl hover:shadow-indigo-400 rounded">
      <div className="flex items-center justify-between gap-x-4 text-xs">
        <div className="text-gray-500 flex items-center gap-x-3 pt-3">
          <img
            src={img}
            className=" ml-3 h-10 w-10 rounded-full bg-gray-50"
          />
          <div className="font-bold text-gray-600">{comment.userName}</div>
        </div>
      </div>
      <div className="mt-5 mb-5 line-clamp-3 text-sm leading-6 text-gray-600 ml-3">
        <div className="font-bold text-gray-600"> {comment.title}
        </div>
        {comment.content}
      </div>
      {permissionChecker && <button className=" mb-3 ml-3 rounded-full bg-gray-50 px-3 py-1.5 font-small text-gray-600 hover:bg-gray-100 mr-3"
        onClick={deleteCommentHandler}>
        Delete comment
      </button>}
      {permissionChecker && <Link to={`/editComment/${comment.id}`} className=" mb-3 rounded-full bg-gray-50 px-3 py-1.5 font-small text-gray-600 hover:bg-gray-100">
    
      Edit comment
      </Link>}
    </div>
  )
  
}

      SingleComment.propTypes = {
        value: PropTypes.object.isRequired,
};

      export default SingleComment


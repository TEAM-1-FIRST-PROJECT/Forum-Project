import { useEffect, useState } from "react";
import { getCommentsById } from "../../services/comments.services";
import SingleComment from "../SingleComment/SingleComment";
import PropTypes from "prop-types";


const Comments = (props) => {

  const [comments, setComments] = useState([]);
  const postId = props.value;

  useEffect(() => {
    getCommentsById(postId)
      .then((fetchedComments) => {
        setComments(fetchedComments);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, [postId]);

  return (
    <div className="
    py-5 sm:py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">

        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {comments.map((comment) => (
            <div key={comment.id} >
              <SingleComment value={comment}></SingleComment>
            </div>
          ))}
        </div>
      </div>
    </div >
  )
}

Comments.propTypes = {
  value: PropTypes.string.isRequired,
};
export default Comments;

import { useEffect, useState } from "react";
import { getCommentsByAuthor } from "../../services/comments.services";
import SingleComment from "../RecommendedPosts/SingleComment/SingleComment";


const Comments = (props) => {

  const [comments, setComments] = useState([]);
  const author = props.value;


  useEffect(() => {
    getCommentsByAuthor(author)
      .then((fetchedComments) => {
        setComments(fetchedComments);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);
console.log(author)
  return (
    <div className="bg-white py-5 sm:py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
            COMENNTS
          </h3>
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

export default Comments;
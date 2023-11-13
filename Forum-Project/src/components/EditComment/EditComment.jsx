import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { toast } from "react-toastify";
import { commentUpdateHandler } from "../../services/comments.services";
import { getCommentById } from "../../services/comments.services";


const EditComment = () => {

  const { id } = useParams();
  const [content, setContent] = useState("");
  const [isCommentSubmitted, setIsCommentSubmitted] = useState(false);
  const { userData } = useContext(AuthContext);
  const navigate = useNavigate();


  const commentSubmitHandler = async (event) => {
    event.preventDefault();

    if (content.trim() === "") {
      alert("Fields cannot be empty");
      return;
    }

    if (content.length < 4 || content.length > 98) {
      alert("Content length should be between 4 and 98 characters");
      return;
    }
    
    console.log(userData)
    getCommentById(id)
      .then((result) => {
      

    if (userData.username === result.userName) {
      commentUpdateHandler(id, content)
        .then(() => {

          setContent("");
          setIsCommentSubmitted(true);
          toast("comment submitted successfully!");
        })
        .catch((error) => {
          toast.error("Error submitting comment:", error);
          toast.error("An error occurred while submitting the comment.");
        });
      setTimeout(() => {
        navigate(-1);
      }, 2100);
    } else { toast.error('Only author can delete the comment!') }
    })
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900">Edit Comment</h2>
      <form onSubmit={commentSubmitHandler}>
        <div className="mt-6 space-y-6">
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Edit comment
            </label>
            <textarea
              rows="4"
              id="content"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:outline-none"
              placeholder="Edit comment"
            />
          </div>
        </div>
        <div className="mt-6 mb-40 flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm font-semibold text-gray-900">
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600"
          >
            Post
          </button>
        </div>
        {isCommentSubmitted && (
          <p className="text-green-500 mt-2">Comment successfully edited!</p>
        )}
      </form>
    </div>
  );
};

export default EditComment;

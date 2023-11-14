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

  const handleCancel = () => {
    navigate(-1);
  };

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
    <div className=" animate-colorchange flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 m-4 bg-white rounded-2xl shadow-2xl shadow-indigo-400 ">
        <h2 className="text-2xl font-semibold text-center text-gray-900">Edit Comment</h2>
        <form onSubmit={commentSubmitHandler} className="mt-4 space-y-6">
          <div className="space-y-4">
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
                className="block w-full px-4 py-2 mt-2 text-gray-900 bg-white border border-gray-300 rounded-md shadow-lg shadow-indigo-200 resize-x focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                placeholder="Edit comment"
              />
            </div>
          </div>
          <div className="flex items-center justify-between gap-4">
            <button type="button"
              onClick={handleCancel}
              className="text-sm font-semibold text-gray-900">
              Cancel
            </button>
            <button
              type="submit"
              onClick={commentSubmitHandler}
              className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              Submit
            </button>
          </div>
          {isCommentSubmitted && (
            <p className="text-green-500 mt-2">Comment successfully edited!</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditComment;

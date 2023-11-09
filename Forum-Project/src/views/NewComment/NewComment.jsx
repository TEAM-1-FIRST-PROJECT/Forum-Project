import { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { getUserByHandle } from "../../services/users.services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addNewComment } from "../../services/comments.services";
import { useParams } from "react-router-dom";

const NewComment = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPostSubmitted, setIsCommentSubmitted] = useState(false); 
  const { userData } = useContext(AuthContext);
  const navigate = useNavigate();
  

  const commentSubmitHanDler = async (event) => {
    event.preventDefault();

    if (
      title.trim() === "" ||
      content.trim() === ""
    ) {
      alert("Fields cannot be empty");
      return;
    }

    if (title.length < 4 || title.length > 10) {
      alert("Title should be between 4 and 10 characters");
      return;
    }

    if (content.length < 4 || content.length > 98) {
      alert("Content length should be between 4 and 98 characters");
      return;
    }

    const userName = userData.username;

    getUserByHandle(userName).then((snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.val();

        if (userData.isBlocked === true) {
          toast.error("This user is blocked and cannot create comments.");
          setTimeout(() => {
            navigate("/");
          }, 2100);
        } else if (userData.isBlocked === false) {

          addNewComment(id, title, content)
            .then((newComment) => {
              setTitle("");
              setContent("");
              setIsCommentSubmitted(true);
              toast("comment submitted successfully!");
              console.log("New comment:", newComment);

            })
            .catch((error) => {
              toast.error("Error submitting comment:", error);
              toast.error("An error occurred while submitting the comment.");
            });
          setTimeout(() => {
            navigate("/");
          }, 2100);
        }
      } else {
        toast.error("No such user exists!");
      }
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900">New Comment</h2>
      <form onSubmit={commentSubmitHanDler}>
        <div className="mt-6 space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:outline-none"
              placeholder="Title"
            />
          </div>
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Add comment
            </label>
            <textarea
              rows="4"
              id="content"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:outline-none"
              placeholder="What's on your mind?"
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
        {isPostSubmitted && (
          <p className="text-green-500 mt-2">Post successfully submitted!</p>
        )}
      </form>
    </div>
  );
};

export default NewComment;

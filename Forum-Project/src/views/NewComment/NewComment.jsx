import { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { getUserByHandle } from "../../services/users.services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addNewComment } from "../../services/comments.services";
import { useParams } from "react-router-dom";
import {
  MIN_COMMENT_TITLE_LENGTH,
  MAX_COMMENT_TITLE_LENGTH,
  MIN_COMMENT_LENGTH,
  MAX_COMMENT_LENGTH
} from "../../common/constants";


const NewComment = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPostSubmitted, setIsCommentSubmitted] = useState(false);
  const { userData } = useContext(AuthContext);
  const navigate = useNavigate();


  const handleCancel = () => {
    navigate(-1);
  };

  const commentSubmitHandler = (event) => {
    event.preventDefault();

    if (
      title.trim() === "" ||
      content.trim() === ""
    ) {
      alert("Fields cannot be empty");
      return;
    }

    if (title.length < MIN_COMMENT_TITLE_LENGTH || title.length > MAX_COMMENT_TITLE_LENGTH) {
      alert(`Title should be between ${MIN_COMMENT_TITLE_LENGTH} and ${MAX_COMMENT_TITLE_LENGTH} characters`);
      return;
    }

    if (content.length < MIN_COMMENT_LENGTH || content.length > MAX_COMMENT_LENGTH) {
      alert(`Content length should be between ${MIN_COMMENT_LENGTH} and ${MAX_COMMENT_LENGTH} characters`);
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

          addNewComment(id, userName, title, content)
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
    <div className=" animate-colorchange flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 m-4 bg-white rounded-2xl shadow-2xl shadow-indigo-400 ">
        <h2 className="text-2xl font-semibold text-center text-gray-900">
          Add comment
        </h2>
        <form onSubmit={commentSubmitHandler} className="mt-4 space-y-6">
          <div className="space-y-4">
            {[
              { label: "Title", state: title, setState: setTitle },  
              {
                label: "Content",
                state: content,
                setState: setContent,
              },
            ].map((field, index) => (
              <div key={index}>

                <label
                  htmlFor={field.label}
                  className={`block text-sm font-medium leading-6 text-black`}
                >
                  {field.label}
                </label>
                <textarea
                  id={field.label}
                  name={field.label}
                  value={field.state}
                  onChange={(e) => field.setState(e.target.value)}
                  className={`block w-full px-4 py-2 mt-2 ${userData.isAdmin ? ` text-red-500 font-extrabold font-serif` : 'text-black' && userData.isModerator ? 'text-indigo-600 font-medium' : 'text-black'} bg-white border border-gray-300 rounded-md shadow-lg shadow-indigo-200 resize-x focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent`}
                  placeholder={field.label}
                />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={handleCancel}
              className="text-sm font-semibold text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={commentSubmitHandler}
              className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
               SUBMIT
            </button>
          </div>
          {isPostSubmitted && (
            <p className="mt-2 text-green-500">Post successfully submitted!</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default NewComment;

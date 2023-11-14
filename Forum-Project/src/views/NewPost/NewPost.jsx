import { useState, useContext } from "react";
import { addPost } from "../../services/posts.service";
import { AuthContext } from "../../context/authContext";
import { getUserByHandle } from "../../services/users.services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  MIN_CONTENT_LENGTH,
  MIN_TITLE_LENGTH,
  MAX_CONTENT_LENGTH,
  MAX_TITLE_LENGTH
} from "../../common/constants";

const NewPost = () => {
  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");
  const [isPostSubmitted, setIsPostSubmitted] = useState(false);
  const { userData } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(-1);
  };

  const handlePostSubmit = async (event) => {
    event.preventDefault();

    if (
      title.trim() === "" ||
      content.trim() === ""
    ) {
      alert("Fields cannot be empty");
      return;
    }

    if (title.length < MIN_TITLE_LENGTH || title.length > MAX_TITLE_LENGTH) {
      alert(`Title should be between ${MIN_TITLE_LENGTH} and ${MAX_TITLE_LENGTH} characters`);
      return;
    }

    if (content.length < MIN_CONTENT_LENGTH || content.length > MAX_CONTENT_LENGTH) {
      alert(`Content length should be between ${MIN_CONTENT_LENGTH} and ${MAX_CONTENT_LENGTH} characters`);
      return;
    }

    const userName = userData.username;

    getUserByHandle(userName).then((snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.val();

        if (userData.isBlocked === true) {
          toast.error("This user is blocked and cannot create posts.");
          setTimeout(() => {
            navigate("/");
          }, 2100);
        } else if (userData.isBlocked === false) {
          addPost(userName, title, content)
            .then((newPost) => {
              setTitle("");
              setContent("");
              setIsPostSubmitted(true);
              toast("Post submitted successfully!");
              console.log("New post:", newPost);
            })
            .catch((error) => {
              toast.error("Error submitting post:", error);
              toast.error("An error occurred while submitting the post.");
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
          New Post
        </h2>
        <form onSubmit={handlePostSubmit} className="mt-4 space-y-6">
          <div className="space-y-4">
            {[
              { label: "Title", state: title, setState: setTitle },
              {
                label: "What's on your mind?",
                state: content,
                setState: setContent,
              },
            ].map((field, index) => (
              <div key={index}>
                <label
                  htmlFor={field.label}
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {field.label}
                </label>
                <textarea
                  id={field.label}
                  name={field.label}
                  value={field.state}
                  onChange={(e) => field.setState(e.target.value)}
                  className="block w-full px-4 py-2 mt-2 text-gray-900 bg-white border border-gray-300 rounded-md shadow-lg shadow-indigo-200 resize-x focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
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
              onClick={handlePostSubmit}
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

export default NewPost;

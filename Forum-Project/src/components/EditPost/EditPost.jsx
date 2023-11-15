import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { toast } from "react-toastify";
import { postUpdateHandler } from "../../services/posts.service";
import { getPostById } from "../../services/posts.service";
import { tagsUpdateHandler } from "../../services/tags.services";
import { MIN_CONTENT_LENGTH, MAX_CONTENT_LENGTH } from "../../common/constants";
import { useEffect } from "react";
import { getPostContentHandler } from './../../services/posts.service';

const EditPost = () => {


  const { id } = useParams();
  const [content, setContent] = useState("");
  const [tags, setTags] = useState('');
  const [isPostSubmitted, setIsCommentSubmitted] = useState(false);
  const { userData } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(-1);
  };

  useEffect(() => {
    getPostContentHandler(id)
      .then((snapshot) => {
        setContent(snapshot.val())
      });
  }, [id]);

  const postEditHandler = async (event) => {
    event.preventDefault();

    if (content.trim() === "") {
      alert("Fields cannot be empty");
      return;
    }

    if (content.length < 32 || content.length > 8192) {
      alert(`Content length should be between ${MIN_CONTENT_LENGTH} and ${MAX_CONTENT_LENGTH}`);
      return;
    }
    const arrOfTags = tags.split(',').map(el => el.trim().toLowerCase())

    getPostById(id)
      .then((result) => {

        if (userData.username === result.author) {

          Promise.all([postUpdateHandler(id, content, tags), ...arrOfTags.map(tag => tagsUpdateHandler(tag, id))])
            .then(() => {
              setTags('');
              setContent("");
              setIsCommentSubmitted(true);
              toast("Post edited successfully!");
              setTimeout(() => {
                navigate(-1);
              }, 2100);
            })
            .catch((errors) => {
              const [postError, tagsError] = errors;
              if (postError) {
                toast.error("Error editing post:", postError);
              }
              if (tagsError) {
                toast.error("Error editing tags:", tagsError);
              }
            });
        } else { toast.error('Only author can edit the comment!') }
      })

  }

  return (<>
    <div className=" bg-fixed bg-hero-pattern bg-contain animate-colorchange flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 m-4 bg-white rounded-2xl shadow-2xl shadow-indigo-400 ">
        <h2 className="text-2xl font-semibold text-center text-gray-900">
          Edit Post
        </h2>
        <form onSubmit={postEditHandler} className="mt-4 space-y-6">
          <div className="space-y-4">
            {[
              { label: "content", state: content, setState: setContent },

              {
                label: "tags",
                state: tags,
                setState: setTags,
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
              onClick={postEditHandler}
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
  </>
  );
}


export default EditPost

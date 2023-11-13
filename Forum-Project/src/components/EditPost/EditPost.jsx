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

  return (
    <div className=" items-center text-center max-w-lg">
      <h2 className="text-2xl font-semibold text-gray-900">Edit Post</h2>
      <form onSubmit={postEditHandler}>
        <div className="mt-10 mb-40 space-y-10 ">
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Edit post content
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
          <div>
            <label
              htmlFor='tags'
              className="block text-sm font-medium leading-6 text-gray-900">
              Add some tags
            </label>
            <input
              type="text"
              id='tags'
              name='tags'
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:outline-none"
              placeholder="Add some tags"
            />
          </div>
        </div>
        <div className="mb-40  flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm font-semibold text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600"
          >
            SUBMIT
          </button>
        </div>
        {isPostSubmitted && (
          <p className="text-green-500 mt-2">Post successfully edited!</p>
        )}
      </form>
    </div>
  );


}


export default EditPost

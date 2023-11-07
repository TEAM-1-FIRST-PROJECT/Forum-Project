import { useState } from 'react';
import { addPost } from '../../services/posts.service';

const NewPost = ({ addNewPost }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [isPostSubmitted, setIsPostSubmitted] = useState(false); // Add a state variable to track post submission

  const handlePostSubmit = async (event) => {
    event.preventDefault();

    if (title.trim() === '' || description.trim() === '' || content.trim() === '') {
      alert('Fields cannot be empty');
      return;
    }

    if (title.length < 16 || title.length > 64) {
      alert('Title should be between 16 and 64 characters');
      return;
    }

    if (content.length < 32 || content.length > 8192) {
      alert('Content length should be between 32 and 8192 characters');
      return;
    }

    const username = 'YourUsername';

    try {
      const newPost = await addPost(title, description, content, username);
      setTitle('');
      setDescription('');
      setContent('');
      setIsPostSubmitted(true); // Set the flag to true upon successful submission
      alert('Post submitted successfully!');
      console.log('New post:', newPost);
      addNewPost(newPost);
    } catch (error) {
      console.error('Error submitting post:', error);
      alert('An error occurred while submitting the post.');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900">New Post</h2>
      <form onSubmit={handlePostSubmit}>
        <div className="mt-6 space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
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
            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
              Description
            </label>
            <textarea
              rows="2"
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:outline-none"
              placeholder="Description"
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium leading-6 text-gray-900">
            What&apos;s on your mind?
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
        <div className="mt-6 flex items-center justify-end gap-x-6">
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

export default NewPost;

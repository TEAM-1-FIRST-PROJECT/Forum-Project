import { useState, useEffect } from 'react';
import { getAllPosts } from '../../../services/posts.service';
import SortButton from '../../../components/SortButton/Sortbutton';
import SinglePost from '../../../views/SinglePost/SinglePost';
import { getCommentCount } from '../../../services/comments.services';


const ViewAll = () => {
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      getAllPosts()
        .then((fetchedPosts) => {
          setAllPosts(fetchedPosts);
        })
        .catch((error) => {
          console.error('Error fetching recently added posts:', error);
        });
    };

    fetchData();
  }, []);

  const sortPosts = () => {
    const sortedPostsByDate = [...allPosts].sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn));
    setAllPosts(sortedPostsByDate);
  };

  const sortPostsByComments = () => {
    const updatedPosts = [...allPosts];
    
    Promise.all(
      updatedPosts.map((post) =>
        getCommentCount(post.id).then((commentCount) => ({ ...post, commentCount }))
      )
    ).then((postsWithComments) => {
      const sortedPostsByComments = [...postsWithComments].sort(
        (a, b) => b.commentCount - a.commentCount
      );
      setAllPosts(sortedPostsByComments);
    });
  };

  return (
    <div className=" bgImage py-5 sm:py-10 rounded-3xl items-center flex justify-center">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 items-center ">
        <div className="mx-auto max-w-2xl lg:mx-0 items-center ">
          <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
            All posts
          </h3>
          <div className="flex flex-col space-y-4">
            <SortButton onSort={sortPosts} onSortByComments={sortPostsByComments} />
          </div>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t bg-slate-100 border-gray-200 rounded-3xl p-10 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-1">
          {allPosts.map((post) => (
            <div key={post.id} >
              <SinglePost value={post}></SinglePost>
            </div>
          ))}
        </div>
      </div>
    </div >
  )
}


export default ViewAll;
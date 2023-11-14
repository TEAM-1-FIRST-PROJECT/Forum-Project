import { useState, useEffect } from 'react';
import { getAllPosts } from '../../../services/posts.service';
import SortButton from '../../../components/SortButton/Sortbutton';
import SinglePost from '../../../views/SinglePost/SinglePost';
import { getCommentCount } from '../../../services/comments.services';
import FilterButton from '../../../components/FilterButton/FilterButton';


const ViewAll = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [originalPosts, setOriginalPosts] = useState([]);

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

  const filterPostsByTag = (tags) => {
    const filteredPosts = allPosts.filter((post) =>
      tags.every((tag) => post.tags && post.tags.includes(tag))
    );

    setAllPosts(filteredPosts);
  };

  const resetPosts = () => {
    setAllPosts(originalPosts);
  };

  return (
    <section className=" bg-white dark:bg-gray-900 bg-fixed bg-hero-pattern bg-contain">

    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div className="mx-auto max-w-screen-sm text-center lg:mb-0 mb-8  box-decoration-slice bg-gradient-to-r from-indigo-600 to-black-500 text-white px-2 rounded-md">
        <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-white">Explore all posts 👇</h2>
      </div>
      <div className=" flex-row space-y-4 justify-end pb-10 z-10">
          <SortButton onSort={sortPosts} onSortByComments={sortPostsByComments} />
          <FilterButton onFilter={filterPostsByTag} onReset={resetPosts} />
        </div>
      <div className="grid gap-8 lg:grid-cols-2">

        {allPosts.map((post) => (
          <div key={post.id} >
            <SinglePost value={post}></SinglePost>
          </div>
        ))}
      </div>
    </div>

  </section>
  )
}


export default ViewAll;
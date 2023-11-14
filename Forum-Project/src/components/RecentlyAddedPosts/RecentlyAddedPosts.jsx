import { useState } from "react";
import { getAllPosts } from "../../services/posts.service";
import SinglePost from "../../views/SinglePost/SinglePost";
import { useEffect } from "react";
import SortButton from "../SortButton/Sortbutton";
import { getCommentCount } from "../../services/comments.services";
import FilterButton from "../FilterButton/FilterButton";

const RecentlyAddedPosts = () => {

  const [recentlyAddedPosts, setRecentlyAddedPosts] = useState([]);
  const [originalPosts, setOriginalPosts] = useState([]);

  useEffect(() => {
    getAllPosts()
      .then((fetchedPosts) => {
        setRecentlyAddedPosts(fetchedPosts);
        setOriginalPosts(fetchedPosts);
      })
      .catch((error) => {
        console.error('Error fetching recently added posts:', error);
      });
  }, []);

  const sortPosts = () => {
    const sortedPostsByDate = [...recentlyAddedPosts].sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn));
    setRecentlyAddedPosts(sortedPostsByDate);
  };

  const sortPostsByComments = () => {
    Promise.all(
      recentlyAddedPosts.map((post) =>
        getCommentCount(post.id).then((commentCount) => ({ ...post, commentCount }))
      )
    ).then((sortedPostsByComments) => {
      const sortedPostsByCommentsOnly = [...sortedPostsByComments].sort(
        (a, b) => b.commentCount - a.commentCount
      );
      setRecentlyAddedPosts(sortedPostsByCommentsOnly);
    });
  };

  const filterPostsByTag = (tags) => {
    const filteredPosts = recentlyAddedPosts.filter((post) =>
      tags.every((tag) => post.tags && post.tags.includes(tag))
    );

    setRecentlyAddedPosts(filteredPosts);
  };

  const resetPosts = () => {
    setRecentlyAddedPosts(originalPosts);
  };
  return (
    <section className=" bg-white dark:bg-gray-900 bg-fixed bg-hero-pattern bg-contain">

      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center lg:mb-0 mb-8  box-decoration-slice bg-gradient-to-r from-indigo-600 to-black-500 text-white px-2 rounded-md">
          <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-white">Connect. Share. Explore. 💡</h2>
          <p className="font-light text-white sm:text-xl dark:text-gray-400">
            Your Ultimate Apple Community.</p>
        </div>
        <div className=" flex flex-row space-y-4 justify-end pb-10 z-10 mt-10">
            <SortButton onSort={sortPosts} onSortByComments={sortPostsByComments} />
            <FilterButton onFilter={filterPostsByTag} onReset={resetPosts} />
          </div>
        <div className="grid gap-8 lg:grid-cols-2">

          {recentlyAddedPosts.map((post) => (
            <div key={post.id} >
              <SinglePost value={post}></SinglePost>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}

export default RecentlyAddedPosts;

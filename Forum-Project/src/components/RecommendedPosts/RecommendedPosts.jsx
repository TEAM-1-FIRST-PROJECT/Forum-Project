import SinglePost from "../../views/SinglePost/SinglePost";
import { useEffect, useState } from "react";
import { getAllPosts } from "../../services/posts.service";
import { getCommentCount } from "../../services/comments.services";
import SortButton from "../SortButton/Sortbutton";
import FilterButton from "../FilterButton/FilterButton";



const RecommendedPosts = () => {

  const [recommendedPosts, setRecommendedPosts] = useState([]);

  useEffect(() => {
    getAllPosts()
      .then((fetchedPosts) => {
        setRecommendedPosts(fetchedPosts);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  const sortPosts = () => {
    const sortedPostsByDate = [...recommendedPosts].sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn));
    setRecommendedPosts(sortedPostsByDate);
  };

  const sortPostsByComments = () => {
    Promise.all(
      recommendedPosts.map((post) =>
        getCommentCount(post.id).then((commentCount) => ({ ...post, commentCount }))
      )
    ).then((posts) => {
      const sortedPostsByComments = [...posts].sort(
        (a, b) => b.commentCount - a.commentCount
      );
      setRecommendedPosts(sortedPostsByComments);
    });
  };

  const filterPostsByTag = (tags) => {
    const filteredPosts = recommendedPosts.filter((post) =>
      tags.every((tag) => post.tags && post.tags.includes(tag))
    );

    setRecommendedPosts(filteredPosts);
  };

  return (
    <div className=" py-5 sm:py-10 rounded-3xl items-center flex justify-center">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 items-center ">
        <div className="mx-auto max-w-2xl lg:mx-0 items-center ">
          <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
            Recommended posts
          </h3>
          <div className="flex flex-col space-y-4">
            <SortButton onSort={sortPosts} onSortByComments={sortPostsByComments} />
            <FilterButton onFilter={filterPostsByTag} />
          </div>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t bg-slate-100 border-gray-200 rounded-3xl p-10 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-1">
          {recommendedPosts.map((post) => (
            <div key={post.id} >
              <SinglePost value={post}></SinglePost>
            </div>
          ))}
        </div>
      </div>
    </div >
  )
}

export default RecommendedPosts;
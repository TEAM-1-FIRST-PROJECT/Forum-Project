
import RecommendedPosts from "../RecommendedPosts/RecommendedPosts";
import RecentlyAddedPosts from "../RecentlyAddedPosts/RecentlyAddedPosts";
import { useState } from "react";
import { useEffect } from "react";
import { getAllPosts } from "../../services/posts.service";
<<<<<<< HEAD
import './homeview.css';
import UserAndCommentsCounter from "../UserAndCommentsCounte/UserAndCommentsCounter";
=======
import FilterButton from "../FilterButton/FilterButton";

>>>>>>> bb84cd8d5af7884d0b2615e5d025cc5ad9a40aa6


const HomeView = () => {
  const [recommendedPosts, setRecommendedPosts] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const allPosts = await getAllPosts();
      setRecommendedPosts(allPosts);
    };

    fetchPosts();
  }, []);

  return (
    <>
<<<<<<< HEAD
      <div className="bg-white sm:py-10 bgImage">
        <UserAndCommentsCounter/>
=======
    <div>
    <SortButton /> 
    </div>
      <div className="bg-white py-24 sm:py-32">
>>>>>>> bb84cd8d5af7884d0b2615e5d025cc5ad9a40aa6
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              DUNER
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Innovative, sleek, powerful electronic device revolutionizing modern tech experiences.
            </p>
          </div>
          <div>
            {recommendedPosts ? (
              <div>
                <FilterButton></FilterButton>
                <div style={{ display: "flex", justifyContent: "flex-end", paddingRight: '10px' }}>
                  <button className="relative flex items-center bg-gray-600 border focus:outline-none shadow text-white rounded focus:ring ring-gray-300 group"
                    onClick={() => setRecommendedPosts(false)}>Switch to recently posts</button>
                </div>
                <RecommendedPosts></RecommendedPosts>
              </div>
            ) : (
              <div>
                <FilterButton></FilterButton>
                <div style={{ display: "flex", justifyContent: "flex-end", paddingRight: '10px' }}>
                  <button className="relative flex items-center bg-gray-600 border focus:outline-none shadow text-white rounded focus:ring ring-gray-300 group"
                    onClick={() => setRecommendedPosts(true)}>Switch to recommended posts</button>
                </div>
                <RecentlyAddedPosts></RecentlyAddedPosts>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );

};

export default HomeView;


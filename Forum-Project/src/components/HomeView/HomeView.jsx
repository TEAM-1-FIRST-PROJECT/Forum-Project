import SortButton from "../Sort/SortButton";
import RecommendedPosts from "../RecommendedPosts/RecommendedPosts";
import RecentlyAddedPosts from "../RecentlyAddedPosts/RecentlyAddedPosts";
import { useState } from "react";
import { useEffect } from "react";
import { getAllPosts } from "../../services/posts.service";
import { Link } from "react-router-dom";



const HomeView = () => {
  const [recommendedPosts, setRecommendedPosts] = useState(false);
  const [posts, setPosts] = useState([]);

 
  useEffect(() => {
    const fetchPosts = async () => {
      const allPosts = await getAllPosts();
      setPosts(allPosts);
    };

    fetchPosts();
  }, []);

  return (

    <>
      <SortButton />
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              From the forum
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Innovative, sleek, powerful electronic device revolutionizing modern tech experiences.
            </p>
          </div>
          <div >
            {recommendedPosts ? (
              <div>
                <div style={{ display: "flex", justifyContent: "flex-end", paddingRight: '10px' }}>
                  <button className="relative flex items-center bg-gray-600 border focus:outline-none shadow text-white rounded focus:ring ring-gray-300 group"
                    onClick={() => setRecommendedPosts(false)}>Switch to recently posts</button>
                  <SortButton></SortButton>
                </div>
                <RecommendedPosts></RecommendedPosts>
              </div>
            ) : (
              <div>
                <div style={{ display: "flex", justifyContent: "flex-end", paddingRight: '10px' }}>
                  <button className="relative flex items-center bg-gray-600 border focus:outline-none shadow text-white rounded focus:ring ring-gray-300 group"
                    onClick={() => setRecommendedPosts(true)}>Switch to recommended posts</button>
                  <SortButton></SortButton>
                </div>
                <RecentlyAddedPosts></RecentlyAddedPosts>
                {posts.length > 0 && posts.map((post, index) => (
                  <div key={index} className="bg-white shadow overflow-hidden sm:rounded-lg my-4">
                    <div className="px-4 py-5 sm:px-6">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">{post.content}</h3>
                      <p className="mt-1 max-w-2xl text-sm text-gray-500">{post.author}</p>
                      <Link to={`/post/${post.id}`} className="rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
          Post Details
        </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeView;


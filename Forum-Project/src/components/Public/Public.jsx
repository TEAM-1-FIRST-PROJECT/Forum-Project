import { NavLink } from "react-router-dom";
import { useState } from "react";
import RecommendedPosts from "../RecommendedPosts/RecommendedPosts";
import RecentlyAddedPosts from "../RecentlyAddedPosts/RecentlyAddedPosts";
import SortButton from "../SortButton/Sortbutton";


const Public = () => {
  const [recommendedPosts, setRecommendedPosts] = useState(false);
  // const setRecommendedPostsHandler = () => setRecommendedPosts()
  return (
    <>
      <div style={{ margin: '10px', padding: "10px", border: "1px solid black" }}
      className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
        <p>Welcome to the Dynamic Island forums...</p>
        <p>
          You are currently viewing our boards as a guest which gives you limited access to view most discussions and access our other features.
          Only registered members may post questions, contact other members or search our database of over several millions posts.
          Please Click <NavLink to={`/Login`}>LOGIN</NavLink> or Click to <NavLink to={`/Signup`}>REGISTER</NavLink></p>
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
          </div>
        )}
      </div>

    </>
  )
}

export default Public;
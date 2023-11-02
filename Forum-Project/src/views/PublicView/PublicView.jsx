import { NavLink } from "react-router-dom";
import { useState } from "react";
import RecommendedPosts from "../../components/RecommendedPosts/RecommendedPosts";
import RecentlyAddedPosts from "../../components/RecentlyAddedPosts/RecentlyAddedPosts";

const PublicView = () => {
  const [recommendedPosts, setRecommendedPosts] = useState(false);
  // const setRecommendedPostsHandler = () => setRecommendedPosts()
  return (
    <>
      <div style={{ margin: '10px', padding: "10px", border: "1px solid black" }}>
        <p>Welcome to the Dynamic Island forums...</p>
        <p>
          You are currently viewing our boards as a guest which gives you limited access to view most discussions and access our other features.
          Only registered members may post questions, contact other members or search our database of over several millions posts.
          Please Click <NavLink to={`/Login`}>LOGIN</NavLink> or Click to <NavLink to={`/Signup`}>REGISTER</NavLink></p>
      </div>
      <div style={{ margin: '10px', padding: "10px", border: "1px solid black" }}>
        {recommendedPosts ? (
          <div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button onClick={() => setRecommendedPosts(false)}>!!!RecentlyAddedPosts!!!</button>
            </div>
            <RecommendedPosts></RecommendedPosts>
          </div>
        ) : (
          <div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button onClick={() => setRecommendedPosts(true)}>!!!RecommendedPosts!!!</button>
            </div>
            <RecentlyAddedPosts></RecentlyAddedPosts>
          </div>
        )}


      </div>
    </>
  )
}

export default PublicView;
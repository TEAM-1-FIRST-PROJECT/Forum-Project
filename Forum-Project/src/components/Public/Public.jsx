import RecentlyAddedPosts from "../RecentlyAddedPosts/RecentlyAddedPosts";
import UserAndCommentsCounter from "../UserAndCommentsCounter/UserAndCommentsCounter";
import { NavLink } from "react-router-dom";


const Public = () => {

  return (
    <>
       <div className=" bg-fixed bg-hero-pattern bg-contain"  > 
        <UserAndCommentsCounter/>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 lg:mb-0 mb-8">
          <div className="text-white mx-auto max-w-screen-sm text-center lg:mb-0 mb-8 box-decoration-slice bg-gradient-to-r from-pink-500 to-black-500 text-white px-2 rounded-md ">
            <p>
          You are currently viewing our boards as a guest which gives you limited access <br /> to view most discussions and access our other features.
          Only registered members <br /> may post questions, contact other members or search our database of over several millions posts.
          <p>Please click <NavLink className={"hover:text-violet-600 font-bold"} to="/Login">LOGIN</NavLink> or <NavLink className={"hover:text-violet-600 font-bold"} to="/Signup">REGISTER</NavLink> to create an account.</p>
            </p>
            </div>
          <div>
            <RecentlyAddedPosts></RecentlyAddedPosts>
          </div>
        </div>
      </div>
    </>
  );
}

export default Public;
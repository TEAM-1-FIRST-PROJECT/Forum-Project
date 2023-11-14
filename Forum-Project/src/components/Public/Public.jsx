import RecentlyAddedPosts from "../RecentlyAddedPosts/RecentlyAddedPosts";
import UserAndCommentsCounter from "../UserAndCommentsCounter/UserAndCommentsCounter";
import { NavLink } from "react-router-dom";


const Public = () => {

  return (
    <>
       <div className=" bg-fixed bg-hero-pattern bg-contain"  > 
        <UserAndCommentsCounter/>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className=" mt-5 mx-auto max-w-xl mb-10 lg:mx-0 box-decoration-slice bg-gradient-to-r from-indigo-600 to-black-500 text-white px-2 rounded-md">
            <p className=" text-2xl text-yellow-50 font-bold text-black-600 text-left leading-relaxed">
             Connect. Share. Explore. 💡<br />
              Your Ultimate Apple Community.
        </p>
          </div>
          <div className="text-white mx-auto max-w-2xl mb-10 lg:mx-0  box-decoration-slice bg-gradient-to-r from-indigo-600 to-black-500 text-white px-2 rounded-md">
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
import { posts } from "../../data/data";
import SinglePost from "../../views/SinglePost/SinglePost";

const recommendedPosts = posts.slice(0, posts.length - 4);
const RecommendedPosts = ()=> {
  return(
    <div className="bg-white py-5 sm:py-10">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:mx-0">
        <p className="mt-2 text-lg leading-8 text-gray-600">
        Recommended posts
        </p>
      </div>
      <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
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
import { posts } from "../../data/data";
import SinglePost from "../../views/SinglePost/SinglePost";

const recentlyAddedPosts = posts.slice(posts.length-4);
const RecentlyAddedPosts = () => {

  return (
    <div>
      {recentlyAddedPosts.map((post) => (
              <div key={post.id} >
                <SinglePost value={post}></SinglePost>
              </div>
            ))}
    </div>
  )
}

export default RecentlyAddedPosts;
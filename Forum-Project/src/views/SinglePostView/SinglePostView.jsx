import Login from "../Login/Login";
import SinglePost from "../SinglePost/SinglePost";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import { getAllPosts } from "../../services/posts.service";


// const post =
// {
//   id: 1,
//   title: "Boost your conversion rate",
//   href: "#",
//   description:
//     "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
//   date: "Mar 16, 2020",
//   datetime: "2020-03-16",
//   category: { title: "Marketing", href: "#" },
//   author: {
//     name: "Michael Foster",
//     role: "Co-Founder / CTO",
//     href: "#",
//     imageUrl:
//       "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//   },
// }
// const SinglePostView = () => {
//   const { user } = useContext(AuthContext);

//   return (
//     <>
//       {user ? (
//         <div className="text-gray-600 pl-10 pt-10" >
//           <SinglePost value={post}></SinglePost>
//         </div >
//       ) : (
//         <Login></Login>
//       )}</>
//   )

// }

// export default SinglePostView

const SinglePostView = () => {
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const allPosts = await getAllPosts();
      const recentPost = allPosts[0];
      setPost(recentPost);
    };
  
    fetchPosts();
  }, []);

  return (
    <>
      {user ? (
        <div className="text-gray-600 pl-10 pt-10" >
          {post && <SinglePost value={post}></SinglePost>}
        </div >
      ) : (
        <Login></Login>
      )}</>
  )
}

export default SinglePostView


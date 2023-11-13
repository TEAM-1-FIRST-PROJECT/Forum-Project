// import SortButton from "../../components/SortButton/Sortbutton";
// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { getAllPosts } from "../../services/posts.service";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

// const EditorsChoice = () => {
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     getAllPosts()
//       .then((fetchedPosts) => {
//         setPosts(fetchedPosts);
//       })
//       .catch((error) => {
//         console.error("Error fetching posts:", error);
//       });
//   }, []);

//   // Проверка дали 'dark' мод е запазен в localStorage при първоначалното зареждане
//   useEffect(() => {
//     const isDarkMode = localStorage.getItem("darkMode") === "true";
//     setIsDarkMode(isDarkMode);
//     if (isDarkMode) {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   }, []);

//   // Функция за превключване на темата
//   const toggleTheme = () => {
//     setIsDarkMode(!isDarkMode);
//     localStorage.setItem("darkMode", !isDarkMode);
//     if (!isDarkMode) {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   };

//   return (
//     <>
//       <button onClick={toggleTheme}>
//         <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
//       </button>
//       <SortButton />
//       <div className="bg-white dark:bg-black py-24 sm:py-32">
//         <div className="mx-auto max-w-7xl px-6 lg:px-8">
//           <div className="mx-auto max-w-2xl lg:mx-0">
//             <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
//               Best of the best
//             </h2>
//             <p className="mt-2 text-lg leading-8 text-gray-600">
//               See the most interesting posts from the forum.
//             </p>
//           </div>
//           <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
//             {posts.map((post) => (
//               <article
//                 key={post.id}
//                 className="flex max-w-xl flex-col items-start justify-between"
//               >
//                 <div className="flex items-center gap-x-4 text-xs">
//                   <time
//                     dateTime={new Date(post.createdOn).toISOString()}
//                     className="text-gray-500"
//                   >
//                     {new Date(post.createdOn).toLocaleDateString("en-US", {
//                       year: "numeric",
//                       month: "short",
//                       day: "numeric",
//                     })}
//                   </time>
//                   <button
//                     className=" rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
//                     onClick={() => {}}
//                   >
//                     liked {post.id}
//                   </button>
//                   <Link
//                     to={`/post/${post.id}`}
//                     className="rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
//                   >
//                     Post Details
//                   </Link>
//                   {post.category && post.category.href && (
//                     <a
//                       href={post.category.href}
//                       className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
//                     >
//                       {post.category.title}
//                     </a>
//                   )}
//                 </div>
//                 <div className="group relative">
//                   <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
//                     <a href={post.href}>
//                       <span className="absolute inset-0" />
//                       {post.title}
//                     </a>
//                   </h3>
//                   <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
//                     {post.description}
//                   </p>
//                   <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
//                     {post.content}
//                   </p>
//                 </div>
//                 <div className="relative mt-8 flex items-center gap-x-4">
//                   <img
//                     src={post.author.imageUrl}
//                     alt=""
//                     className="h-10 w-10 rounded-full bg-gray-50"
//                   />
//                   <div className="text-sm leading-6">
//                     <p className="font-semibold text-gray-900">
//                       <a href={post.author.href}>
//                         <span className="absolute inset-0" />
//                         {post.author}
//                       </a>
//                     </p>
//                     <p className="text-gray-600">{post.author.role}</p>
//                   </div>
//                 </div>
//                 <Link
//                   to="/"
//                   className="rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
//                 >
//                   Reply
//                 </Link>
//                 <Link
//                   to="/"
//                   className="rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
//                 >
//                   See all replies
//                 </Link>
//               </article>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default EditorsChoice;

import { Link } from "react-router-dom";

const EditorsChoice = () => {
return (
  <section className=" bg-white dark:bg-gray-900 bg-fixed bg-hero-pattern bg-contain">
  <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
          <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-white">Our Blog</h2>
          <p className="font-light text-gray-400 sm:text-xl dark:text-gray-400">Discover responses to frequently asked questions and dive into the sea of intriguing topics within our blog.</p>
      </div> 
      <div className="grid gap-8 lg:grid-cols-2">
          <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
              <div className="flex justify-between items-center mb-5 text-gray-400">
                  <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                      <svg className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path></svg>
                      Tutorial
                  </span>
                  <span className="text-sm">2 days ago</span>
              </div>
              <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><a href="#">A Step-by-Step Guide to Switching from Android to iPhone</a></h2>
              <p className="mb-5 font-light text-gray-500 dark:text-gray-400">Making the switch from Android to iPhone can be an exciting but daunting experience. See how to do it seamlessly here.</p>
              <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                      <img className="w-7 h-7 rounded-full" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                      <span className="font-medium dark:text-white">
                          Lyuba Boyadzhieva
                      </span>
                  </div>
                  <Link to="/Article1" className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
          Read more
          <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
          </svg>
        </Link>

              </div>
          </article> 
          <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
              <div className="flex justify-between items-center mb-5 text-gray-500">
                  <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                      <svg className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd"></path><path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"></path></svg>
                      Article
                  </span>
                  <span className="text-sm">5 days ago</span>
              </div>
              <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><a href="#">Choosing the Perfect MacBook: A Guide for 2023</a></h2>
              <p className="mb-5 font-light text-gray-500 dark:text-gray-400">As we step into the technological landscape of 2023, the choices for MacBook enthusiasts have never been more diverse. Explore the best options for your lifestyle.</p>
              <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                      <img className="w-7 h-7 rounded-full" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Bonnie Green avatar" />
                      <span className="font-medium dark:text-white">
                          Todor Todorov
                      </span>
                  </div>
                  <Link to="/Article2" className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
          Read more
          <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
          </svg>
        </Link>
              </div>
          </article>       
          <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
              <div className="flex justify-between items-center mb-5 text-gray-500">
              <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                      <svg className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd"></path><path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"></path></svg>
                      Article
                  </span>
                  <span className="text-sm">10 days ago</span>
              </div>
              <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><a href="#">Exploring the Exciting Features of iOS 17</a></h2>
              <p className="mb-5 font-light text-gray-500 dark:text-gray-400"> Apple&apos;s latest operating system, iOS 17, has arrived, bringing a slew of exciting features and improvements.</p>
              <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                      <img className="w-7 h-7 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" />
                      <span className="font-medium dark:text-white">
                          Plamen Milanov
                      </span>
                  </div>
                  <Link to="/Article3" className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
          Read more
          <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
          </svg>
        </Link>

              </div>
          </article>        
          <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
              <div className="flex justify-between items-center mb-5 text-gray-500">
              <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                      <svg className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd"></path><path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"></path></svg>
                      Article
                  </span>
                  <span className="text-sm">15 days ago</span>
              </div>
              <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><a href="#">Elevate Your Apple Watch Experience with Must-Have Accessories</a></h2>
              <p className="mb-5 font-light text-gray-500 dark:text-gray-400"> Your Apple Watch is a powerful companion, but with the right accessories, you can take its functionality and style to the next level.</p>
              <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                      <img className="w-7 h-7 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                      <span className="font-medium dark:text-white">
                          Lilly Ivanova
                      </span>
                  </div>
                  <Link to="/Article4" className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
          Read more
          <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
          </svg>
        </Link>

              </div>
          </article>         
      </div>  
  </div>
</section>
)
}

export default EditorsChoice;
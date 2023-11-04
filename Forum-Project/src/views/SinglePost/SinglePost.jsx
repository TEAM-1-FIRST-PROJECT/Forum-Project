import { Link } from "react-router-dom";

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

const SinglePost = (props) => {
const post = props.value;

  return (
    <article className="flex max-w-xl flex-col items-start justify-between">
      <div className="flex items-center gap-x-4 text-xs">
        <time dateTime={post.datetime} className="text-gray-500">
          {post.date}
        </time>
        <button className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100" onClick={() => { }}>
          liked
        </button>
        <Link to="/singlePost" className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
          Post Details
        </Link>
      </div>
      <div className="group relative">
        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
          <a href={post.href}>
            <span className="absolute inset-0" />
            {post.title}
          </a>
        </h3>
        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
          {post.description}
        </p>
      </div>
      <div className="relative mt-8 flex items-center gap-x-4">
        <img
          src={post.author.imageUrl}
          alt=""
          className="h-10 w-10 rounded-full bg-gray-50"
        />
        <div className="text-sm leading-6">
          <p className="font-semibold text-gray-900">
            <a href={post.author.href}>
              <span className="absolute inset-0" />
              props.{post.author.name}
            </a>
          </p>
          <button onClick={() => { }} className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
            Replay
          </button>
        </div>
      </div>
      <div className="relative mt-8 flex items-center gap-x-4">
        <div className="text-sm leading-6">
          <p className="text-gray-600">Replay from {post.author.name}</p>
          <p className="text-gray-600 pl-10" >Replay Replay Replay</p>
        </div>
      </div>
    </article>
  )
}

export default SinglePost

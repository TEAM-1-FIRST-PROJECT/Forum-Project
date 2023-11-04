
const SortButton = () => {
  return (
      <div className="absolute right-40 top-60">
           <button className="relative flex items-center bg-gray-600 border focus:outline-none shadow text-white rounded focus:ring ring-gray-300 group">
            <p className="px-4">Sort posts</p>
            <span className="border-l p-2 hover:bg-gray-100">
              <svg
                className="w-5 h-5 "
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </span>
            <div className="absolute hidden group-focus:block top-full min-w-full w-max bg-white shadow-md mt-1 rounded">
              <ul className="text-left border rounded">
                <li className="px-4 py-2 hover:bg-gray-100 border- text-black">most recently</li>
                <li className="px-4 py-2 hover:bg-gray-100 border-b text-black">most commented</li>
              </ul>
            </div>
          </button>
    </div>
  )
}

export default SortButton;
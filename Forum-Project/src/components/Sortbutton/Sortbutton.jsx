import PropTypes from 'prop-types';

const SortButton = ({ onSort, onSortByComments }) => {
  return (
      <div className="flex justify-end pr-10 z-10">
           <button className="relative flex items-center bg-white border border-white text-black font-medium focus:outline-none shadow rounded focus:ring ring-indigo-500/40 group hover:bg-light-blue-100 hover:text-black shadow-lg shadow-indigo-500/40">
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
                <li className="px-4 py-2 hover:bg-gray-100 border- text-black" onClick={onSort}>Most recent</li>
                <li className="px-4 py-2 hover:bg-gray-100 border-b text-black"onClick={onSortByComments}>Most commented</li>
              </ul>
            </div>
          </button>
    </div>
  )
}

SortButton.propTypes = {
  onSort: PropTypes.func.isRequired,
  onSortByComments: PropTypes.func.isRequired,
};

export default SortButton;
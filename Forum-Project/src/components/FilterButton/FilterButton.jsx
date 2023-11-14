import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

// const FilterButton = () => {
//     const [isDropdownVisible, setDropdownVisibility] = useState(false);

//     const toggleDropdown = () => {
//         setDropdownVisibility(!isDropdownVisible);
//     };
//     return (
//         <div className="absolute right-60 top-50 p-4">
//             <button id="dropdownDefault" data-dropdown-toggle="dropdown"
//                 className="text-black bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
//                 type="button" onClick={toggleDropdown}>
//                 Filter by category
//                 <svg className="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
//                 </svg>
//             </button>

//             {/* Dropdown */}
//             <div id="dropdown"
//                 className={`z-10 ${isDropdownVisible ? "block" : "hidden"} w-56 p-3 bg-black rounded-lg shadow dark:bg-gray-700`}>
//                 <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
//                     Category
//                 </h6>
//                 <ul className="space-y-2 text-sm" aria-labelledby="dropdownDefault">
//                     <li className="flex items-center">
//                         <input id="apple" type="checkbox" value=""
//                             className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />

//                         <label htmlFor="apple" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
//                             iPhone (56)
//                         </label>
//                     </li>

//                     <li className="flex items-center">
//                         <input id="fitbit" type="checkbox" value=""
//                             className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />

//                         <label htmlFor="fitbit" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
//                             MacOs (56)
//                         </label>
//                     </li>

//                     <li className="flex items-center">
//                         <input id="dell" type="checkbox" value=""
//                             className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />

//                         <label htmlFor="dell" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
//                             Apple Watch (56)
//                         </label>
//                     </li>
//                 </ul>
//             </div>
//         </div>
//     )
// }


const FilterButton = ({onFilter, onReset}) => {
    const [isDropdownVisible, setDropdownVisibility] = useState(false);
    const dropdownRef = useRef(null);
    const [selectedCategories, setSelectedCategories] = useState([]);
  
    const toggleDropdown = () => {
      setDropdownVisibility(!isDropdownVisible);
    };
  
    useEffect(() => {
        const handleClickOutside = (event) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownVisibility(false);
          }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);

      const handleCheckboxChange = (category) => {
        const updatedCategories = selectedCategories.includes(category)
          ? selectedCategories.filter((c) => c !== category)
          : [...selectedCategories, category];
        setSelectedCategories(updatedCategories);
        onFilter(updatedCategories);
      };
    
      const handleReset = () => {
        setSelectedCategories([]);
        onReset();
      };

  

  return (
    <div className="flex justify-end pr-10 w-full" ref={dropdownRef}>
      <button id="dropdownDefault"
        data-dropdown-toggle="dropdown"
        className="relative flex items-center bg-white border border-white text-black font-medium focus:outline-none rounded focus:ring ring-indigo-500/40 group hover:bg-light-blue-100 hover:text-black shadow-lg shadow-indigo-500/40"
        type="button"
        onClick={toggleDropdown}>
        <p className="px-4">Filter by category</p>
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
        {/* Dropdown */}
        <div className={`absolute ${isDropdownVisible ? "block" : "hidden"} group-focus:block top-full min-w-full w-max bg-white shadow-md mt-1 rounded`}>
          <h6 className="mb-3 text-sm font-medium text-gray-900">
            Category
          </h6>
          <ul className="pl-4 space-y-2 text-sm" aria-labelledby="dropdownDefault">
            <li className="flex items-center">
              <input
                id="apple"
                type="checkbox"
                value=""
                checked={selectedCategories.includes('iphone')}
                onChange={() => handleCheckboxChange('iphone')}
                className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500"
              />
              <label
                htmlFor="apple"
                className="ml-2 text-sm font-medium text-gray-900"
              >
                iPhone
              </label>
            </li>
            <li className="flex items-center">
              <input
                id="fitbit"
                type="checkbox"
                value=""
                checked={selectedCategories.includes('macos')}
                onChange={() => handleCheckboxChange('macos')}
                className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500"
              />
              <label
                htmlFor="fitbit"
                className="ml-2 text-sm font-medium text-gray-900"
              >
                MacOs
              </label>
            </li>
            <li className="flex items-center">
              <input
                id="dell"
                type="checkbox"
                value=""
                checked={selectedCategories.includes('applewatch')}
                onChange={() => handleCheckboxChange('applewatch')}
                className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500"
              />
              <label
                htmlFor="dell"
                className="ml-2 text-sm font-medium text-gray-900"
              >
                Apple Watch
              </label>
            </li>
          </ul>
          <button
            onClick={handleReset}
            className=" pt-3 text-indigo-500 underline hover:text-indigo-700"
          >
            Reset
          </button>
        </div>
      </button>
    </div>
  );
};

FilterButton.propTypes = {
    onFilter: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
  };
export default FilterButton; 


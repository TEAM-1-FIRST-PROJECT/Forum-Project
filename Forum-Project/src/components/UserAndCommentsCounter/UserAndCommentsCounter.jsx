import { useEffect, useState } from "react";
import { getUsersLength } from "../../services/users.services";
import { getPostsLength } from "../../services/posts.service";
import { toast } from "react-toastify";

const UserAndCommentsCounter = () => {
  const [usersLength, setUsersLength] = useState([]);
  const [postsLength, setPostsLength] = useState([]);

  useEffect(() => {
    getUsersLength()
      .then((length) => {
        setUsersLength(length);
      })
      .catch((error) => {
        toast.error(error);
      });

    getPostsLength()
      .then((length) => {
        setPostsLength(length);
      })
      .catch((error) => {
        toast.error(error);
      });
  });

  return (
    <>
      <div className="flex justify-center items-center  space-x-4">
        <div className="flex flex-col items-center bg-white shadow-xl shadow-indigo-300 p-4 rounded-md">
          <p className="text-lg font-extrabold text-red-600">{usersLength}</p>
          <p className="font-sans font-bold text-lg">Registered Users</p>
        </div>
        <div className=" border-l border-gray-300 h-20 "></div>
        <div className="flex flex-col items-center bg-white shadow-xl shadow-indigo-300 p-4 rounded-md">
          <span className="text-lg font-extrabold text-red-600">
            {postsLength}
          </span>
          <span className="font-sans font-bold text-lg">Total Posts</span>
        </div>
      </div>
    </>
  );
};

export default UserAndCommentsCounter;

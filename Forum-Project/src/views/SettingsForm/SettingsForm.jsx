import SignUpImg from "../../assets/SignUp.jpeg";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router";
import { updateUserData, } from "../../services/users.services";
import { MAX_NAME_LENGTH, MIN_NAME_LENGTH } from "../../common/constants";

const SettingsForm = () => {
  const [form, setForm] = useState({
    lastName: "",
    email: "",
    photo: "",
  });

  const { user, userData } = useContext(AuthContext);

  const navigate = useNavigate();

  const updateForm = (field) => (e) => {
    setForm({
      ...form,
      [field]: e.target.value,
    });
  };

  const handleUpdateUserData = (e) => {
    e.preventDefault();

    if (form.firstName) {
      if (
        form.firstName.length < MIN_NAME_LENGTH ||
        form.firstName.length > MAX_NAME_LENGTH
      ) {
        alert("First Name is required");
        return;
      }
    }
    if (form.lastName) {
      if (
        (form.lastName.length < MIN_NAME_LENGTH) ||
        form.lastName.length > MAX_NAME_LENGTH
      ) {
        alert("Last Name is required");
        return;
      }
    }
    if (!form.email) {
      alert("Email is required");
      return;
    }
    if (form.email !== user.email) {
      alert("Wrong email");
      return;
    }

    if (!form.firstName) form.firstName = userData.firstName;
    if (!form.lastName) form.lastName = userData.lastName;

    updateUserData(
      userData.username,
      form.firstName,
      form.lastName,
      form.photo
    )
      //})


      .then(() => {
        navigate("/home");
      })
      .catch((e) => console.log(e));
  };
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
        <div className="hidden sm:block">
          <img
            className="w-full  object-cover max-w-3xl"
            src={SignUpImg}
            alt=""
          />
        </div>
        <div className="bg-gray-500 flex flex-col justify-center">
          <form className="max-w-[550px] w-full mx-auto bg-gray-600 p-8 px-8 rounded-lg">
            <h2 className="text-4x1 dark:text-white font-bold text-center">
              Account settings
            </h2>
            <div className="flex flex-col text-gray-400 py-2">
              <input
                className="rounded-lg bg-gray-700 mt-2 p-2 focus-within:border-blue-500 focus:bg-gray-800 focus:outline-none"
                type="text"
                value={form.firstName}
                onChange={updateForm("firstName")}
                placeholder="change first name"
              />
            </div>
            <div className="flex flex-col text-gray-400 py-2">
              <input
                className="rounded-lg bg-gray-700 mt-2 p-2 focus-within:border-blue-500 focus:bg-gray-800 focus:outline-none"
                type="text"
                value={form.lastName}
                onChange={updateForm("lastName")}
                placeholder="change last name"
              />
            </div>
            <div className="flex flex-col text-gray-400 py-2">
              <input
                className="rounded-lg bg-gray-700 mt-2 p-2 focus-within:border-blue-500 focus:bg-gray-800 focus:outline-none"
                type="email"
                value={form.email}
                onChange={updateForm("email")}
                placeholder="@mail"
              />
            </div>
            <div className="flex flex-col text-gray-400 py-2">
              <input
                className="rounded-lg bg-gray-700 mt-2 p-2 focus-within:border-blue-500 focus:bg-gray-800 focus:outline-none"
                type="file"
                accept=".jpg, .jpeg"
                value={form.photo}
                onChange={updateForm("photo")}
                placeholder="upload a profile photo"
              />
            </div>
            <button
              className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg"
              onClick={handleUpdateUserData}
            >
              UPLOAD
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default SettingsForm;

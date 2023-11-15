import { Link } from "react-router-dom";
import SignUpImg from "../../assets/sign-up.png";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router";
import {
  getUserByHandle,
  createUserHandle,
} from "../../services/users.services";
import { registerUser } from "../../services/auth.services";
import {
  MAX_NAME_LENGTH,
  MIN_NAME_LENGTH,
  PASSWORD_CHECK,
} from "../../common/constants";
import { toast } from "react-toastify";

const SignUp = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    profilePhoto: "",
  });

  const { setUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const updateForm = (field) => (e) => {
    setForm({
      ...form,
      [field]: e.target.value,
    });
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    if (!form.firstName) {
      toast.warning("First Name is required");
      return;
    }

    if (
      form.firstName.length < MIN_NAME_LENGTH ||
      form.firstName.length > MAX_NAME_LENGTH
    ) {
      toast.warning(
        `First Name must be between ${MIN_NAME_LENGTH} and ${MAX_NAME_LENGTH} characters long`
      );
      return;
    }

    if (!form.lastName) {
      toast.warning("Last Name is required");
      return;
    }

    if (
      form.lastName.length < MIN_NAME_LENGTH ||
      form.lastName.length > MAX_NAME_LENGTH
    ) {
      toast.warning(
        `Last Name must be between ${MIN_NAME_LENGTH} and ${MAX_NAME_LENGTH} characters long`
      );
      return;
    }

    if (!form.username) {
      toast.warning("Username is required");
      return;
    }

    if (!form.email) {
      toast.warning("Email is required");
      return;
    }

    // if (!PASSWORD_CHECK.test(form.password)) {
    //   toast.warning("Password must contain at least one uppercase letter, one lowercase letter, one number and one special character and to be at least 8 characters long");
    //   return;
    // }

    getUserByHandle(form.username)
      .then((snapshot) => {
        if (snapshot.exists()) {
          toast.warning("Username already exists");
        }
        return registerUser(form.email, form.password);
      })
      .then((credential) => {
        createUserHandle(
          form.username,
          credential.user.uid,
          credential.user.email,
          form.firstName,
          form.lastName,
          form.profilePhoto
        );

        credential.user.value = form.username;
        setUser({
          user: credential.user,
        });
      })
      .then(() => {
        toast.success("User created successfully, redirecting...");
        
          navigate("/home");
       
      })
      .catch((e) => toast.error(e.message));
  };
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
        <div className="hidden sm:block">
          <img
            className="w-full h-full object-cover"
            src={SignUpImg}
            alt=""
          />
        </div>
        <div className="bg-gray-300 flex flex-col justify-center">
          <form className="max-w-[550px] w-full mx-auto shadow-xl hover:shadow-violet-400 bg-gray-400 p-8 px-8 rounded-lg">
            <h2 className="text-4x1 text-3xl text-black font-bold text-center">
              SIGN UP
            </h2>
            <div className="flex flex-col text-black py-2">
              <label>First Name</label>
              <input
                className="rounded-lg  mt-2 p-2 focus-within:border-blue-500 focus:outline-none"
                type="text"
                value={form.firstName}
                onChange={updateForm("firstName")}
              />
            </div>
            <div className="flex flex-col text-black py-2">
              <label>Last Name</label>
              <input
                className="rounded-lg  mt-2 p-2 focus-within:border-blue-500 focus:outline-none"
                type="text"
                value={form.lastName}
                onChange={updateForm("lastName")}
              />
            </div>
            <div className="flex flex-col text-black py-2">
              <label>Username</label>
              <input
                className="rounded-lg mt-2 p-2 focus-within:border-blue-500 focus:outline-none"
                type="text"
                value={form.username}
                onChange={updateForm("username")}
              />
            </div>
            <div className="flex flex-col text-black py-2">
              <label>Email</label>
              <input
                className="rounded-lg mt-2 p-2 placeholder-slate-400
      focus:outline-none 
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                type="email"
                value={form.email}
                onChange={updateForm("email")}
              />
            </div>
            <div className="flex flex-col text-black py-2">
              <label>Password</label>
              <input
                className="rounded-lg bg-white mt-2 p-2 focus-within:border-blue-500 focus:outline-none"
                type="password"
                value={form.password}
                onChange={updateForm("password")}
              />
            </div>
            <button
              className="w-full my-5 py-2 bg-violet-400 shadow-xl hover:shadow-violet-600 text-black font-semibold rounded-lg"
              onClick={handleSignUp}
              type="button"
            >
              SIGN UP
            </button>
            <p className="text-indigo-500 py-2 flex justify-center">
              Already have an account?{" "}
              <Link
                className="ml-1 hover:animate-pulse dark:text-white mix-blend-color-dodge"
                to="/Login"
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;

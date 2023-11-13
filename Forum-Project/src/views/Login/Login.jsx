import { Link } from "react-router-dom";
import loginImg from "../../assets/login.jpeg";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router";
import { loginUser } from "../../services/auth.services";
import { PASSWORD_CHECK } from "../../common/constants";
import { toast } from "react-toastify";
import { passwordReset } from "../../config/firebase-config";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const updateForm = (field) => (e) => {
    // console.log(e.target.value)
    setForm({
      ...form,
      [field]: e.target.value,
    });
  };

  const handleLogin = () => {
    if (!form.email) {
      toast.warning("Email is required");
    }
    if (!form.password && PASSWORD_CHECK.test(form.password)) {
      toast.warning("Password is required");
      return;
    }

    loginUser(form.email, form.password)
      .then((credential) => {
        setUser({
          user: credential.user,
        });
      })
      .then(() => {
        toast.success("Login successful, redirecting...");
        setTimeout(() => {
          navigate("/home");
        }, 2100);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <>
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block">
        <img className="w-full h-full object-cover" src={loginImg} alt="" />
      </div>
      <div className="bg-gray-300 flex flex-col justify-center">
        <form className="max-w-[550px] w-full mx-auto shadow-xl hover:shadow-violet-400 bg-gray-400 p-8 px-8 rounded-lg">
          <h2 className="text-4x1 text-3xl dark:text-white font-bold text-center">
            SIGN IN
          </h2>
          <div className="flex flex-col text-black py-2">
            <label>Email</label>
            <input
              className="rounded-lg mt-2 p-2 focus-within:border-blue-500 focus:outline-none"
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={updateForm("email")}
            />
          </div>
          <div className="flex flex-col text-black py-2">
            <label>Password</label>
            <input
             className="rounded-lg dark:bg-white mt-2 p-2 focus-within:border-blue-500 focus:outline-none"
              type="password"
              name="password"
              id="password"
              value={form.password}
              onChange={updateForm("password")}
            />
          </div>
          <div className="flex justify-between text-black py-2">
            <p className="flex items-center">
              <input className="mr-2" type="checkbox" /> Remember Me
            </p>
            <Link >Forgot Password</Link>
          </div>
          <button
           className="w-full my-5 py-2 bg-teal-500 shadow-xl hover:shadow-teal-800 dark:text-white font-semibold rounded-lg"
            type="button"
            onClick={handleLogin}
          >
            Log In
          </button>
          <p className="text-indigo-500 py-2 flex justify-center">
            Don&#39;t have an account?{" "}
            <Link
              className="ml-1 dark:text-white hover:animate-pulse mix-blend-color-dodge"
              to="/Signup"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  </>
  
  );
};

export default Login;

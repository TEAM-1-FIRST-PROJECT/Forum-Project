import { Link } from "react-router-dom";
import loginImg from "../../assets/login.jpeg";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router";
import { loginUser } from "../../services/auth.services";
import { MIN_PASSWORD_LENGTH } from "../../common/constants";

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
      alert("Email is required");
      return;
    }
    if (!form.password && form.password.length < MIN_PASSWORD_LENGTH) {
      alert(`Password is required and must be at least ${MIN_PASSWORD_LENGTH} characters long`);
      return;
    }

    loginUser(form.email, form.password)
      .then((credential) => {
        setUser({
          user: credential.user,
        });
      })
      .then(() => {
        navigate("/home");
      });
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
        <div className="hidden sm:block">
          <img className="w-full h-full object-cover" src={loginImg} alt="" />
        </div>

        <div className="bg-gray-500 flex flex-col justify-center">
          <form className="max-w-[550px] w-full mx-auto bg-gray-600 p-8 px-8 rounded-lg">
            <h2 className="text-4x1 text-3xl dark:text-white font-bold text-center">
              SIGN IN
            </h2>
            <div className="flex flex-col text-gray-400 py-2">
              <label>Email</label>
              <input
                className="rounded-lg bg-gray-700 mt-2 p-2 focus-within:border-blue-500 focus:bg-gray-800 focus:outline-none"
                type="email"
                name="email"
                id="email"
                value={form.email}
                onChange={updateForm("email")}
              />
            </div>
            <div className="flex flex-col text-gray-400 py-2">
              <label>Password</label>
              <input
                className="rounded-lg bg-gray-700 mt-2 p-2 focus-within:border-blue-500 focus:bg-gray-800 focus:outline-none"
                type="password"
                name="password"
                id="password"
                value={form.password}
                onChange={updateForm("password")}
              />
            </div>
            <div className="flex justify-between text-gray-400 py-2">
              <p className="flex items-center">
                <input className="mr-2" type="checkbox" /> Remember Me
              </p>
              <p>Forgot Password</p>
            </div>
            <button
              className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg"
              onClick={handleLogin}
            >
              Log In
            </button>
            <p className="text-gray-400 py-2 flex justify-center">
              Don&#39;t have an account?{" "}
              <Link
                className="ml-1 hover:animate-pulse mix-blend-color-dodge"
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

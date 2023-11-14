import { useState } from "react";
import { registerUser } from "../../../services/auth.services";
import { createAdminHandle } from "../../../services/admin.services";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MAX_NAME_LENGTH, MIN_NAME_LENGTH, PASSWORD_CHECK, PHONE_NUMBER_CHECK } from "../../../common/constants";


function UserRegistrationComponent() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegistration = () => {

    if (!firstName) {
      toast.warning("First Name is required");
      return;
    }

    if (firstName.length < MIN_NAME_LENGTH || firstName.length > MAX_NAME_LENGTH) {
      toast.warning(`First Name must be between ${MIN_NAME_LENGTH} and ${MAX_NAME_LENGTH} characters long`);
      return;
    }

    if (!lastName) {
      toast.warning("Last Name is required");
      return;
    }

    if (lastName.length < MIN_NAME_LENGTH || lastName.length > MAX_NAME_LENGTH) {
      toast.warning(`Last Name must be between ${MIN_NAME_LENGTH} and ${MAX_NAME_LENGTH} characters long`);
      return;
    }

    if (!email) {
      toast.warning("Email is required");
      return;
    }

    if (!PHONE_NUMBER_CHECK.test(phone)) {
      toast.warning("Phone is required");
      return;
    }

    if (!PASSWORD_CHECK.test(password)) {
      toast.warning("Password must contain at least one uppercase letter, one lowercase letter, one number and one special character and to be at least 8 characters long");
      return;
    }

    registerUser(email, password)
      .then((userCredential) => {
        const newUser = userCredential.user;

        createAdminHandle(firstName, lastName, email, phone, newUser.uid)
          .then(() => {
            toast.success("User created successfully, redirecting... to admin panel");
            setTimeout(() => {
              navigate("/admin");
            }, 2100);
          })
          .catch((error) => {
            toast.error(`Error creating user: ${error}`);
          });
      })
      .catch((error) => {
        toast.error(`Error creating user: ${error}`);
      });
  };

  return (
    <div className=" bg-zinc-900 p-1">
    <div className="bg-fixed bg-hero-pattern bg-contain max-w-md mx-auto m-8 p-6 bg-gray-300 border rounded-lg  shadow-xl hover:shadow-2xl hover:shadow-violet-300">
      <h2 className="text-xl text-white font-semibold mb-4">
        Create Administrator Account
      </h2>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="block w-full p-2 mb-4 border focus:outline-none rounded shadow-md hover:shadow-green-200"
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className="block w-full p-2 mb-4 border  focus:outline-none rounded shadow-md hover:shadow-green-200 "
      />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="block w-full p-2 mb-4 border rounded bg-white placeholder-slate-400 shadow-md hover:shadow-green-200
      focus:outline-none 
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500 hover:invalid:shadow-red-600
    "/>
      <input
        type="number"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="block w-full p-2 mb-4 border  focus:outline-none rounded shadow-md hover:shadow-green-200"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="block w-full p-2 mb-4 border  focus:outline-none rounded shadow-md hover:shadow-green-200"
      />
      <button
        onClick={handleRegistration}
        className="transition delay-150 duration-300 ease-in-out  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Register
      </button>
      </div>
      </div>
  );
}

export default UserRegistrationComponent;

import Home from "./views/Home/Home";
import Footer from "./components/Footer/Footer";
import Login from "./views/Login/Login";
import NewPost from "./views/NewPost/NewPost";
import SignUp from "./views/Signup/Signup";
import About from "./views/About/About";
import PublicView from "./views/PublicView/PublicView";
import Notfound from "./views/Notfound/Notfound";
import EditorsChoice from "./views/EditorsChoice/EditorsChoice";
import SinglePostView from "./views/SinglePostView/SinglePostView";
import Comments from "./components/Comments/Comments";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "./context/authContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config/firebase-config";
import { useState, useEffect } from "react";
import { getUserData } from "./services/users.services";
import Watch from "./views/Categories/Watch/Watch";
import Iphone from "./views/Categories/iPhone/Iphone";
import Mac from "./views/Categories/Mac/Mac";
import ViewAll from "./views/Categories/ViewAll/ViewAll";
import SettingsForm from "./views/SettingsForm/SettingsForm";
import AdminSignUp from "./views/Admin/AdminSignUp/AdminSignUp";
import Admin from "./views/Admin/Admin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PostDetails from "./components/PostDetails/PostDetails";
import Header from "./components/Header/Header";
import NewComment from "./views/NewComment/NewComment";
import Spiner from "./assets/spiner.png";
import EditComment from "./components/EditComment/EditComment";
const App = () => {
  const [user, loading] = useAuthState(auth);
  const [appState, setAppState] = useState({
    user,
    userData: false,
  });

  if (appState.user !== user) {
    setAppState({ user });
  }


  useEffect(() => {
    if (user === null) return;

    getUserData(user.uid)
      .then((snapshot) => {
        if (!snapshot.exists()) {
          toast.error("Something went wrong!");
        }
        const username = Object.keys(snapshot.val())[0];
        // Delay setting the app state by 2 seconds
        setTimeout(() => {
         

          setAppState({
            ...appState,
            userData: snapshot.val()[username],
          });
        },4);
      })
      .catch((e) => toast.error(e.message));
  }, [user, appState]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen animate-spin">
        <img className=" bg-transparent" src={Spiner} alt="" />
      </div>
    );
  }


  // useEffect(() => {
  //   if (user === null) {
  //     return;
  //   }

  //   getUserData(user.uid).then((snapshot) => {
  //     if (!snapshot.exists()) {
  //       throw new Error("User data not found");
  //     }
  //     const username = Object.keys(snapshot.val())[0];

  //     setAppState({
  //       ...appState,
  //       userData: snapshot.val()[username],
  //     });
  //   });
  // });
  return (
    <div>
      <AuthContext.Provider value={{ ...appState, setUser: setAppState }}>
        <Header />
        <Routes>
          <Route path="/" element={<PublicView />} />
          <Route path="/home" element={<Home />} />
          <Route path="/singlePostView" element={<SinglePostView />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/About" element={<About />} />
          <Route path="/EditorsChoice" element={<EditorsChoice />} />
          <Route path="*" element={<Notfound />} />
          <Route path="/newPost" element={<NewPost></NewPost>} />
          <Route path="/Iphone" element={<Iphone />} />
          <Route path="/Mac" element={<Mac />} />
          <Route path="/Watch" element={<Watch />} />
          <Route path="/ViewAll" element={<ViewAll />} />
          <Route path="/settings" element={<SettingsForm />} />
          <Route path="/adminsignup" element={<AdminSignUp />} />
          {appState.userData && appState.userData.isAdmin === true && (
            <Route path="/admin" element={<Admin />} />
          )}
          <Route path="/post/:id" element={<PostDetails />} />
          <Route path="/newComment/:id" element={<NewComment />} />
          <Route path="/allComments/:id" element={<Comments />} />
          <Route path="/editComment/:id" element={<EditComment />} />
        </Routes>
        <Footer />
        <ToastContainer
          position={"top-right"}
          autoClose={1300}
          pauseOnHover={true}
        />
      </AuthContext.Provider>
    </div>
  );
};

export default App;

import Home from "./views/Home/Home";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Login from "./views/Login/Login";
import NewPost from "./views/NewPost/NewPost";
import SignUp from "./views/Signup/Signup";
import About from "./views/About/About";
import PublicView from "./views/PublicView/PublicView";
import Notfound from "./views/Notfound/Notfound";
import EditorsChoice from "./views/EditorsChoice/EditorsChoice";
import SinglePostView from "./views/SinglePostView/SinglePostView";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "./context/authContext";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "./config/firebase-config";
import { useState, useEffect } from "react";
import { getUserData } from "./services/users.services";
import Watch from "./views/Categories/Watch/Watch";
import Iphone from "./views/Categories/iPhone/Iphone";
import Mac from "./views/Categories/Mac/Mac";
import ViewAll from "./views/Categories/ViewAll/ViewAll";




const App = () => {
  const [user] = useAuthState(auth);
  const [appState, setAppState] = useState({
    user,
    userData: false,
  })

  if(appState.user !== user){
    setAppState({user});
  }

  useEffect(() => {
      if (user === null){
        return;
      }

      getUserData(user.uid)
      .then(snapshot => {
        if(!snapshot.exists()){
          throw new Error('User data not found');
        }

        setAppState({
          ...appState,
          userData: Object.keys(snapshot.val())[0] 
          // Object.keys(snapshot.val())[0] returns the first key of the object
          // Object.keys(snapshot.val()) returns an array of the keys of the object
          // snapshot.val() returns the value of the object
          // Google this part when you have lot's of user data Object.keys(snapshot.val())[0] 
        })
      })
  })
  console.log(user);
  return (
    <div>
      <AuthContext.Provider value={{ ...appState, setUser: setAppState}}>
        <Navbar />
        <Routes>
          <Route path="/" element={<PublicView />} />
          <Route path='/home' element={<Home />} />
          <Route path="/singlePostView" element={<SinglePostView />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/About" element={<About />} />
          <Route path="/EditorsChoice" element={<EditorsChoice />} />
          <Route path="*" element={<Notfound />} />
          <Route path='/newPost' element={<NewPost></NewPost>} />
          <Route path="/Iphone" element={<Iphone />} />
          <Route path="/Mac" element={<Mac />} />
          <Route path="/Watch" element={<Watch />} />
          <Route path="/ViewAll" element={<ViewAll />} />
        </Routes>
        <Footer />
      </AuthContext.Provider>
    </div>
  );
};

export default App;

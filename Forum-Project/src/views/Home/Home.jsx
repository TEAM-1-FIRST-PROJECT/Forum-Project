import HomeView from "../../components/HomeView/HomeView";
import Login from "../Login/Login";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      {user ? <HomeView /> : <Login />}
    </div>
  )
};

export default Home;

import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import Public from "../../components/Public/Public";
import Home from "../Home/Home";

const PublicView = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      {user ? <Home></Home> : <Public></Public> }

    </>
  )
}

export default PublicView;
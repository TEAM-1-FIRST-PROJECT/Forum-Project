import HomeView from "../../components/HomeView/HomeView";
import PublicView from "../../components/PublicView/PublicView";

const Home = () => {
  const isLogged = false;

  return (
    <div>
      {isLogged ? <HomeView /> : <PublicView />}
    </div>
  )
};

export default Home;

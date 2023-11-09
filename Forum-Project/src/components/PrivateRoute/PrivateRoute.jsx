


import {PropTypes} from 'prop-types';
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { Link, Route } from "react-router-dom";
const PrivateRoute = ({ children, ...rest }) => {
  const { userData } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        userData?.isAdmin ? (
          children
        ) : (
          <Link
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default PrivateRoute;


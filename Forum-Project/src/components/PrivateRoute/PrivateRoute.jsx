import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, Route } from "react-router-dom";
import { auth } from "../../config/firebase-config";
import {PropTypes} from 'prop-types';

const PrivateRoute = ({ element: Element, adminOnly, ...rest }) => {
    const [user] = useAuthState(auth);
  
    if (!user) {
      // Redirect to login if user is not authenticated
      return <Navigate to="/Login" />;
    }
  
    if (adminOnly && user.isAdmin !== 'true') {
      // Redirect to a different page (e.g., access denied) for non-admin users
      return <Navigate to="/Notfound" />;
    }
  
    return <Route {...rest} element={<Element />} />;
};
  
PrivateRoute.propTypes = {
    element: PropTypes.elementType.isRequired,
    adminOnly: PropTypes.bool,
};
  
  export default PrivateRoute;
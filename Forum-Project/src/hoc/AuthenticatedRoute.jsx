import { useContext } from "react";
import { AuthContext } from "../context/AppContext";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
export default function AuthenticatedRoute({ children }) {

    const { user, setUser } = useContext(AuthContext);
    const location = useLocation();

    if (user === null) {
        return <Navigate to="/signin" path={location.pathname} > </Navigate>;
    }

    return children;

}

AuthenticatedRoute.propTypes = {
    children: PropTypes.object.isRequired,
}

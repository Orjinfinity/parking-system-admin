import { ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { IRequireAuth } from "./RequireAuth";

const ProtectedRoute = ({ children }: IRequireAuth): ReactElement => {
    const location = useLocation();
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
    return !isAuthenticated ? children : <Navigate to={location?.state?.from?.pathname || '/'}/>;
}

export default ProtectedRoute;
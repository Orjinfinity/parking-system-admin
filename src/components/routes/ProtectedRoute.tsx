import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { IRequireAuth } from "./RequireAuth";

const ProtectedRoute = ({ children }: IRequireAuth): ReactElement => {
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
    return !isAuthenticated ? children : <Navigate to="/"/>
}

export default ProtectedRoute;
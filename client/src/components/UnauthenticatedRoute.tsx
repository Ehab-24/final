import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";

export default function UnauthenticatedRoute() {
    const { isLoggedIn } = useAuth();
    return isLoggedIn ? <Navigate to="/" /> : <Outlet />
}


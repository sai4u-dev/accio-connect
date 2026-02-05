import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
    const { isAuthenticated, authChecked } = useSelector((s) => s.auth);

    if (!authChecked) {
        return null;
    }

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return children;
}

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const { isAuthenticated, authChecked } = useSelector((s) => s.auth);

    // ⛔ Don't decide until auth is checked
    if (!authChecked) {
        return null; // or loader
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authThunks";

export default function Navbar() {
    const { isAuthenticated } = useSelector((s) => s.auth);
    const dispatch = useDispatch();

    return (
        <nav className="bg-white shadow p-4 flex justify-between">
            <h1 className="font-bold">AccioConnect</h1>

            {isAuthenticated && (
                <button
                    onClick={() => dispatch(logout())}
                    className="text-red-600"
                >
                    Logout
                </button>
            )}
        </nav>
    );
}

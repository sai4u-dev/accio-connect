import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom"
import { logout } from "../features/auth/authThunks";
const SearchBar = ({ isVisible, searchTerm, setSearchTerm }) => {
    const dispatch = useDispatch()
    return (
        <div
            className={`
        sticky top-0 z-40 overflow-hidden
        transition-all duration-500 ease-in-out  mb-4
        ${isVisible ? "max-h-24 opacity-100" : "max-h-0 opacity-0"}
      `}
        >

            <div
                className={`
          bg-white border-b border-gray-200 shadow-sm
          px-6 py-4
          transform transition-all duration-500 flex
          ${isVisible ? "translate-y-0 scale-100 blur-0" : "-translate-y-4 scale-95 blur-sm"}
        `}
            >
                <Link to={"/"} className="absolute mt-1 text-2xl" >Home</Link>

                <div className="max-w-7xl mx-auto min-lg:">
                    <div className="flex items-center gap-3 bg-gray-100 rounded-xl px-4 py-3">
                        <Search size={18} className="text-sky-500" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search users..."
                            className="bg-transparent outline-none w-200 min-sm text-sm text-gray-700 placeholder-gray-400"
                        />
                    </div>
                </div>
                <button
                    onClick={() => dispatch(logout())}
                    className=" bg-red-500 hover:bg-red-600 py-2 rounded-lg font-medium transition px-10"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default SearchBar;

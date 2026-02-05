import { Search } from "lucide-react";

const FloatingSearchButton = ({ show, onClick }) => {
    if (!show) return null;

    return (
        <button
            onClick={onClick}
            className="fixed bottom-6 right-6 z-50 bg-sky-600 hover:bg-sky-700 text-white p-4 rounded-full shadow-lg transition"
        >
            <Search size={22} />
        </button>
    );
};

export default FloatingSearchButton;

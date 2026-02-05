import React, { useState } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import CreatePostModal from "./CreatePostModal";

const menuItems = [
    { label: "Home", path: "/", icon: "🏠" },
    { label: "Referral Posts", path: "/rp", icon: "📄" },
    { label: "Connections", path: "/connetions", icon: "👥" },
    { label: "Profiles", path: "/users", icon: "👥" },
];

const AsideBar = () => {
    const { user } = useSelector((s) => s.auth);

    const [openCreatePost, setOpenCreatePost] = useState(false);

    return (
        <motion.aside
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="w-80 bg-white p-6 space-y-8 h-full sticky top-2 rounded-xl "
        >
            {/* Logo */}
            <h1 className="text-2xl font-bold text-blue-600">Accio Connect</h1>

            {/* Profile */}
            {user && (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                    <img
                        src={user.profilePicture || "/avatar.png"}
                        className="w-12 h-12 rounded-full"
                    />
                    <div>
                        <p className="font-semibold">{user.firstName}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                </div>
            )}

            {/* Navigation */}
            <nav className="space-y-4 relative">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `relative flex items-center gap-3 p-3 rounded-lg font-medium transition-all hover:scale-[1.05] 
              ${isActive
                                ? "bg-blue-50 text-blue-600"
                                : "text-gray-700 hover:bg-gray-100"
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                {/* Active Indicator */}
                                {isActive && (
                                    <motion.span
                                        layoutId="activeTab"
                                        className="absolute left-0 top-1/2 h-6 w-1 bg-blue-600 rounded-r-md -translate-y-1/2"
                                    />
                                )}

                                <span className="text-lg">{item.icon}</span>
                                {item.label}
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* CTA */}
            <div className="absolute bottom-6 left-6 right-6">
                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setOpenCreatePost(true)}
                    className="w-full bg-blue-600 text-white p-3 rounded-lg font-medium hover:bg-blue-700"
                >
                    + Create Post
                </motion.button>
            </div>
            <CreatePostModal
                isOpen={openCreatePost}
                onClose={() => setOpenCreatePost(false)}
            />
        </motion.aside>
    );
};

export default AsideBar;

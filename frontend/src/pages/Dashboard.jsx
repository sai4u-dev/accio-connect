import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import { fetchPosts } from "../features/posts/postThunks";
import { fetchUsers } from "../features/users/userThunks";

import { fadeUp, stagger } from "../utils/motion";
import { useDocumentMeta } from "../components/useDocumentMeta";

import Sidebar from "../components/Sidebar";
import PostCard from "../components/PostCard";
import RecentlyPlaced from "../components/RecentlyPlaced";
import SearchBar from "../components/SearchBar "
import UserDashboard from "../components/UserDashboard";

export default function Dashboard() {
    const dispatch = useDispatch();

    const { posts, loading } = useSelector((state) => state.posts);
    const { users } = useSelector((state) => state.users);

    const [searchTerm, setSearchTerm] = useState("");

    useDocumentMeta({
        title: "Accio Connect - A Group to Collaborate",
    });

    useEffect(() => {
        dispatch(fetchPosts());
        dispatch(fetchUsers());
    }, [dispatch]);

    if (loading) return <p className="text-center mt-10">Loading posts...</p>;

    const filteredPosts = posts.filter((post) =>
        post.caption?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.user?.firstName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const userDashboard = [
        { name: "Admin", role: "1e tenants", status: "Active", avatar: "/admin.png" },
        { name: "Blocked", role: "Blocked", status: "Inactive", avatar: "/block.png" },
    ];

    return (
        <div className="min-h-screen bg-gray-100 no-scrollbar relative dashboard">
            {/* Search */}
            <SearchBar
                isVisible={true}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />

            <div className="flex relative max-w-[1600px] mx-auto ">
                {/* Sidebar */}
                <motion.aside
                    initial={{ x: 80, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="hidden lg:block w-64 sticky top-0 h-[86vh] z-20"
                >
                    <Sidebar />
                </motion.aside>

                {/* Main Feed */}
                <div className="flex-1 px-4 py-6 h-[calc(100vh-80px)] overflow-y-auto no-scrollbar dashboard">
                    <motion.main
                        variants={stagger}
                        initial="hidden"
                        animate="visible"
                        className="max-w-3xl mx-auto grid gap-6 -mt-6"
                    >
                        {filteredPosts.map((post) => (
                            <motion.div key={post._id} variants={fadeUp}>
                                <PostCard post={post} />
                            </motion.div>
                        ))}
                    </motion.main>
                </div>

                {/* Right Panel */}
                <div className="hidden xl:flex w-72 sticky top-20 h-fit flex-col gap-6 px-4">
                    <RecentlyPlaced users={users} />
                    <UserDashboard users={userDashboard} />
                </div>
            </div>
        </div>
    );
}

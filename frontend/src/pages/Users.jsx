import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../features/users/userThunks';
import UserProfiles from '../components/UserProfiles';
import FloatingSearchButton from '../components/FloatingSearchButton';
import SearchBar from '../components/SearchBar ';
// import SearchBar from '../components/SearchBar';

const Users = () => {
    const dispatch = useDispatch();

    const { users, loading } = useSelector((state) => state.users);

    const [showSearch, setShowSearch] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    useEffect(() => {
        const handleScroll = () => {
            setShowSearch(window.scrollY < 80);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // 🔍 FILTER USERS
    const filteredUsers = users.filter((user) => {
        const search = searchTerm.toLowerCase();

        return (
            user.firstName?.toLowerCase().includes(search) ||
            user.lastName?.toLowerCase().includes(search) ||
            user.email?.toLowerCase().includes(search) ||
            user.phoneNumber?.includes(search) ||
            user.batch?.toLowerCase().includes(search)
        );
    });

    if (loading) return <p className="p-6">Loading Users...</p>;

    return (
        <div className="bg-gray-100 min-h-screen">
            <SearchBar
                isVisible={showSearch}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />

            <div className="pt-6">
                <UserProfiles users={filteredUsers} />
            </div>

            <FloatingSearchButton show={!showSearch} onClick={scrollToTop} />
        </div>
    );
};

export default Users;

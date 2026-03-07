import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../features/users/userThunks';
import UserProfiles from '../components/UserProfiles';
import FloatingSearchButton from '../components/FloatingSearchButton';
import SearchBar from '../components/SearchBar ';

const Users = () => {
    const dispatch = useDispatch();
    const { users, loading } = useSelector((state) => state.users);

    const [showSearch, setShowSearch] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    useEffect(() => {
        const handleScroll = () => setShowSearch(window.scrollY < 80);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

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

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

                .users-root {
                    font-family: 'DM Sans', sans-serif;
                    min-height: 100vh;
                    background: #0a0a0f;
                    position: relative;
                    overflow-x: hidden;
                }

                .bg-orb {
                    position: fixed;
                    border-radius: 50%;
                    filter: blur(90px);
                    opacity: 0.13;
                    pointer-events: none;
                    animation: drift 8s ease-in-out infinite alternate;
                    z-index: 0;
                }
                .bg-orb-1 {
                    width: 500px; height: 500px;
                    background: radial-gradient(circle, #3b82f6, transparent);
                    top: -120px; left: -120px;
                    animation-delay: 0s;
                }
                .bg-orb-2 {
                    width: 350px; height: 350px;
                    background: radial-gradient(circle, #6366f1, transparent);
                    bottom: -80px; right: -80px;
                    animation-delay: -4s;
                }
                .bg-orb-3 {
                    width: 240px; height: 240px;
                    background: radial-gradient(circle, #22d3ee, transparent);
                    top: 45%; right: 20%;
                    animation-delay: -2s;
                }

                @keyframes drift {
                    from { transform: translate(0,0) scale(1); }
                    to   { transform: translate(30px, 20px) scale(1.08); }
                }

                .users-inner {
                    position: relative;
                    z-index: 1;
                    padding-top: 24px;
                }

                /* Loading */
                .loading-screen {
                    min-height: 100vh;
                    background: #0a0a0f;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    gap: 16px;
                }
                .loading-spinner {
                    width: 36px; height: 36px;
                    border: 3px solid rgba(59,130,246,0.2);
                    border-top-color: #3b82f6;
                    border-radius: 50%;
                    animation: spin 0.8s linear infinite;
                }
                .loading-text {
                    font-family: 'Syne', sans-serif;
                    font-size: 13px;
                    color: rgba(255,255,255,0.3);
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                }
                @keyframes spin { to { transform: rotate(360deg); } }

                /* Page header */
                .page-header {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 24px 20px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                .page-title {
                    font-family: 'Syne', sans-serif;
                    font-weight: 700;
                    font-size: 28px;
                    color: #f1f5f9;
                }
                .page-count {
                    font-size: 13px;
                    color: rgba(255,255,255,0.3);
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 20px;
                    padding: 5px 14px;
                }

                /* Divider */
                .section-divider {
                    max-width: 1200px;
                    margin: 0 auto 24px;
                    padding: 0 24px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .section-divider-line {
                    flex: 1;
                    height: 1px;
                    background: rgba(255,255,255,0.07);
                }
                .section-divider-dot {
                    width: 6px; height: 6px;
                    border-radius: 50%;
                    background: #3b82f6;
                    opacity: 0.5;
                }

                /* Empty state */
                .empty-state {
                    text-align: center;
                    padding: 80px 20px;
                    color: rgba(255,255,255,0.18);
                    font-family: 'Syne', sans-serif;
                    font-size: 15px;
                    letter-spacing: 0.06em;
                }
                .empty-icon {
                    font-size: 40px;
                    margin-bottom: 16px;
                    opacity: 0.4;
                }
            `}</style>

            {loading ? (
                <div className="loading-screen">
                    <div className="bg-orb bg-orb-1" />
                    <div className="bg-orb bg-orb-2" />
                    <div className="loading-spinner" />
                    <span className="loading-text">Loading Users...</span>
                </div>
            ) : (
                <div className="users-root">
                    <div className="bg-orb bg-orb-1" />
                    <div className="bg-orb bg-orb-2" />
                    <div className="bg-orb bg-orb-3" />

                    <SearchBar
                        isVisible={showSearch}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />

                    <div className="users-inner">
                        {/* Header */}
                        <div className="page-header">
                            <h1 className="page-title">
                                <span style={{ color: "#3b82f6" }}>·</span> Members
                            </h1>
                            <span className="page-count">
                                {filteredUsers.length} {filteredUsers.length === 1 ? "user" : "users"}
                            </span>
                        </div>

                        <div className="section-divider">
                            <div className="section-divider-line" />
                            <div className="section-divider-dot" />
                            <div className="section-divider-line" />
                        </div>

                        {/* Users Grid */}
                        {filteredUsers.length === 0 ? (
                            <div className="empty-state">
                                <div className="empty-icon">🔍</div>
                                No users found
                            </div>
                        ) : (
                            <UserProfiles users={filteredUsers} />
                        )}
                    </div>

                    <FloatingSearchButton show={!showSearch} onClick={scrollToTop} />
                </div>
            )}
        </>
    );
};

export default Users;
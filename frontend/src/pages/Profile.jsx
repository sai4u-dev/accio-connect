import { useSelector, useDispatch } from "react-redux";
import { logout, updateProfile } from "../features/auth/authThunks";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Profile() {
    const { user, isAuthenticated } = useSelector((s) => s.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isModalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState({});
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [focused, setFocused] = useState("");

    useEffect(() => {
        if (!isAuthenticated) navigate("/login");
        if (user) setFormData({ ...user });
    }, [isAuthenticated, navigate, user]);

    useEffect(() => { document.title = "Profile"; }, []);

    if (!user) return null;

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "profilePicture" && files[0]) {
            setAvatarPreview(URL.createObjectURL(files[0]));
            setFormData({ ...formData, profilePictureFile: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSave = () => {
        const updateData = new FormData();
        for (let key in formData) {
            if (formData[key] !== undefined) updateData.append(key, formData[key]);
        }
        dispatch(updateProfile(updateData));
        setModalOpen(false);
    };

    const inputStyle = (name) => ({
        width: "100%",
        background: focused === name ? "rgba(59,130,246,0.07)" : "rgba(255,255,255,0.05)",
        border: focused === name ? "1px solid rgba(59,130,246,0.6)" : "1px solid rgba(255,255,255,0.1)",
        borderRadius: "12px",
        padding: "12px 16px",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "14px",
        color: "#f1f5f9",
        outline: "none",
        boxSizing: "border-box",
        transition: "all 0.2s",
        boxShadow: focused === name ? "0 0 0 3px rgba(59,130,246,0.12)" : "none",
    });

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

                .profile-root {
                    font-family: 'DM Sans', sans-serif;
                    min-height: 100vh;
                    background: #0a0a0f;
                    padding: 32px 16px;
                    display: flex;
                    justify-content: center;
                    position: relative;
                    overflow: hidden;
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
                    top: -120px; left: -120px; animation-delay: 0s;
                }
                .bg-orb-2 {
                    width: 350px; height: 350px;
                    background: radial-gradient(circle, #6366f1, transparent);
                    bottom: -80px; right: -80px; animation-delay: -4s;
                }
                .bg-orb-3 {
                    width: 240px; height: 240px;
                    background: radial-gradient(circle, #22d3ee, transparent);
                    top: 45%; right: 20%; animation-delay: -2s;
                }

                @keyframes drift {
                    from { transform: translate(0,0) scale(1); }
                    to   { transform: translate(30px, 20px) scale(1.08); }
                }

                .profile-inner {
                    position: relative;
                    z-index: 1;
                    width: 100%;
                    max-width: 1100px;
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 20px;
                }
                @media (min-width: 768px) {
                    .profile-inner { grid-template-columns: 280px 1fr; }
                }

                /* Glass card */
                .glass-card {
                    background: rgba(255,255,255,0.035);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 24px;
                    backdrop-filter: blur(24px);
                    -webkit-backdrop-filter: blur(24px);
                    box-shadow:
                        0 0 0 1px rgba(255,255,255,0.04) inset,
                        0 24px 64px rgba(0,0,0,0.5),
                        0 0 40px rgba(59,130,246,0.05);
                    padding: 28px;
                    color: #f1f5f9;
                }

                /* Avatar */
                .avatar-ring {
                    width: 100px; height: 100px;
                    border-radius: 50%;
                    border: 2.5px solid rgba(59,130,246,0.5);
                    object-fit: cover;
                    box-shadow: 0 0 0 4px rgba(59,130,246,0.1), 0 8px 24px rgba(0,0,0,0.4);
                    display: block;
                    margin: 0 auto;
                    transition: transform 0.3s;
                }
                .avatar-ring:hover { transform: scale(1.04); }

                .user-name {
                    font-family: 'Syne', sans-serif;
                    font-weight: 700;
                    font-size: 20px;
                    color: #f1f5f9;
                    text-align: center;
                    margin-top: 14px;
                }
                .user-email {
                    font-size: 13px;
                    color: rgba(255,255,255,0.38);
                    text-align: center;
                    margin-top: 4px;
                }

                .status-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    margin: 10px auto 0;
                    padding: 5px 14px;
                    border-radius: 20px;
                    font-size: 11px;
                    font-weight: 500;
                    background: rgba(34,197,94,0.12);
                    border: 1px solid rgba(34,197,94,0.25);
                    color: #4ade80;
                    letter-spacing: 0.06em;
                }
                .status-dot {
                    width: 6px; height: 6px;
                    border-radius: 50%;
                    background: #4ade80;
                    animation: pulse 2s ease-in-out infinite;
                }
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.4; }
                }

                /* Stats row */
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 8px;
                    margin-top: 20px;
                }
                .stat-box {
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 14px;
                    padding: 10px 8px;
                    text-align: center;
                }
                .stat-label {
                    font-size: 10px;
                    color: rgba(255,255,255,0.35);
                    text-transform: uppercase;
                    letter-spacing: 0.08em;
                    margin-bottom: 4px;
                }
                .stat-value {
                    font-family: 'Syne', sans-serif;
                    font-size: 13px;
                    font-weight: 600;
                    color: #f1f5f9;
                }

                /* Action buttons */
                .btn-edit {
                    width: 100%;
                    padding: 12px;
                    background: linear-gradient(135deg, #3b82f6, #6366f1);
                    border: none;
                    border-radius: 12px;
                    color: #fff;
                    font-family: 'Syne', sans-serif;
                    font-weight: 600;
                    font-size: 14px;
                    cursor: pointer;
                    transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
                    box-shadow: 0 4px 20px rgba(59,130,246,0.28);
                    margin-top: 20px;
                }
                .btn-edit:hover {
                    opacity: 0.92; transform: translateY(-1px);
                    box-shadow: 0 8px 28px rgba(59,130,246,0.38);
                }
                .btn-edit:active { transform: translateY(0); }

                .btn-logout {
                    width: 100%;
                    padding: 12px;
                    background: rgba(239,68,68,0.1);
                    border: 1px solid rgba(239,68,68,0.25);
                    border-radius: 12px;
                    color: #f87171;
                    font-family: 'Syne', sans-serif;
                    font-weight: 600;
                    font-size: 14px;
                    cursor: pointer;
                    transition: background 0.2s, border-color 0.2s;
                    margin-top: 10px;
                }
                .btn-logout:hover {
                    background: rgba(239,68,68,0.18);
                    border-color: rgba(239,68,68,0.4);
                }

                /* Section heading */
                .section-heading {
                    font-family: 'Syne', sans-serif;
                    font-weight: 700;
                    font-size: 13px;
                    letter-spacing: 0.14em;
                    text-transform: uppercase;
                    color: rgba(59,130,246,0.7);
                    margin-bottom: 16px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .section-heading::after {
                    content: '';
                    flex: 1; height: 1px;
                    background: rgba(59,130,246,0.15);
                }

                /* Info grid */
                .info-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 12px;
                    margin-bottom: 28px;
                }
                @media (max-width: 500px) { .info-grid { grid-template-columns: 1fr; } }

                .info-box {
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 14px;
                    padding: 14px 16px;
                }
                .info-label {
                    font-size: 10px;
                    color: rgba(255,255,255,0.3);
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    margin-bottom: 5px;
                }
                .info-value {
                    font-size: 14px;
                    font-weight: 500;
                    color: #f1f5f9;
                }

                /* Table */
                .sessions-table {
                    width: 100%;
                    border-collapse: collapse;
                    font-size: 13px;
                }
                .sessions-table th {
                    font-family: 'Syne', sans-serif;
                    font-size: 10px;
                    font-weight: 700;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    color: rgba(255,255,255,0.3);
                    padding: 10px 14px;
                    text-align: left;
                    background: rgba(255,255,255,0.03);
                    border-bottom: 1px solid rgba(255,255,255,0.07);
                }
                .sessions-table td {
                    padding: 11px 14px;
                    color: rgba(255,255,255,0.6);
                    border-bottom: 1px solid rgba(255,255,255,0.04);
                    transition: background 0.15s;
                }
                .sessions-table tr:hover td {
                    background: rgba(255,255,255,0.03);
                }
                .sessions-table tr:last-child td { border-bottom: none; }
                .active-session {
                    display: inline-flex; align-items: center; gap: 5px;
                    color: #4ade80;
                    font-size: 12px;
                }
                .active-dot {
                    width: 5px; height: 5px;
                    border-radius: 50%;
                    background: #4ade80;
                    animation: pulse 2s ease-in-out infinite;
                }
                .empty-sessions {
                    text-align: center;
                    padding: 24px;
                    color: rgba(255,255,255,0.2);
                    font-size: 13px;
                    letter-spacing: 0.05em;
                }

                /* Modal */
                .modal-overlay {
                    position: fixed; inset: 0;
                    background: rgba(0,0,0,0.75);
                    backdrop-filter: blur(6px);
                    -webkit-backdrop-filter: blur(6px);
                    display: flex; align-items: center; justify-content: center;
                    z-index: 50;
                }
                .modal-card {
                    position: relative;
                    width: 100%; max-width: 460px;
                    margin: 16px;
                    background: rgba(15,15,25,0.95);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 28px;
                    padding: 36px 36px 28px;
                    backdrop-filter: blur(24px);
                    -webkit-backdrop-filter: blur(24px);
                    box-shadow:
                        0 0 0 1px rgba(255,255,255,0.04) inset,
                        0 32px 80px rgba(0,0,0,0.7),
                        0 0 60px rgba(59,130,246,0.06);
                }
                .modal-heading {
                    font-family: 'Syne', sans-serif;
                    font-weight: 700;
                    font-size: 22px;
                    color: #f1f5f9;
                    margin-bottom: 6px;
                }
                .modal-sub {
                    font-size: 13px;
                    color: rgba(255,255,255,0.35);
                    margin-bottom: 24px;
                }
                .close-btn {
                    position: absolute; top: 20px; right: 20px;
                    width: 32px; height: 32px;
                    background: rgba(255,255,255,0.06);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 8px;
                    display: flex; align-items: center; justify-content: center;
                    cursor: pointer; transition: background 0.2s;
                    color: rgba(255,255,255,0.5);
                }
                .close-btn:hover { background: rgba(255,255,255,0.12); color: #f1f5f9; }

                .field-label {
                    display: block;
                    font-size: 11px; font-weight: 500;
                    letter-spacing: 0.1em; text-transform: uppercase;
                    color: rgba(255,255,255,0.4);
                    margin-bottom: 8px;
                }

                .avatar-upload-area {
                    display: flex; flex-direction: column; align-items: center;
                    margin-bottom: 20px;
                }
                .avatar-upload-ring {
                    width: 80px; height: 80px;
                    border-radius: 50%;
                    border: 2px solid rgba(59,130,246,0.4);
                    object-fit: cover;
                    box-shadow: 0 0 0 3px rgba(59,130,246,0.1);
                    margin-bottom: 10px;
                }
                .file-upload-btn {
                    position: relative;
                    padding: 7px 16px;
                    border-radius: 8px;
                    border: 1px solid rgba(255,255,255,0.1);
                    background: rgba(255,255,255,0.05);
                    color: rgba(255,255,255,0.5);
                    font-size: 12px;
                    cursor: pointer;
                    transition: all 0.2s;
                    font-family: 'DM Sans', sans-serif;
                    overflow: hidden;
                }
                .file-upload-btn:hover {
                    background: rgba(255,255,255,0.09);
                    color: rgba(255,255,255,0.8);
                }
                .file-upload-btn input[type="file"] {
                    position: absolute; inset: 0; opacity: 0; cursor: pointer;
                }

                .btn-cancel {
                    padding: 11px 20px; border-radius: 12px;
                    border: 1px solid rgba(255,255,255,0.1);
                    background: rgba(255,255,255,0.05);
                    color: rgba(255,255,255,0.5);
                    font-family: 'DM Sans', sans-serif; font-size: 14px;
                    cursor: pointer; transition: all 0.2s;
                }
                .btn-cancel:hover { background: rgba(255,255,255,0.09); color: rgba(255,255,255,0.8); }

                .btn-save {
                    padding: 11px 28px; border-radius: 12px; border: none;
                    background: linear-gradient(135deg, #3b82f6, #6366f1);
                    color: #fff;
                    font-family: 'Syne', sans-serif; font-weight: 600; font-size: 14px;
                    cursor: pointer;
                    transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
                    box-shadow: 0 4px 20px rgba(59,130,246,0.3);
                }
                .btn-save:hover { opacity: 0.92; transform: translateY(-1px); box-shadow: 0 8px 28px rgba(59,130,246,0.4); }
                .btn-save:active { transform: translateY(0); }
            `}</style>

            <div className="profile-root">
                <div className="bg-orb bg-orb-1" />
                <div className="bg-orb bg-orb-2" />
                <div className="bg-orb bg-orb-3" />

                <motion.div
                    className="profile-inner"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{ position: "relative", zIndex: 1 }}
                >
                    {/* ── LEFT: Profile Card ── */}
                    <div className="glass-card" style={{ height: "fit-content" }}>
                        <img
                            src={avatarPreview || user.profilePicture || "/default-avatar.png"}
                            alt="profile"
                            className="avatar-ring"
                        />
                        <div className="user-name">{user.firstName} {user.lastName}</div>
                        <div className="user-email">{user.email}</div>

                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <span className="status-badge">
                                <span className="status-dot" /> Active Account
                            </span>
                        </div>

                        <div className="stats-grid">
                            <Stat label="Batch" value={user.batch} />
                            <Stat label="Course" value={user.courseType} />
                            <Stat label="Location" value={user.location} />
                        </div>

                        <button className="btn-edit" onClick={() => setModalOpen(true)}>
                            Edit Profile
                        </button>
                        <button className="btn-logout" onClick={() => dispatch(logout())}>
                            Logout
                        </button>
                    </div>

                    {/* ── RIGHT: Details + Sessions ── */}
                    <div className="glass-card">
                        <div className="section-heading">Account Details</div>
                        <div className="info-grid">
                            <Info label="Phone Number" value={user.phoneNumber} />
                            <Info label="Email" value={user.email} />
                            <Info label="Batch" value={user.batch} />
                            <Info label="Course Type" value={user.courseType} />
                            <Info label="Location" value={user.location} />
                        </div>

                        <div className="section-heading">Session History</div>
                        <div style={{ overflowX: "auto", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.07)" }}>
                            <table className="sessions-table">
                                <thead>
                                    <tr>
                                        <th>Login</th>
                                        <th>Logout</th>
                                        <th>Device</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {user.sessions?.length ? user.sessions.map((s, i) => (
                                        <tr key={i}>
                                            <td>{new Date(s.login).toLocaleString()}</td>
                                            <td>
                                                {s.logout
                                                    ? new Date(s.logout).toLocaleString()
                                                    : <span className="active-session"><span className="active-dot" />Active</span>
                                                }
                                            </td>
                                            <td>{s.device || "Unknown"}</td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={3}>
                                                <div className="empty-sessions">No sessions yet</div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* ── Edit Profile Modal ── */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={(e) => e.target === e.currentTarget && setModalOpen(false)}
                    >
                        <motion.div
                            className="modal-card"
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <button className="close-btn" onClick={() => setModalOpen(false)}>
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                </svg>
                            </button>

                            <h3 className="modal-heading">Edit Profile</h3>
                            <p className="modal-sub">Update your personal information</p>

                            {/* Avatar */}
                            <div className="avatar-upload-area">
                                <img
                                    src={avatarPreview || user.profilePicture || "/default-avatar.png"}
                                    alt="avatar"
                                    className="avatar-upload-ring"
                                />
                                <div className="file-upload-btn">
                                    Change Photo
                                    <input type="file" name="profilePicture" accept="image/*" onChange={handleChange} />
                                </div>
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                                <div>
                                    <label className="field-label">First Name</label>
                                    <input
                                        type="text" name="firstName"
                                        placeholder="First Name"
                                        value={formData.firstName || ""}
                                        onChange={handleChange}
                                        onFocus={() => setFocused("firstName")}
                                        onBlur={() => setFocused("")}
                                        style={inputStyle("firstName")}
                                    />
                                </div>
                                <div>
                                    <label className="field-label">Last Name</label>
                                    <input
                                        type="text" name="lastName"
                                        placeholder="Last Name"
                                        value={formData.lastName || ""}
                                        onChange={handleChange}
                                        onFocus={() => setFocused("lastName")}
                                        onBlur={() => setFocused("")}
                                        style={inputStyle("lastName")}
                                    />
                                </div>
                                <div>
                                    <label className="field-label">Phone Number</label>
                                    <input
                                        type="text" name="phoneNumber"
                                        placeholder="Phone Number"
                                        value={formData.phoneNumber || ""}
                                        onChange={handleChange}
                                        onFocus={() => setFocused("phoneNumber")}
                                        onBlur={() => setFocused("")}
                                        style={inputStyle("phoneNumber")}
                                    />
                                </div>
                                <div>
                                    <label className="field-label">Location</label>
                                    <input
                                        type="text" name="location"
                                        placeholder="Location"
                                        value={formData.location || ""}
                                        onChange={handleChange}
                                        onFocus={() => setFocused("location")}
                                        onBlur={() => setFocused("")}
                                        style={inputStyle("location")}
                                    />
                                </div>

                                <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", paddingTop: "8px" }}>
                                    <button className="btn-cancel" onClick={() => setModalOpen(false)}>Cancel</button>
                                    <button className="btn-save" onClick={handleSave}>Save Changes</button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

/* Sub-components */
function Stat({ label, value }) {
    return (
        <div className="stat-box">
            <div className="stat-label">{label}</div>
            <div className="stat-value">{value || "—"}</div>
        </div>
    );
}

function Info({ label, value }) {
    return (
        <div className="info-box">
            <div className="info-label">{label}</div>
            <div className="info-value">{value || "—"}</div>
        </div>
    );
}
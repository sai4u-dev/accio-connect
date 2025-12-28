import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // 🔐 Check if already logged in
    useEffect(() => {
        const checkAuth = async () => {
            try {
                await axios.get("http://localhost:8000/api/auth/me", {
                    withCredentials: true,
                });

                // If request succeeds → user is logged in
                navigate("/profile");
            } catch (err) {
                // Not logged in → stay on sign in page
                console.log(err)
            }
        };

        checkAuth();
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                "http://localhost:8000/api/auth/signin",
                { email, password },
                { withCredentials: true }
            );

            navigate("/profile");
        } catch (err) {
            alert(err.response?.data?.message || "SignIn failed");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    className="w-full border px-3 py-2 rounded mb-4"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    className="w-full border px-3 py-2 rounded mb-6"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="w-full bg-blue-600 text-white py-2 rounded">
                    Sign In
                </button>
            </form>
        </div>
    );
};

export default SignIn;

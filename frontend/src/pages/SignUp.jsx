// src/pages/SignUp.jsx
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("")
    const [image_Url, setImageUrl] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        const body = {
            firstName,
            lastName,
            email,
            password,
            phoneNumber,
            profilePicture: image_Url,
            batch: "OBH_1",
            location: "hyderabad",
            courseType: "mern",
        }

        try {
            const user = await axios.post(
                "http://localhost:8000/api/auth/signup",
                body,
                { withCredentials: true }
            );
            console.log(user);
            alert("Sign Up Suceess")
            navigate("/signin");
        } catch (err) {
            alert(err.response?.data?.message || "Signup failed");
        }

    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 mtdr">

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-md w-120 border border-gray-300">
                <h1 className="text-center text-bold text-3xl mb-4">Accio Connect</h1>
                <hr className="text-gray-300" />
                <h2 className="text-2xl  font-medium mb-2 mt-3 text-center">Sign Up</h2>
                <p className="text-center text-gray-400 pb-4">
                    Only Accciojob users can signup and use Accio Connect
                </p>

                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    className="w-full border px-3 py-2 rounded mb-4 border-gray-300"
                    onChange={(e) => setFirstName(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    className="w-full border px-3 py-2 rounded mb-4 border-gray-300"
                    onChange={(e) => setLastName(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="http://www.image.com  "
                    value={image_Url}
                    className="w-full border px-3 py-2 rounded mb-4 border-gray-300"
                    onChange={(e) => setImageUrl(e.target.value)}
                />


                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    className="w-full border px-3 py-2 rounded mb-4 border-gray-300"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    show-password
                    className="w-full border px-3 py-2 rounded mb-6 border-gray-300"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <input
                    type="tel"
                    placeholder="phone Number"
                    value={phoneNumber}
                    className="w-full border px-3 py-2 rounded mb-6 border-gray-300"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />


                <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default SignUp;

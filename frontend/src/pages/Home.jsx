import React from "react";
import {
    FaReact,
    FaNodeJs,
    FaAws,
    FaPython,
    FaDocker,
} from "react-icons/fa";
import { SiMongodb, SiPostgresql, SiOpenai } from "react-icons/si";
import { useNavigate } from "react-router-dom";

const techIcons = [
    { icon: <FaReact />, size: "w-12 h-12", pos: "top-6 left-1/2" },
    { icon: <FaNodeJs />, size: "w-11 h-11", pos: "top-3/4 left-1/2" },
    { icon: <SiMongodb />, size: "w-10 h-10", pos: "bottom-1/4 right-20" },
    { icon: <FaAws />, size: "w-12 h-12", pos: "bottom-10 left-1/3" },
    { icon: <SiOpenai />, size: "w-11 h-11", pos: "top-1/3 left-1/4" },
    { icon: <FaPython />, size: "w-10 h-10", pos: "bottom-1/3 left-16" },
    { icon: <FaDocker />, size: "w-10 h-10", pos: "top-16 right-1/3" },
    { icon: <SiPostgresql />, size: "w-10 h-10", pos: "bottom-16 right-1/3" },
];




function HeroMarketingTalent() {

    const navigate = useNavigate();

    function navigatetoLogin() {
        navigate("/signin")
    }


    function navigatetoSignUp() {
        navigate("signup")
    }

    return (
        <section className="min-h-screen bg-hero flex items-center justify-center  bg-blue-600  hero px-8">
            <div className="relative w-full rounded-[28px] bg-glass backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden">
                {/* Navbar */}
                <nav className="flex items-center justify-between px-8 py-6 text-white">
                    <div className="font-bold text-lg tracking-wide">Accio Connect</div>
                    <ul className="hidden md:flex gap-8 text-sm text-white/80">
                        <li className="hover:text-white cursor-pointer">Your Team</li>
                        <li className="hover:text-white cursor-pointer">Solutions</li>
                        <li className="hover:text-white cursor-pointer">About</li>
                    </ul>
                    <div className="flex items-center gap-4">
                        <button className="text-sm text-white/80 hover:text-white" onClick={navigatetoLogin}>
                            Log in
                        </button>
                        <button className="px-5 py-2 rounded-full bg-black text-white text-sm shadow-lg" onClick={navigatetoSignUp}>
                            Join Now
                        </button>
                    </div>
                </nav>

                {/* Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 px-8 pb-16 pt-8">
                    {/* Left */}
                    <div className="flex flex-col justify-center text-white">
                        <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight">
                            Unlock Top <br />
                            Community Talent <br />
                            You Thought Was <br />
                            Out of Reach — <br />
                            <span className="text-white/90">
                                Now Just One <br /> Click Away!
                            </span>
                        </h1>

                        <button className="mt-8 w-fit px-6 py-3 rounded-full bg-black hover:bg-black/80 transition text-sm font-medium">
                            Start Posting →
                        </button>
                    </div>

                    {/* Right Orbit Section */}
                    <div className="relative flex items-center justify-center min-h-105">
                        {/* Orbits */}
                        <div className="absolute w-90 h-90 rounded-full border border-white/10" />
                        <div className="absolute w-65 h-65 rounded-full border border-white/10" />
                        <div className="absolute w-40 h-40 rounded-full border border-white/10" />

                        {/* Center */}
                        <div className="absolute text-center text-white">
                            <div className="text-4xl font-bold">20k+</div>
                            <div className="text-sm text-white/70">Specialists</div>
                        </div>

                        {/* Tech Icons */}
                        {techIcons.map((item, i) => (
                            <div
                                key={i}
                                className={`absolute ${item.pos} ${item.size} rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white shadow-xl`}
                            >
                                {item.icon}
                            </div>
                        ))}
                    </div>
                </div>


            </div>
        </section>
    );
}



export default function Home() {
    return (
        <>
            <HeroMarketingTalent />
        </>
    );
}

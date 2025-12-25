import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import Profile from "../pages/Profile";
import SignUp from "../pages/SignUp";
import Feed from "../pages/Feed";

const AppRoutes = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signup" element={<SignUp />} />
        </Routes>
    </BrowserRouter>
)


export default AppRoutes
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import Profile from "../pages/Profile";
import SignUp from "../pages/SignUp";
import Feed from "../pages/Feed";
import PostDetails from "../pages/PostDetails";

const AppRoutes = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/createpost" element={<Feed />} />
            <Route path="/posts/:postId" element={<PostDetails />} />
        </Routes>
    </BrowserRouter>
)


export default AppRoutes
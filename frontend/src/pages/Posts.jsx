import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPosts } from "../services/post.service";

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getAllPosts();
                setPosts(data);
            } catch (err) {
                console.error("Error fetching posts:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) return <p>Loading posts...</p>;

    return (
        <div>
            <h2>All Posts</h2>

            {posts.length === 0 ? (
                <p>No posts available</p>
            ) : (
                posts.map((post) => (
                    <div
                        key={post._id}
                        className="post-card"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate(`/posts/${post._id}`)} // ✅ navigate
                    >
                        <h4>{post.user?.userName}</h4>
                        <p>{post.caption}</p>

                        {post.contentType === "image" && (
                            <img
                                src={post.content}
                                alt="post"
                                style={{ width: "100%", maxWidth: "400px" }}
                            />
                        )}

                        <div>
                            <span>👍 {post.likes?.length || 0}</span>
                            <span> 💬 {post.comments?.length || 0}</span>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Posts;

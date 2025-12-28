import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../services/post.service";

const PostDetails = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await getPost(postId);
                setPost(res.data.data); // depends on your res.success format
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [postId]);

    if (loading) return <p>Loading post...</p>;
    if (!post) return <p>Post not found</p>;

    return (
        <div>
            <h3>{post.user?.userName}</h3>
            <p>{post.caption}</p>

            {post.contentType === "image" && (
                <img src={post.content} alt="post" style={{ maxWidth: "500px" }} />
            )}

            <div>
                <span>👍 {post.likes?.length || 0}</span>
                <span> 💬 {post.comments?.length || 0}</span>
            </div>
        </div>
    );
};

export default PostDetails;

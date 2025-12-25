import { useState } from "react";
import { createPost } from "../services/post.service";

const CreatePost = ({ onClose, onPostCreated }) => {
    const [type, setType] = useState("image");
    const [contentType, setContentType] = useState("image");
    const [content, setContent] = useState("");
    const [caption, setCaption] = useState("");
    const [isLikeDisable, setIsLikeDisable] = useState(false);
    const [isCommentDisable, setIsCommentDisable] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleCreatePost = async () => {
        if (!contentType || !content || !type) {
            alert("Required fields missing");
            return;
        }

        setLoading(true);
        try {
            await createPost({
                contentType,
                content,
                caption,
                type,
                isLikeDisable,
                isCommentDisable,
            });

            onPostCreated?.();
            onClose();
        } catch (err) {
            console.error(err);
            alert("Failed to create post");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-[#1e1e1e] text-white w-[520px] rounded-xl p-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Create Post</h2>
                    <button onClick={onClose}>✕</button>
                </div>

                {/* Post Type */}
                <div className="flex gap-2 mb-4">
                    {["image", "blog", "referral"].map((item) => (
                        <button
                            key={item}
                            onClick={() => {
                                setType(item);
                                setContentType(item);
                            }}
                            className={`px-3 py-1 rounded ${type === item ? "bg-blue-600" : "bg-gray-700"
                                }`}
                        >
                            {item.toUpperCase()}
                        </button>
                    ))}
                </div>

                {/* Caption */}
                <textarea
                    placeholder="Write something..."
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    className="w-full bg-transparent border border-gray-600 rounded-md p-2 mb-3"
                />

                {/* Content */}
                <input
                    type="text"
                    placeholder="Paste content URL / text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full bg-transparent border border-gray-600 rounded-md p-2 mb-4"
                />

                {/* Toggles */}
                <div className="space-y-2 text-sm mb-4">
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={isCommentDisable}
                            onChange={() => setIsCommentDisable(!isCommentDisable)}
                        />
                        Disable comments
                    </label>

                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={isLikeDisable}
                            onChange={() => setIsLikeDisable(!isLikeDisable)}
                        />
                        Disable likes
                    </label>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-600 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleCreatePost}
                        disabled={loading}
                        className="px-4 py-2 bg-blue-600 rounded"
                    >
                        {loading ? "Posting..." : "Post"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;

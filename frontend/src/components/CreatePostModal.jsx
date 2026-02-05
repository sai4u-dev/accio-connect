import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../features/posts/postThunks";

export default function CreatePostModal({ isOpen, onClose }) {
    const dispatch = useDispatch();

    const [contentType, setContentType] = useState("text");
    const [content, setContent] = useState("");
    const [file, setFile] = useState(null);
    const [caption, setCaption] = useState("");
    const [isLikeDisable, setIsLikeDisable] = useState(false);
    const [isCommentDisable, setIsCommentDisable] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (contentType === "text" && !content.trim()) return;
        if ((contentType === "image" || contentType === "video") && !content && !file) return;

        dispatch(
            createPost({
                contentType,
                content: file || content, // backend should handle file / url
                caption,
                type: "post",
                isLikeDisable,
                isCommentDisable,
            })
        );

        resetForm();
        onClose();
    };

    const resetForm = () => {
        setContent("");
        setFile(null);
        setCaption("");
        setIsLikeDisable(false);
        setIsCommentDisable(false);
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-lg rounded-xl shadow-xl p-6">
                <h2 className="text-xl font-semibold mb-4">Create Post</h2>

                {/* Content Type Selector */}
                <div className="flex gap-2 mb-4">
                    {["text", "image", "video"].map((type) => (
                        <button
                            key={type}
                            type="button"
                            onClick={() => {
                                setContentType(type);
                                setContent("");
                                setFile(null);
                            }}
                            className={`flex-1 py-2 rounded-lg border text-sm font-medium
                                ${contentType === type
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-100 hover:bg-gray-200"
                                }`}
                        >
                            {type.toUpperCase()}
                        </button>
                    ))}
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* TEXT */}
                    {contentType === "text" && (
                        <textarea
                            className="w-full border rounded-lg p-3 resize-none"
                            rows="4"
                            placeholder="What's on your mind?"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    )}

                    {/* IMAGE */}
                    {contentType === "image" && (
                        <div className="space-y-3">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setFile(e.target.files[0])}
                                className="w-full"
                            />
                            <div className="text-center text-sm text-gray-500">OR</div>
                            <input
                                type="url"
                                placeholder="Paste image URL"
                                className="w-full border rounded p-2"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />

                            {(file || content) && (
                                <img
                                    src={file ? URL.createObjectURL(file) : content}
                                    alt="preview"
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                            )}
                        </div>
                    )}

                    {/* VIDEO */}
                    {contentType === "video" && (
                        <div className="space-y-3">
                            <input
                                type="file"
                                accept="video/*"
                                onChange={(e) => setFile(e.target.files[0])}
                                className="w-full"
                            />
                            <div className="text-center text-sm text-gray-500">OR</div>
                            <input
                                type="url"
                                placeholder="Paste video URL"
                                className="w-full border rounded p-2"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />

                            {(file || content) && (
                                <video
                                    controls
                                    className="w-full h-48 rounded-lg"
                                    src={file ? URL.createObjectURL(file) : content}
                                />
                            )}
                        </div>
                    )}

                    {/* Caption */}
                    <input
                        className="w-full border rounded p-2"
                        placeholder="Caption (optional)"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                    />

                    {/* Options */}
                    <div className="flex gap-6 text-sm">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={isLikeDisable}
                                onChange={(e) => setIsLikeDisable(e.target.checked)}
                            />
                            Disable Likes
                        </label>

                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={isCommentDisable}
                                onChange={(e) => setIsCommentDisable(e.target.checked)}
                            />
                            Disable Comments
                        </label>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-5 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                            Post
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

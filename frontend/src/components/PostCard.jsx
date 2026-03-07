import { useState } from "react";
import { useDispatch } from "react-redux";
import { FaHeart, FaComment } from "react-icons/fa";
import { toggleLike, addComment } from "../features/posts/postThunks";
import { timeAgo } from "../utils/timeAgo";
import { HoverPopover } from "./HoverPopover";


/* ---------------- Pill Button ---------------- */
function Pill({ icon, count, onClick }) {
    return (
        <button
            onClick={onClick}
            className="  flex items-center gap-1 bg-gray-200 px-7 py-3 rounded-full hover:bg-blue-300 transition"
        >
            {icon}
            <span className=" text-sm">{count}</span>
        </button>
    );
}

export default function PostCard({ post }) {
    const dispatch = useDispatch();
    const [comment, setComment] = useState("");

    const handleLike = () => dispatch(toggleLike(post._id));

    const handleComment = (e) => {
        e.preventDefault();
        if (!comment.trim()) return;
        dispatch(addComment({ postId: post._id, comment }));
        setComment("");
    };

    return (
        <div className="bg-white rounded-2xl shadow-md p-4  border border-gray-200 ">

            {/* Header */}
            <div className="flex items-center gap-3 mb-3">
                <img
                    src={post.user.profilePicture}
                    alt={post.user.firstName}
                    className="w-10 h-10 rounded-full object-cover border"
                />
                <div>
                    <p className="text-sm font-extralight text-gray-500 ">{post.user.firstName}</p>
                    <p className="text-sm text-gray-500 mt-0.5">{timeAgo(post.createdAt)}</p>
                </div>
            </div>

            {/* Caption */}
            <p className="mb-3 text-sm font-light text-gray-500">{post.caption}</p>

            {/* Media */}
            <div className="relative overflow-hidden" >
                {post.contentType === "image" && (
                    <img
                        src={post.content}
                        alt=""
                        className="rounded-lg mb-3 max-h-96 w-full object-cover"
                    />
                )}

                {post.contentType === "video" && (
                    <video
                        src={post.content}
                        controls
                        className="rounded-lg mb-3 w-full "
                    />
                )}
            </div>

            {/* Actions */}
            <div className="flex  items-center justify-center gap-2 ">
                {/* 👍 Likes */}
                <HoverPopover
                    trigger={
                        <Pill
                            icon={<FaHeart className="text-black text-sm" />}
                            count={post.likes.length}
                            onClick={handleLike}
                        />
                    }
                >
                    {post.likes.length ? (
                        <ul className="space-y-2 no-scrollbar" >
                            {post.likes.map((like, i) => (
                                <li key={i} className="flex items-center gap-2">
                                    <img
                                        src={like.profilePic}
                                        className="w-7 h-7 rounded-full"
                                        alt=""
                                    />
                                    <span className="text-sm text-black">{like.userName}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-gray-400">No likes yet</p>
                    )}
                </HoverPopover>

                {/* 💬 Comments */}
                <HoverPopover
                    trigger={
                        <Pill
                            icon={<FaComment className="text-black text-sm" />}
                            count={post.comments.length}
                        />
                    }
                >
                    {post.comments.length ? (
                        <ul className="space-y-3 max-h-48 overflow-y-auto no-scrollbar">
                            {post.comments.map((c, i) => (
                                <li key={i} className="flex gap-2">
                                    <img
                                        src={c.profilePic}
                                        className="h-10 w-10 rounded-full"
                                        alt=""
                                    />
                                    <div>
                                        <p className="text-sm font-semibold">{c.userName}</p>
                                        <p className="text-sm text-gray-900">{c.comment}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-gray-400">No comments yet</p>
                    )}
                </HoverPopover>

                {/* Add Comment */}
                {!post.isCommentDisable && (
                    <form onSubmit={handleComment} className="flex gap-2 w-[80%]  ">
                        <input
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Add a comment..."
                            className="flex-1 border rounded-lg px-3 py-3 border-gray-200"
                        />
                        <button className="bg-blue-600 text-white px-6 rounded-lg">
                            Post
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

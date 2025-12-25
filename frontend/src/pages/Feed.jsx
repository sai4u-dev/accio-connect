import { useState } from "react";
import CreatePostModal from "./CreatePost";

const Feed = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Create Post
            </button>

            {open && (
                <CreatePostModal
                    onClose={() => setOpen(false)}
                    onPostCreated={() => console.log("refresh feed")}
                />
            )}
        </>
    );
};

export default Feed;

const PostSkeleton = () => {
    return (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
            {/* Header */}
            <div className="flex items-center gap-3 p-4">
                <div className="w-11 h-11 rounded-full bg-sky-200" />
                <div className="h-4 w-32 rounded bg-sky-200" />
            </div>

            {/* Image */}
            <div className="w-full h-64 bg-sky-200" />

            {/* Content */}
            <div className="p-4 space-y-2">
                <div className="h-4 w-full rounded bg-sky-200" />
                <div className="h-4 w-3/4 rounded bg-sky-200" />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between px-4 pb-5">
                <div className="h-9 w-20 rounded-full bg-sky-200" />
                <div className="h-9 w-20 rounded-full bg-sky-200" />
                <div className="h-9 w-24 rounded-full bg-sky-300" />
            </div>
        </div>
    );
};

export default PostSkeleton;

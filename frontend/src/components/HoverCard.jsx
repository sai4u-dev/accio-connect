function HoverCard({ children, content }) {
    return (
        <div className="relative group inline-block">
            {children}

            <div className="absolute z-50 hidden group-hover:block bg-white border border-gray-200 rounded-lg shadow-lg p-3 min-w-[200px] top-full mt-2">
                {content}
            </div>
        </div>
    );
}

export default HoverCard
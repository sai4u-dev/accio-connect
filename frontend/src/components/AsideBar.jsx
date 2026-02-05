import React from 'react'
import Feed from '../pages/Feed'

const AsideBar = () => {
    return (
        <aside className="w-64 bg-white border-r p-6 space-y-6 h-screen top-0 sticky ">
            <h1 className="text-2xl font-bold text-blue-600">Accio Connect</h1>
            <nav className="space-y-4 text-gray-700">
                <p className="font-medium">Home</p>
                <p className="font-medium">Referral Posts</p>
                <p className="font-medium">Connections</p>
            </nav>
        </aside>
    )
}

export default AsideBar
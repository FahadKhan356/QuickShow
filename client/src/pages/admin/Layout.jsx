import React from 'react'
import AdminNavbar from '../../components/admin/AdminNavbar'
import AdminSideBar from '../../components/admin/AdminSideBar'
import { Outlet, Link } from 'react-router-dom'
import { useUser, useClerk } from '@clerk/clerk-react'

const Layout = () => {
    const { user } = useUser()
    const { openSignIn } = useClerk()

    // If the user is not signed in, show a login screen instead of the empty admin panel
    if (!user) {
        return (
            <div className='flex flex-col items-center justify-center h-screen bg-[#09090B] text-white px-6'>
                <h1 className='text-2xl font-semibold'>Admin Panel</h1>
                <p className='text-gray-400 mt-2'>Please sign in with an admin account (role: admin).</p>
                <button onClick={() => openSignIn()} className='mt-6 px-10 py-3 rounded-md bg-primary hover:bg-primary-dull font-medium cursor-pointer'>
                    Login
                </button>
                <Link to='/' className='mt-4 text-sm underline text-gray-400'>Back to Home</Link>
            </div>
        )
    }

    return (
        <>  
            {/* Top navbar stays fixed at top */}
            <AdminNavbar />

            {/* Main layout with sidebar and page content */}
            <div className='flex '>
                {/* Sidebar */}
                <AdminSideBar />

                {/* Page content */}
                <div className='flex-1 px-5 py-10 md:px-10 overflow-y-auto'>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default Layout
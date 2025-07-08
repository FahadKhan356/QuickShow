import React from 'react'
import AdminNavbar from '../../components/admin/AdminNavbar'
import AdminSideBar from '../../components/admin/AdminSideBar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
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

export default Layout;
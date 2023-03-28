import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../sidebar/SideBar'
import './layout.css'

const Layout = () => {
  return (
    <div className='container'>
      <SideBar />
      <Outlet />
    </div>
  )
}

export default Layout
import React from 'react'
import './SideBar.css'
import { MdPlaylistAdd } from "react-icons/md";
import { LuLayoutList } from "react-icons/lu";
import { CiBoxes } from "react-icons/ci";
import { TbCategoryPlus } from "react-icons/tb";
import { Link, NavLink } from 'react-router-dom';


const SideBar = () => {
  return (
    <div className='SideBar'>
      <div className="sidebar-options">
        <Link to="/admin/dashboard/listItems" className="option">
        <LuLayoutList size={22}/>
        <p>List items</p>
        </Link>
        <Link to="/admin/dashboard/categories"className="option">
        <TbCategoryPlus size={25}/>
        <p>List categories</p>
        </Link>
        <Link to="/admin/dashboard/AllOrders"className="option">
        <CiBoxes size={30}/>
        <p>Orders</p>
        </Link>
      </div>
    </div>
  )
}

export default SideBar

import React from 'react'
import './Dashboard.css'
import SideBar from '../../Admin/SideBar/SideBar'
import { Route , Routes ,Navigate } from 'react-router-dom'
import ListItems from '../ListItems/ListItems'
import Categories from '../Categories/Categories'
import AllOrders from '../AllOrders/AllOrders'
import Footer from '../../components/Footer/Footer'

const Dashboard = () => {
  return (
    <div className='dashboard-wrapper'>
      <div className='dashboard-container'>
        <SideBar />
        <div className='dashboard-content'>
          <Routes>
            <Route path="/" element={<Navigate to="listItems" />} />
            <Route path='listItems' element={<ListItems />} />
            <Route path='categories' element={<Categories />} />
            <Route path='AllOrders' element={<AllOrders />} />
          </Routes>
        </div>
      </div>
   
    </div>
  )
}

export default Dashboard;

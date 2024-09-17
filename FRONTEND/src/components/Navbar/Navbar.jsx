
import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MdDashboard } from "react-icons/md";

import Header from '../Header/Header';


const Navbar = ({ setShowLogin }) => {
 
  const { token , setToken , menu, setMenu ,getTotalCart,setCartItems , userId,setUserId,role,setRole} = useContext(StoreContext); 
  const navigate = useNavigate();
  const location = useLocation()

 
  const [DropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!DropdownOpen);
  };

  // const handleCart = () => { 
  //   if (!token) {
  //     setShowLogin(true); 
  //   }
  // };
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    setToken(null);
    setUserId(null);
    setRole(null)
    setCartItems({});
    navigate('/'); 
  };
  return (
    <div className='navbar'>
      
      <Link to='/'>
      <img src={assets.DishDash} alt="Logo" className="logo" /></Link>
      {location.pathname === '/' && <>
      <ul className="navbar-menu">
        <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
        <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
       
      </ul>
      </>
      }
      <div className="navbar-right">
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign in</button>
        ) : (
          <>
          <div className="navbar-search-icon">
            {role === "client" && (
              <>
          <Link to='/cart'>
          <img src={assets.basket_icon} alt="Basket" /> </Link>
          <div className={getTotalCart()===0?"":"dot"}></div>
          </>
            )}
          
        </div>
          <div className='navbar-profile' onClick={toggleDropdown}>
            <img src={assets.profile_icon} alt="Profile" />
            {DropdownOpen && (
              <ul className='nav-profile-dropdown'>
                {role === "client" && ( 
                  <>
                <li onClick={()=> navigate('/myOrders')}><img src={assets.bag_icon} alt="Orders" /><p>Orders</p></li>
                <hr />
                </>
              )}
              {role === "admin" && ( 
                  <>
                <li onClick={()=> navigate('/admin/dashboard')}><MdDashboard size={20} className='dash-icon' /><p>Dashboard</p></li>
                <hr />
                </>
              )}

                <li onClick={handleLogout}><img src={assets.logout_icon} alt="Logout" /><p>Logout</p></li>
              </ul>
            )}
          </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;

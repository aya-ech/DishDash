import React, { useContext } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const Header = () => {
  const {setMenu} = useContext(StoreContext)
  const scrollToMenu = () => {
    const menuSection = document.getElementById('explore-menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
      setMenu("menu")
    }
  };
  return (
    <div className='header'>
      <div className="header-contents">
        <h2>Order your favorite meals here for a quick and delicious experience.</h2>
        <p>Enjoy a selection of mouthwatering dishes, expertly prepared with premium ingredients. Whether you crave a hearty meal or a light snack, our menu has something for every taste. Let us elevate your dining experience with flavors crafted to perfection </p>
          <button onClick={scrollToMenu}>View Menu</button>
      </div>
    </div>
  )
}

export default Header

import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
           <img src={assets.DishDash} alt="" />
        </div>
      </div>
      <p className='footer-copyright'>Copyright 2024 &copy; DishDash.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer

import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () =>  {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                 <h3 className='footer-h3'>Cravelt.</h3>
                 <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae consequatur blanditiis odio consequuntur exercitationem? Commodi voluptate provident doloribus velit corrupti, eius deleniti suscipit molestias? Minus non est praesentium eligendi ullam!</p>
                 <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                 </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                  <li>Home</li>
                  <li>About us</li>
                  <li>Delivery</li>
                  <li>Privacy policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <li>+!-212-456-7890</li>
                <li>contact@example.com</li>
            </div>
        </div>
        <hr />
        <p className="footer-copyright"> Copyright 2024 © tomato.com - All Right Reserved. </p> 
    </div>
  )
}

export default Footer
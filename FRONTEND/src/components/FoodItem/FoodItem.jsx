import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
const FoodItem = ({id,name,price,description,image,setShowLogin}) => {

    const{cartItems,addToCart,removeFromCart,role , token} = useContext(StoreContext);

    const scrollToHome = () => {
        const home = document.getElementById('home');
        if (home) {
          home.scrollIntoView({ behavior: 'smooth' });
        }
      };

    const handleAddToCart = () => {
        if (token) {
          addToCart(id);
        } else {
          setShowLogin(true);
          scrollToHome();
          
        }
      };

  return (
    <div className='food-item'>
        <div className="food-item-img-container">
            <img src={image} alt="" className="food-item-image" />
            {(!token || role === "client" ) && (
              <>
            {!cartItems[id]
                ?<img className="add" onClick={handleAddToCart} src={assets.add_icon_white} alt="" />
                :<div className="food-item-counter">
                    <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                    <p>{cartItems[id]}</p>
                    <img onClick={handleAddToCart} src={assets.add_icon_green} alt="" />
                </div>
            }
            </>
          )}
        </div>
            <div className="food-item-info">
                <div className="food-item-name">
                    <p>{name}</p>
                </div>
                <p className="food-item-desc">{description}</p>
                <p className="food-item-price">{price}DH</p>
            </div>
        </div>
  )
}

export default FoodItem

import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { IoMdAddCircle } from "react-icons/io";
import { IoRemoveCircle } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { MdRemoveShoppingCart } from "react-icons/md";
// import { IoCaretBackCircle } from "react-icons/io5";

const Cart = () => {

  const {cartItems,foods,removeFromCart,addToCart,getTotalCart,deleteFromCart} = useContext(StoreContext) 


const navigate = useNavigate();

  const BackToMenu = () => {
    navigate('/#explore-menu'); 
  };

  const isCartEmpty = getTotalCart() === 0;

  return (
    <div className='cart'>
      <div className="cart-top">
        <button className="back-to-menu-button" onClick={BackToMenu}>Back to Menu</button>
      </div>
      {isCartEmpty ? (
            <div className="cart_msg">
              <h3>Ouups ! Your cart is empty !</h3>
              <p>Explore our menu and start adding items!</p>
            </div>
      ) : (
        <>
        <div className="cart-items">
        <div className="cart-items-title">
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Modify</p>
          <p></p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br /> 
        <hr />
        {foods.map((item,index)=>{
          if(cartItems[item._id]>0){
            return (
              <div>
              <div className="cart-items-title cart-items-item"> 
                <p>{item.name} </p>
                <p>{item.price} </p>
                <p>{cartItems[item._id]} </p>
                <p onClick={()=>addToCart(item._id)}><IoMdAddCircle className='add-icon'/></p>
                <p onClick={()=>removeFromCart(item._id)}><IoRemoveCircle size={16} className='minus-icon'/></p>
                <p>{item.price*cartItems[item._id]} </p>
                <p onClick={()=>deleteFromCart(item._id)}><MdRemoveShoppingCart size={25}className='remove-icon' /></p>
              </div>
              <hr />
              </div>
            )
          }
        })}
      </div>  
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>SubTotal</p>
              <p>{getTotalCart()}DH</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{getTotalCart()===0?0:20}DH</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>{getTotalCart()===0?0:getTotalCart()+20}DH</b>
            </div>
          </div>
          <button disabled={isCartEmpty} onClick={()=>navigate('/order')}>Continue to Delivery</button>
        </div>
      </div>
      </>
      )}
    </div>
  )
}

export default Cart;

// import React, { useContext } from 'react';
// import './Cart.css';
// import { FaDeleteLeft } from "react-icons/fa6";
// import { StoreContext } from '../../context/StoreContext';

// const Cart = () => {
//   const { cartItems, food_list, removeFromCart } = useContext(StoreContext);

//   return (
//     <div className='cart'>
//       <table className='cart-table'>
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Price</th>
//             <th>Quantity</th>
//             <th>Total</th>
//             <th>Remove</th>
//           </tr>
//         </thead>
//         <tbody>
//           {food_list.map((item, index) => {
//             if (cartItems[item._id] > 0) {
//               return (
//                 <tr key={index} className="cart-items-item">
//                   <td>{item.name}</td>
//                   <td>{item.price}</td>
//                   <td>{cartItems[item._id]}</td>
//                   <td>{item.price * cartItems[item._id]}</td>
//                   <td>
//                     <FaDeleteLeft className='remove-icon' onClick={() => removeFromCart(item._id)} />
//                   </td>
//                 </tr>
//               );
//             }
//             return null;
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Cart;

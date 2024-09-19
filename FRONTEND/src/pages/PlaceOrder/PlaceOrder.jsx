import React, { useEffect, useState } from 'react'
import './PlaceOrder.css'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'
import { IoIosArrowRoundBack } from "react-icons/io";
import axios from 'axios';
import { GiConfirmed } from "react-icons/gi";
import toast from 'react-hot-toast';

const PlaceOrder = () => {
  const {getTotalCart , userId , token,foods,cartItems}=useContext(StoreContext);

  const navigate = useNavigate();
  const BackToCart = () => {
    navigate('/cart'); 
  };

  const [user, setUser] = useState({ addresses: [] , phones: [] });
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [SelectedAddress, setSelectedAddress] = useState('')
  const [SelectedPhone, setSelectedPhone] = useState('')
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addressError, setAddressError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const placeOrder = async (e) =>{
    e.preventDefault();
    let orderItems=[];
    foods.map((item)=>{
      if (cartItems[item._id]>0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    // console.log(SelectedAddress);
    let Order = {
      user: userId,
      foods:orderItems,
      total:getTotalCart()+20,
      name:newName,
      address:SelectedAddress,
      phone:SelectedPhone,
      
    }
    try {
       await axios.post(`http://localhost:3000/api/orders`, Order ,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      }); 
      toast.success('Order in process');
      navigate('/myOrders')
      window.location.reload()
    } catch (error) {
      setError(error.message); 
    }
    
  }
  
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/user/${userId}`,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        }); 
      setUser(response.data);
      setNewName(response.data.name);
      } catch (err) {
        setError(err.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchdata(); 
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

   
    let updatedPhones = [...user.phones];
    let updatedAddresses = [...user.addresses];
    let isValid = true;

    if (newAddress.length <= 20) {
      setAddressError('Incorrect Address');
      isValid = false;
    } else {
      setAddressError('');
    }

    if (newPhone.length !== 10 || !(newPhone.startsWith('0') ) || !/^\d+$/.test(newPhone)) {
      setPhoneError('Invalid phone number.');
      isValid = false;
    } else {
      setPhoneError('');
    }
    


   
    if (newPhone && !updatedPhones.includes(newPhone)) {
      updatedPhones.push(newPhone);
    }

  
    if (newAddress && !updatedAddresses.includes(newAddress)) {
      updatedAddresses.push(newAddress);
    }
    if (isValid) {
    try {
      await axios.put(`http://localhost:3000/api/users/update/${userId}`, 
        { 
          phones: updatedPhones, 
          addresses: updatedAddresses 
        }, 
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setUser({ ...user, phones: updatedPhones, addresses: updatedAddresses });
      setIsSubmitted(true)
      toast.success('Success');
      setSelectedAddress(newAddress);
      setSelectedPhone(newPhone);
    } catch (err) {
      setError(err.message);
    }
   } };

   const isCartEmpty = getTotalCart() === 0;


  return (
    <form className='place-order'>
      <button className="back-to-menu-button" onClick={BackToCart}><IoIosArrowRoundBack className='back-icon' /></button>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
          <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)}/> 
          <input type="email" value={user.email} />
          <input type="text" placeholder='Phone' list="phones"  value={newPhone} 
          onChange={(e) => setNewPhone(e.target.value)} required  />
          <datalist id="phones">
          {user.phones?.map((phone,index)=>{
            return (
              <option key={index} value={phone} />
            )
          })}
          </datalist>
          {phoneError && <div className="error-message">{phoneError}</div>}
          <input type="text" placeholder="ex: Street address, Apartment number, Neighborhood, City" list="addresses"  value={newAddress} 
          onChange={(e) => setNewAddress(e.target.value)} required />
          <datalist id="addresses">
          {user.addresses?.map((address,index)=>{
            return (
              <option key={index} value={address} />
            )
          })}
          </datalist>
          {addressError && <div className="error-message">{addressError}</div>}
          <button className='save-icon' type="submit" disabled = {isCartEmpty} onClick={handleSubmit}><GiConfirmed /></button>
          
      </div>
      <div className='place-order-right'>
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
          <button type='submit' onClick={placeOrder} disabled={isCartEmpty || !isSubmitted}>Confirm Order</button>
        </div>
      </div>
      </form>
    
  )
}

export default PlaceOrder;

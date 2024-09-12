import React, { useContext, useEffect, useState } from 'react'
import './AllOrders.css'
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import toast from 'react-hot-toast';


const AllOrders = () => {
  const {token} = useContext(StoreContext);
  const [AllOrders , setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllOrders = async() =>{
    try {
      const response = await axios.get(`http://localhost:3000/api/orders`, 
        {
          headers: {
          Authorization: `Bearer ${token}`,
        },
    });
    setAllOrders(response.data)
    console.log(AllOrders)
    } catch (err) {
      setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() =>{
       fetchAllOrders()
    },[])
    console.log(AllOrders)

    const textFormater = ({ text }) => {
      const newlineText = text.replace(/\n/g, "");
      return <div>{newlineText}</div>;
    };

    if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading categories: {error}</p>;



  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:3000/api/orders/${orderId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchAllOrders();
      toast.success("Status updated successfully")
    } catch (err) {
      console.error('Error updating status:', err.message);
    }
  };

  return (
    <div className="orders-page">
      <h2>All Orders</h2>
      <div className="order-list">
        {AllOrders.map((order, index) => {
          const totalItems = order.foods.reduce((total, item) => total + item.quantity, 0);
          return (
            <div key={index} className="order_item">
              <div className="order-left">
              <div className="order-foods">
              <p>
                {order.foods.map((item, index) => {
                  return textFormater(
                    { text: item.name  + " x " +  item.quantity  }
                  );
                })}
              </p>
              </div> 
              <div className="delivery-infos">
              <p className="order-name">{order.name}</p>
              <p className="order-address">{order.address}</p>
              <p className="order-phone">{order.phone}</p>
              </div>
              </div>
              <p>Foods: {totalItems}</p>
              <p>{order.total}.00DH</p>
              
              <select value={order.status} onChange={(e)=>{handleStatusChange(order._id,e.target.value)}}>
                <option value="In process">In process</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default AllOrders

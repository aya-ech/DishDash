import React, { useEffect, useState } from "react";
import "./MyOrders.css";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
const MyOrders = () => {
  const { token, userId } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/orders/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(response.data);
        console.log(orders);
      } catch (err) {
        console.log(err.message);
      }
    };

    if (token) {
      fetchOrders();
    }
  }, [token]);


  const textFormater = ({ text }) => {
    const newlineText = text.replace(/\n/g, "");
    return <div>{newlineText}</div>;
  };

  return (
    <div className="orders">
      <h2>My Orders</h2>
      <div className="container">
        {orders.map((order, index) => {
          const totalItems = order.foods.reduce((total, item) => total + item.quantity, 0);
          return (
            <div key={index} className="order">
              <p>
                {order.foods.map((item, index) => {
                  return textFormater(
                    { text: item.name  + " x " +  item.quantity  }
                  );
                })}
              </p>
              <p>{order.total}.00DH</p>
              <p>Foods: {totalItems}</p>
              <p>
                <span>&#x25cf;</span> <b>{order.status}</b>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;

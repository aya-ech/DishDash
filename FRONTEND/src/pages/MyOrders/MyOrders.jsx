import "./MyOrders.css";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const MyOrders = () => {
  const { token, userId } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); 

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
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false); 
      }
    };

    if (token) {
      fetchOrders();
    } else {
      setLoading(false); 
    }
  }, [token, userId]); 

  const textFormater = ({ name, quantity }) => {
    return (
      <div>
        <p>{name} x {quantity}</p> 
      </div>
    );
  };

  return (
    <div className="orders">
      <h2>My Orders</h2>
      <div className="container">
        {loading ? (
          <p>Loading...</p> 
        ) : orders.length === 0 ? (
          <h3 className="msg">You have no orders yet.</h3> 
        ) : (
          orders.map((order, index) => {
            const totalItems = order.foods.reduce((total, item) => total + item.quantity, 0);
            return (
              <div key={index} className="order">
                <p>
                 
                  {order.foods.map((item, index) => {
                    return (
                      <React.Fragment key={index}>
                        {textFormater({ name: item.name, quantity: item.quantity })}
                      </React.Fragment>
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
          })
        )}
      </div>
    </div>
  );
};

export default MyOrders;

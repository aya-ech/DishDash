import { createContext, useEffect, useState } from "react";

import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [menu, setMenu] = useState("home");

  const [cartItems, setCartItems] = useState({});



  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFoods = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/foods");
      setFoods(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };



  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
  };

  const deleteFromCart = async (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      delete updatedCart[itemId]; 
      return updatedCart;
    });
  
    if (token) {
      await axios.post(
        url + "/api/cart/delete",
        { itemId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
  };
  

  const getCart = async (token) => {
    const response = await axios.get(url + "/api/cart/get", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setCartItems(response.data.cart || {});

  };

  const getTotalCart = () => {
    let total = 0;

    if (!loading && foods.length > 0) {
      for (const item in cartItems) {
        if (cartItems[item] > 0) {
          let itemInfo = foods.find((product) => product._id === item);

          if (itemInfo) {
            total += itemInfo.price * cartItems[item];
          }
        }
      }
    }

    return total;
  };
  const url = "http://localhost:3000";
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    async function loadData() {
      await fetchFoods();
      const storedId = localStorage.getItem("userId");
      if (storedId) {
        setUserId(storedId);
      }
      const storedRole = localStorage.getItem("role");
      if (storedRole){
        setRole(storedRole)
      }
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await getCart(storedToken);
      } else {
        setCartItems({});
      }
    }

    loadData();
  }, [token, userId]);

  const contextValue = {
    foods,
    url,
    token,
    setToken,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    deleteFromCart,
    menu,
    setMenu,
    getTotalCart,
    userId,
    setUserId,
    role,
    setRole
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

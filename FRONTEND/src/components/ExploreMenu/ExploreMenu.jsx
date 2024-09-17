
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ExploreMenu.css';

const ExploreMenu = ({ category, setCategory }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const scrollToFoods = () => {
    const menu = document.getElementById('food-display');
    if (menu) {
      menu.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/categories'); 
        console.log(response.data)
        setCategories(response.data); 
        console.log(categories)
      } catch (err) {
        setError(err.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchCategories(); 
  }, []);

  if (loading) return <p>Loading...</p>; 
  if (error) return <p>Error loading categories: {error}</p>; 

  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our menu</h1>
      <p className='explore-menu-text'>
        Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.
      </p>
      <div className="explore-menu-list">
        {categories.map((item,index) => (
          <div
            onClick={() => setCategory(prev => prev === item.category_name ? "All" : item.category_name)} 
            key={index}
            className='explore-menu-list-item'
          >
            <img onClick={scrollToFoods} className={category === item.category_name ? "active" : ""} src={`http://localhost:3000/uploads/${item.category_img}`} alt={item.category_name} />
            <p>{item.category_name}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;


import React, { useContext, useEffect, useState } from 'react'
import './FoodDisplay.css';
import axios from 'axios';
import FoodItem from '../FoodItem/FoodItem';



const FoodDisplay = ({ category , setShowLogin }) => {

  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/foods'); 
        setFoods(response.data); 
      } catch (err) {
        setError(err.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchFoods(); 
  }, []);

  if (loading) return <p>Loading...</p>; 
  if (error) return <p>Error loading foods: {error}</p>; 

  const filteredFoods = category === "All" 
    ? foods 
    : foods.filter(food => food.category.category_name === category);

    
  return (
    <div className='food-display' id='food-display'>
        <h2>Top dishes near you</h2>
        <div className="food-display-list">
             {filteredFoods.map((item,index) =>{
                return <FoodItem key={index} id={item._id} name={item.name} description={item.desc} price={item.price} image={`http://localhost:3000/uploads/${item.image}`} setShowLogin={setShowLogin}/>
 })}
        </div>
    </div>
  )
} 

export default FoodDisplay


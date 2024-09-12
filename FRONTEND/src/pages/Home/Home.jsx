import React, { useState } from 'react'
import "./Home.css"
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import Footer from '../../components/Footer/Footer'
import FoodItem from '../../components/FoodItem/FoodItem'
const Home = ({setShowLogin}) => {
  const[category,setCategory]=useState("All");

  return (
    
    <div id='home'>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory}/>  
      <FoodDisplay category={category} setShowLogin={setShowLogin} />
     
    </div>
   
   

  )
}

export default Home


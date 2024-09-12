import React, { useContext, useEffect, useState } from 'react'
import './ListItems.css'
import axios from 'axios';
import { AiFillEdit } from "react-icons/ai";
import { IoTrashBinSharp } from "react-icons/io5";
import { IoMdAddCircleOutline } from "react-icons/io";
import { StoreContext } from '../../context/StoreContext';
import DeleteFood from '../../Admin/DeleteFood/DeleteFood';
import UpdateFood from '../../Admin/UpdateFood/UpdateFood';
import toast from 'react-hot-toast';
import AddItems from '../../Admin/AddItems/AddItems';


const ListItems = () => {

  const [foods, setFoods] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {token , userId} = useContext(StoreContext);
  const [DeletedFood,setDeletedFood]= useState(null);
  const [showPopupAddFood,setShowPopupAddFood] = useState(false)
  const [showPopupUpdateFood,setShowPopupUpdateFood] = useState(false)
  const [updateFoodById, setUpdateFoodById] = useState(null);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/foods`); 
        console.log(response.data)
        setFoods(response.data); 
        console.log(foods)
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


  const HandleDeleteConfirm = async() =>{
    if(!DeletedFood) return;

    try{
      await axios.delete(`http://localhost:3000/api/foods/${DeletedFood._id}`, 
        {
          headers: {
          Authorization: `Bearer ${token}`,
        },
    });
    setFoods((prevFoods) => prevFoods.filter(food => food._id !== DeletedFood._id));
    setDeletedFood(null);
    toast.success("Food deleted successfully")

    }catch(err){
      setError("Error deleting food")
    }
   
  };
  const HandleDeleteCancel = async()=>{
   setDeletedFood(null);
  }

  const addFood = (NewFood) =>{
    setFoods(prevFoods => [...prevFoods , NewFood])
  }

  return (

    <div className='food-list'>
      <div className="add-food">
      <p><IoMdAddCircleOutline  size={65}onClick={()=>setShowPopupAddFood(true)}/></p>
      {showPopupAddFood && <AddItems setShowPopupAddFood={setShowPopupAddFood} addFood= {addFood}/>} 
        <b>Add Food</b>
        </div>
      {foods.map((food,index)=>(
      <div key={index} className='food'>
        <div className="food-img-container">
            <img src={`http://localhost:3000/uploads/${food.image}`} alt="" className="food-image" />
        </div>
            <div className="food-info">
                <div className="food-name">
                    <p>{food.name}</p>
                </div>
                <p className="food-desc">{food.desc}</p>
                <p className="food-price">{food.price}DH</p>
                <div className="action">
                <p className="update"><AiFillEdit size={22} onClick={()=>{setUpdateFoodById(food._id);setShowPopupUpdateFood(true);}} /></p>
                <p className="delete" onClick={() => setDeletedFood(food)} ><IoTrashBinSharp size={23}/></p>
                </div>
            </div>
            { showPopupUpdateFood && updateFoodById === food._id && (
          
          <UpdateFood setShowPopupUpdateFood={setShowPopupUpdateFood} idFood={food._id} foodName = {food.name} foodDesc = {food.desc} foodPrice = {food.price} foodCat = {food.category}/>
        )}
        </div>
  ))}
      {DeletedFood && (
        <DeleteFood 
        FoodName={DeletedFood.name}
        onCancel={HandleDeleteCancel}
        onConfirm={HandleDeleteConfirm}
        />
      )}
    </div>
  )
}

export default ListItems

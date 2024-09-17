import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/StoreContext';
import './UpdateFood.css'
import axios from 'axios';
import toast from 'react-hot-toast';

const UpdateFood = ({setShowPopupUpdateFood,idFood,foodName,foodDesc,foodPrice,foodCat}) => {
    const {token} = useContext(StoreContext)
    const [errors, setErrors] = useState(null);
    const [categoriesFood , setCategoriesFood] = useState([])
    const [data,setData] = useState({
        name: foodName ||"",
        desc: foodDesc || "",
        price: foodPrice ||"",
        category: foodCat._id ||"",
        image: null,  // Add image field
      });
    
      const onChangeHandler = (event) => {
        const name = event.target.name;
        if (event.target.type === 'file') {
          setData(data => ({ ...data, image: event.target.files[0] })); // Handle image file
        } else {
          const value = event.target.value;
          setData(data => ({ ...data, [name]: value }));
        }
      };
    
      const onSubmit = async (event) => {
        event.preventDefault();
    
        const formData = new FormData();
        formData.append('name', data.name); 
        formData.append('desc', data.desc); 
        formData.append('price', data.price); 
        formData.append('category', data.category); 
    
        // Append image file if selected
        if (data.image) {
          formData.append('image', data.image);
        }
    
        try {
          await axios.put(`http://localhost:3000/api/foods/${idFood}`, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          });
          setShowPopupUpdateFood(false);
          window.location.reload();
          toast.success("Food updated successfully");
        } catch (error) {
          setErrors('Error updating food');
        }
      };
    
      

    useEffect(() => {
        const fetchCategories = async () => {
          try {
            const response = await axios.get(
              "http://localhost:3000/api/categories"
            );
            console.log(response.data);
            setCategoriesFood(response.data);
          } catch (err) {
            setErrors(err.message);
          } 
        };
    
        fetchCategories();
      }, []);
      console.log(categoriesFood);

      const handleUpdateCancel = async()=>{
        setShowPopupUpdateFood(false)
      }
  
      
  return (
    <div className='UpdateFoodPopup'>
        <form onSubmit={onSubmit} className='UpdateFoodPopup-container'>
            <div className="UpdateFoodPopup-title">
                <h2>Update Food</h2>
            </div>
            <div className="UpdateFoodPopup-inputs">
                <input type="text"name='name' placeholder="Food name" value={data.name} onChange={onChangeHandler} required/>
                <textarea name='desc' placeholder="Food description" value={data.desc} onChange={onChangeHandler} required/>
                <input type="number"name='price' placeholder="Food price"  value={data.price} onChange={onChangeHandler} required/>
                <select name='category' value={data.category} onChange={onChangeHandler} >
                {categoriesFood.map((item) => (
                    <option key={item._id} value={item._id}>{item.category_name}</option>
                ))}
                </select>
                <input type="file" name="image" onChange={onChangeHandler} 
          />
                
            </div>
            
            <button type='submit' > Update </button>
            <button className="cancelUpdate" onClick={handleUpdateCancel}>Cancel</button>
        </form>  
    </div>
  )
}

export default UpdateFood





import React, { useContext, useEffect, useState } from 'react'
import './AddItems.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddItems = ({setShowPopupAddFood,addFood}) => {
  const {token} = useContext(StoreContext)
  const [errors, setErrors] = useState(null);
  const [categoriesFood , setCategoriesFood] = useState([])
  const [data,setData] = useState({
      name: "",
      desc:"",
      price:"",
      category:"",
      image: null
  });

  const onChangeHandler = (event) => {
      const name = event.target.name;
  
      if (event.target.type === 'file') {
          setData(data => ({ ...data, image: event.target.files[0] })); 
      } else {
          const value = event.target.value;
          setData(data => ({ ...data, [name]: value }));
      }
  };
  

  const onSubmit = async(event) =>{
      event.preventDefault();
      const formData = new FormData();
      formData.append('name', data.name); 
      formData.append('desc', data.desc); 
      formData.append('price', data.price); 
      formData.append('category', data.category); 
      formData.append('image', data.image);

      const fileExtension = data.image.name.split('.').pop().toLowerCase();
      const allowedExtensions = ['png', 'jpg', 'jpeg'];
  
      
      if (!allowedExtensions.includes(fileExtension)) {
          toast.error("File does not support. You must use .png, .jpg, or .jpeg");
          return false;
      }
      try {
          const response = await axios.post("http://localhost:3000/api/foods",formData,   {
              headers: {
              Authorization: `Bearer ${token}`,
            },
        })
        toast.success("Food added successfully")
        addFood(response.data)

      } catch (error) {
          setErrors('error adding food')
      }

  }
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
  const handleUpdateCancel = async()=>{
      setShowPopupAddFood(false)
    }

  return (
    
    <div className='AddFoodPopup'>
    <form onSubmit={onSubmit} className='AddFoodPopup-container'>
        <div className="AddFoodPopup-title">
            <h2>Add Food</h2>
        </div>
        <div className="AddFoodPopup-inputs">
            <input type="text"name='name' placeholder="Food name" value={data.name} onChange={onChangeHandler} required/>
            <textarea name='desc' placeholder="Food description" value={data.desc} onChange={onChangeHandler} required/>
                <input type="number"name='price' placeholder="Food price"  value={data.price} onChange={onChangeHandler} required/>
                <select name='category' value={data.category} onChange={onChangeHandler} >
                  <option value="">Select Category</option>
                {categoriesFood.map((item) => (
                    <option key={item._id} value={item._id}>{item.category_name}</option>
                ))}
                </select>
                
            <input type="file" name ='image' onChange={onChangeHandler} required/>
        </div>
        <button type='submit' > Add </button>
        <button className="cancelUpdate" onClick={handleUpdateCancel}>Cancel</button>
    </form>  
</div>
  ) 
}

export default AddItems

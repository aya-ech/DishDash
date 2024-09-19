import React, { useContext, useState } from 'react'
import './AddCategory.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import toast from 'react-hot-toast';


const AddCategory = ({setShowPopupAdd,addCategory}) => {
    const {token} = useContext(StoreContext)
    const [errors, setErrors] = useState(null);
    const [data,setData] = useState({
        name: "",
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
        formData.append('category_name', data.name); 
        formData.append('image', data.image);
        const fileExtension = data.image.name.split('.').pop().toLowerCase();
        const allowedExtensions = ['png', 'jpg', 'jpeg'];
    
        
        if (!allowedExtensions.includes(fileExtension)) {
            toast.error("File does not support. You must use .png, .jpg, or .jpeg");
            return false;
        }
        try {
            const response = await axios.post("http://localhost:3000/api/categories",formData ,   {
                headers: {
                Authorization: `Bearer ${token}`,
              },
          })
          setShowPopupAdd(false)
          toast.success("Category added successfully")
          addCategory(response.data)
        } catch (error) {
            setErrors('error adding category')
        }

    }
    const handleUpdateCancel = async()=>{
        setShowPopupAdd(false)
      }

  return (
    <div className='AddCatPopup'>
        <form onSubmit={onSubmit} className='AddCatPopup-container'>
            <div className="AddCatPopup-title">
                <h2>Add Category</h2>
            </div>
            <div className="AddCatPopup-inputs">
                <input type="text"name='name' placeholder="Category name" value={data.name} onChange={onChangeHandler} required/>
                <input type="file" name ='image' onChange={onChangeHandler} required/>
            </div>
            <button type='submit' > Add </button>
            <button className="cancelUpdate" onClick={handleUpdateCancel}>Cancel</button>
        </form>  
    </div>
  )
}

export default AddCategory

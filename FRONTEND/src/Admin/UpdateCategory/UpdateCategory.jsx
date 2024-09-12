import React, { useContext, useState } from 'react'
import { StoreContext } from '../../context/StoreContext';
import './UpdateCategory.css'
import axios from 'axios';
import toast from 'react-hot-toast';

const UpdateCategory = ({setShowPopupUpdate,id,category
    }) => {
    const {token} = useContext(StoreContext)
    const [errors, setErrors] = useState(null);
    const [data,setData] = useState({
        name: category || ""
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
            const value = event.target.value;
            setData(data => ({ ...data, [name]: value }));
        }
    console.log(data)
    

    const onSubmit = async(event) =>{
        event.preventDefault();
        try {
            await axios.put(`http://localhost:3000/api/categories/${id}`, { category_name:data.name },   {
                headers: {
                Authorization: `Bearer ${token}`,
              },
          })
          setShowPopupUpdate(false);
          toast.success("Category updated successfully")
          window.location.reload()
        } catch (error) {
            setErrors('error updating category')
        }

    }

    const handleUpdateCancel = async()=>{
        setShowPopupUpdate(false)
      }
  return (
    <div className='UpdateCatPopup'>
        <form onSubmit={onSubmit} className='UpdateCatPopup-container'>
            <div className="UpdateCatPopup-title">
                <h2>Update Category</h2>
            </div>
            <div className="UpdateCatPopup-inputs">
                <input type="text"name='name' placeholder="Category name" value={data.name} onChange={onChangeHandler} required/>
            </div>
            <button type='submit' > Update </button>
            <button className="cancelUpdate" onClick={handleUpdateCancel}>Cancel</button>
        </form>  
    </div>
  )
}

export default UpdateCategory




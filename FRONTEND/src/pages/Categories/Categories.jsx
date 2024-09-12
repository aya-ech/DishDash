import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ImCross } from "react-icons/im";
import { IoMdAddCircleOutline } from "react-icons/io";
import { AiFillEdit } from "react-icons/ai";
import "./Categories.css";
import { StoreContext } from "../../context/StoreContext";
import DeleteCat from "../../Admin/DeleteCat/DeleteCat";
import AddCategory from "../../Admin/AddCategory/AddCategory";
import UpdateCategory from "../../Admin/UpdateCategory/UpdateCategory";
import toast from 'react-hot-toast';

const Categories = () => {
  const [listCategories, setlistCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {token} = useContext(StoreContext);
  const [DeleteCategory, setDeleteCategory] = useState(null); 
  const [showPopupAdd,setShowPopupAdd] = useState(false)
  const [showPopupUpdate,setShowPopupUpdate] = useState(false)
  const [updateCategoryById, setUpdateCategoryById] = useState(null);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/categories"
        );
        console.log(response.data);
        setlistCategories(response.data);
        console.log(listCategories);
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


  const HandleDeleteConfirm = async() =>{
if (!DeleteCategory) return;
    try{
      await axios.delete(`http://localhost:3000/api/categories/${DeleteCategory._id}`, 
        {
          headers: {
          Authorization: `Bearer ${token}`,
        },
    });
    
    setDeleteCategory(null);
    toast.success("Category deleted successfully")
    setlistCategories((prevListCategories) => prevListCategories.filter(category => category._id !== DeleteCategory._id));
    }catch(err){
      setError("Error deleting category")
    }
   
  };

  const handleDeleteCancel = () => {
    setDeleteCategory(null); 
  };

  const addCategory = (NewCategory) =>{
    setlistCategories(prevListCategories => [...prevListCategories , NewCategory])
  }
  

  return (
    
    <div className="categories-list">
      <div className="add-cat">
      <p><IoMdAddCircleOutline  size={55} onClick={()=>setShowPopupAdd(true)}/></p>
      {showPopupAdd && <AddCategory setShowPopupAdd={setShowPopupAdd} addCategory= {addCategory}/>}
        <b>Add Category</b>
      </div>
      {listCategories.map((category, index) => (
        <div key={index} className="categories-list-category">
          <img
            src={`http://localhost:3000/uploads/${category.category_img}`}
            alt={category.category_name}
          />
          <p>{category.category_name}</p>
          <hr />
          <div className="action-icon">
          <p className="updateCat"><AiFillEdit size={22}  onClick={()=>{setUpdateCategoryById(category._id);setShowPopupUpdate(true);}}/></p>
            <p className="deleteCat">
              <ImCross size={18} onClick={()=>setDeleteCategory(category)}/>
            </p>
          </div>
          
          { showPopupUpdate && updateCategoryById === category._id && (
          
            <UpdateCategory setShowPopupUpdate={setShowPopupUpdate} id={category._id} category = {category.category_name}/>
          )}
        </div>
      ))}
       {DeleteCategory && (
        <DeleteCat
          categoryName={DeleteCategory.category_name}
          onConfirm={HandleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </div>
     
  );
};

export default Categories;

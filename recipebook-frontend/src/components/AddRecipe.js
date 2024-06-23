import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddRecipe() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    category: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/recipes/', formData)
      .then(() => {
        navigate('/');
      })
      .catch(error => {
        console.error('There was an error creating the recipe!', error);
      });
  };

  return (
    <div className="add-recipe-container">
      <h1></h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="title" 
          placeholder="Title" 
          value={formData.title}
          onChange={handleChange} 
          required 
        />
        <textarea 
          name="ingredients" 
          placeholder="Ingredients" 
          value={formData.ingredients}
          onChange={handleChange} 
          required 
        />
        <textarea 
          name="instructions" 
          placeholder="Instructions" 
          value={formData.instructions}
          onChange={handleChange} 
          required 
        />
        <input 
          type="text" 
          name="category" 
          placeholder="Category" 
          value={formData.category}
          onChange={handleChange} 
          required 
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddRecipe;

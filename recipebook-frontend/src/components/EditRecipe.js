import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    category: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:8000/api/recipes/${id}/`)
      .then(response => {
        setFormData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8000/api/recipes/${id}/`, formData)
      .then(() => {
        navigate(`/recipes/${id}`);
      })
      .catch(error => {
        console.error('There was an error updating the recipe!', error);
      });
  };

  return (
    <div className="App">
      <h1>Edit Recipe</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="title" 
          value={formData.title} 
          onChange={handleChange} 
        />
        <textarea 
          name="ingredients" 
          value={formData.ingredients} 
          onChange={handleChange} 
        />
        <textarea 
          name="instructions" 
          value={formData.instructions} 
          onChange={handleChange} 
        />
        <input 
          type="text" 
          name="category" 
          value={formData.category} 
          onChange={handleChange} 
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default EditRecipe;

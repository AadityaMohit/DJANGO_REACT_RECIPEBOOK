import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/recipes/${id}/`)
      .then(response => {
        setRecipe(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, [id]);

  const handleDelete = () => {
    axios.delete(`http://localhost:8000/api/recipes/${id}/`)
      .then(() => {
        navigate('/');
      })
      .catch(error => {
        console.error('There was an error deleting the recipe!', error);
      });
  };

  if (!recipe) return <div>Loading...</div>;

  return (
    <div className="recipe-detail-container">
      <h1>{recipe.title}</h1>
      <p>{recipe.ingredients}</p>
      <p>{recipe.instructions}</p>
      <div className="recipe-actions">
        <Link to={`/edit/${recipe.id}`} className="btn btn-primary">Edit</Link>
        <button onClick={handleDelete} className="btn btn-danger">Delete</button>
        <Link to="/" className="btn btn-secondary">Back to List</Link>
      </div>
    </div>
  );
}

export default RecipeDetail;

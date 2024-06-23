import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './RecipeList.css'; // Assuming you have a CSS file for styling

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/recipes/')
      .then(response => {
        setRecipes(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
        setError('Error fetching data. Please try again later.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="recipe-list-container">
      <header className="app-header">
        <div className="app-title">My Recipe Book</div>
        <nav className="app-nav">
          <Link to="/add" className="nav-link">Add Recipe</Link>
        </nav>
      </header>
      <div className="recipe-list-content">
        <h1 className="recipe-list-title">Recipes</h1>
        {loading ? (
          <p>Loading recipes...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <ul className="recipe-list">
            {recipes.map(recipe => (
              <li key={recipe.id} className="recipe-item">
                <Link to={`/recipes/${recipe.id}`} className="recipe-link">
                  <div className="recipe-thumbnail">
                    {/* <img src={recipe} alt={recipe.title} className="recipe-image" /> */}
                  </div>
                  <div className="recipe-details">
                    <h2 className="recipe-title">{recipe.title}</h2>
                    <p className="recipe-category">Category: {recipe.category}</p>
                    <p className="recipe-description">{recipe.description}</p>
                    <div className="recipe-actions">
                      <button className="btn btn-primary">View Recipe</button>
                      <button className="btn btn-secondary">Edit Recipe</button>
                      <button className="btn btn-danger">Delete Recipe</button>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default RecipeList;

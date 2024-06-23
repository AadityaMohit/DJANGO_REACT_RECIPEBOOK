import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import AddRecipe from './components/AddRecipe';
import EditRecipe from './components/EditRecipe'

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/recipes/:id" element={<RecipeDetail />} />
          <Route path="/add" element={<AddRecipe />} />
          <Route path="/edit/:id" element={<EditRecipe />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// Utility function to get an element
const getElement = (selector) => {
  const element = document.querySelector(selector);
  if (element) return element;
  throw Error(`Please double check your class names, there is no ${selector} class`);
};

// Toggle navigation links
const links = getElement('.nav-links');
const navBtnDOM = getElement('.nav-btn');
navBtnDOM.addEventListener('click', () => {
  links.classList.toggle('show-links');
});

// Set current year in footer
const date = getElement('#date');
const currentYear = new Date().getFullYear();
date.textContent = currentYear;

// Fetch and display recipes
const recipesList = getElement('.recipes-list');

// Fetch and display recipes with a triple dots menu
const fetchRecipes = async () => {
  try {
    const response = await fetch('http://localhost/backend/dbconfig.php'); // Replace with your PHP URL
    if (!response.ok) throw new Error('Failed to fetch recipes');
    const recipes = await response.json();

    recipesList.innerHTML = recipes
      .map((recipe) => {
        return `
          <div class="recipe">
            <a href="single-recipe.html">
              <img
                src="${recipe.image}"
                class="img recipe-img"
                alt="${recipe.title}"
              />
              <h5>${recipe.title}</h5>
              <p>Prep: ${recipe.prep_time} min | Cook: ${recipe.cook_time} min</p>
            </a>
            <div class="menu-container">
              <button class="menu-btn">⋮</button>
              <div class="menu-options hidden">
                <button class="menu-option delete-btn" data-id="${recipe.id}">Delete</button>
                <button class="menu-option update-btn" data-id="${recipe.id}">Update</button>
              </div>
            </div>
          </div>
        `;
      })
      .join('');

    // Add event listeners to toggle the menu
    document.querySelectorAll('.menu-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const menuOptions = e.target.nextElementSibling;
        menuOptions.classList.toggle('hidden');
      });
    });

    // Add event listeners for delete and update
    document.querySelectorAll('.delete-btn').forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        const recipeId = e.target.getAttribute('data-id');
        await deleteRecipe(recipeId);
      });
    });

    document.querySelectorAll('.update-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const recipeId = e.target.getAttribute('data-id');
        window.location.href = `update-recipe.html?id=${recipeId}`; // Navigate to update page
      });
    });
  } catch (error) {
    console.error(error.message);
    recipesList.innerHTML = `<p>Failed to load recipes. Please try again later.</p>`;
  }
};

// Function to delete a recipe
const deleteRecipe = async (id) => {
  try {
    const response = await fetch(`http://localhost/backend/dbconfig.php?id=${id}`, {
      method: 'DELETE',
    });

    const result = await response.json();
    if (response.ok) {
      alert('Recipe deleted successfully');
      fetchRecipes(); // Refresh the recipes list
    } else {
      alert(result.message || 'Failed to delete recipe');
    }
  } catch (error) {
    console.error('Error deleting recipe:', error.message);
  }
};

// Call fetchRecipes on page load
document.addEventListener('DOMContentLoaded', fetchRecipes);


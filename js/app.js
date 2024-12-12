import { apiKey } from './config.js';

const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const recipesContainer = document.getElementById('recipes');

searchBtn.addEventListener('click', () => {
    const query = searchInput.value;
    if (query.trim()) {
        fetchRecipes(query);
    } else {
        alert("Please enter a recipe keyword!");
    }
});
async function fetchRecipes(query) {
    const url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=10&apiKey=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        console.log(data); 
        displayRecipes(data.results || []); 
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
}
function displayRecipes(recipes) {
    recipesContainer.innerHTML = '';
    if (recipes.length === 0) {
        recipesContainer.innerHTML = '<p>No recipes found.</p>';
        return;
    }
    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');
        recipeCard.setAttribute('data-id', recipe.id); 
        recipeCard.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}">
            <h3>${recipe.title}</h3>
        `;
        recipesContainer.appendChild(recipeCard);
    });
}



import { fetchRecipeDetails } from './recipeDetails.js';


function setupRecipeClicks() {
    const recipeCards = document.querySelectorAll('.recipe-card');
    recipeCards.forEach((card) => {
        card.addEventListener('click', () => {
            const recipeId = card.getAttribute('data-id');
            fetchRecipeDetails(recipeId);
        });
    });
}

recipesContainer.addEventListener('click', (event) => {
    const card = event.target.closest('.recipe-card'); 
    if (card) {
        const recipeId = card.getAttribute('data-id'); 
        fetchRecipeDetails(recipeId); 
    }
});


document.querySelector('.close').addEventListener('click', () => {
    const modal = document.getElementById('recipeModal');
    modal.style.display = 'none';
});



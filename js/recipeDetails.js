import { apiKey } from './config.js';

const modal = document.getElementById('recipeModal');
const modalContent = document.getElementById('recipeDetails');
const closeModal = document.querySelector('.close');

closeModal.addEventListener('click', () => (modal.style.display = 'none'));
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

export async function fetchRecipeDetails(recipeId) {
    const url = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`); 
        }
        const data = await response.json();
        console.log(data); 

        const modalContent = document.getElementById('modalDetails');
        if (!modalContent) {
            console.error('Modal content element not found.');
            return;
        }

        modalContent.innerHTML = `
            <h2>${data.title}</h2>
            <img src="${data.image}" alt="${data.title}">
            <p><strong>Ready in:</strong> ${data.readyInMinutes} minutes</p>
            <p><strong>Servings:</strong> ${data.servings}</p>
            <p><strong>Ingredients:</strong></p>
            <ul>
                ${data.extendedIngredients
                    .map((ingredient) => `<li>${ingredient.original}</li>`)
                    .join('')}
            </ul>
            <p><strong>Instructions:</strong></p>
            <p>${data.instructions || 'No instructions available.'}</p>
        `;
        const modal = document.getElementById('recipeModal');
        modal.style.display = 'block';
    } catch (error) {
        console.error('Error fetching recipe details:', error);
    }
}

function displayRecipeDetails(recipe) {
    const modal = document.getElementById('recipeModal');
    const modalDetails = document.getElementById('modalDetails');

    if (!modalDetails || !modal) {
        console.error("Modal or modal details element not found.");
        return;
    }

    modalDetails.innerHTML = `
        <h2>${recipe.title}</h2>
        <img src="${recipe.image}" alt="${recipe.title}">
        <p>${recipe.summary}</p>
        <a href="${recipe.sourceUrl}" target="_blank">View Full Recipe</a>
    `;
    modal.style.display = 'block'; 
}



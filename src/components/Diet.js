import React from 'react';
import './Diet.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

const Diet = () => {
    const meals = [
        {
            name: 'Breakfast',
            item: 'Oatmeal with Berries and Nuts',
            calories: 350,
            recipeLink: 'https://www.allrecipes.com/recipe/23921/oatmeal/'
        },
        {
            name: 'Lunch',
            item: 'Grilled Chicken Salad with Mixed Greens',
            calories: 450,
            recipeLink: 'https://www.foodnetwork.com/recipes/food-network-kitchen/grilled-chicken-salad-recipe-2011572'
        },
        {
            name: 'Dinner',
            item: 'Baked Salmon with Roasted Vegetables',
            calories: 500,
            recipeLink: 'https://www.simplyrecipes.com/recipes/baked_salmon_with_lemon_dill_sauce/'
        }
    ];

    const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);

    return (
        <div className="diet-container">
            <h2>Today's Balanced Diet</h2>
            {meals.map((meal, index) => (
                <div className="meal-card" key={index}>
                    <h3>{meal.name}</h3>
                    <p className="meal-item">{meal.item} <span className="calorie-count">{meal.calories} Calories</span></p>
                    <a href={meal.recipeLink} className="recipe-link" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faLink} /> Recipe
                    </a>
                </div>
            ))}
            <div className="total-calories">
                Total Calories: {totalCalories}
            </div>
        </div>
    );
};

export default Diet;
import express from 'express';
import mongoose from 'mongoose';
import recipeController from '../controllers/recipeConroller.js';

const router = express.Router();

router.get("/", recipeController.getRecipe);

router.post("/create-recipe", recipeController.createRecipe);

router.put("/", recipeController.savedRecipe);

router.get("/saved-recipe/:ids", recipeController.savedRecipeById);

router.get("/saved-recipe", recipeController.savedRecipes);

export { router as recipeRouter }
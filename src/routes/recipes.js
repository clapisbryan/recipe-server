import express from 'express';
import mongoose from 'mongoose';
import recipeController from '../controllers/recipeConroller.js';

const router = express.Router();

router.get("/", recipeController.getRecipe);

router.post("/create-recipe", recipeController.createRecipe);

router.put("/saved-recipe", recipeController.savedRecipe);

export { router as recipeRouter }
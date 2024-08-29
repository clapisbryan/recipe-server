import express from 'express';
import mongoose from 'mongoose';
import recipeController from '../controllers/recipeConroller.js';
import { verifyToken } from './users.js';

const router = express.Router();

router.get("/", recipeController.getRecipe);

router.post("/create-recipe", verifyToken, recipeController.createRecipe);

router.put("/", verifyToken, recipeController.savedRecipe);

router.get("/saved-recipe/ids/:userID", recipeController.savedRecipeById);

router.get("/saved-recipe/:userID", recipeController.savedRecipes);

export { router as recipeRouter }
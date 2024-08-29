import mongoose from "mongoose"
import { RecipeModel } from "../models/Recipe.js"
import { UserModel } from "../models/User.js"

const getRecipe = async (req, res) => {
    try {
        await RecipeModel.find({}).then(recipe => {
            return res.json(recipe)
        }).catch(err => res.json(err))
    } catch (err) {
        return res.json(err)
    }
}

const createRecipe = async (req, res) => {
    const { name, ingredients, instruction, imageUrl, cookingTime, userOwner } = req.body;

    try {
        const recipe = new RecipeModel({
            name,
            ingredients,
            instruction,
            imageUrl,
            cookingTime,
            userOwner
        });
        await recipe.save().then(recipe => {
            return res.json(recipe)
        }).catch(err => { return res.json(err) })
    } catch (err) {
        return res.json(err)
    }
}

const savedRecipe = async (req, res) => {
    try {
        const recipe = await RecipeModel.findById(req.body.recipeID)
        const user = await UserModel.findById(req.body.userID)
        user.savedRecipe.push(recipe)
        return user.save()
            .then(recipe => {
                return res.json({ savedRecipe: recipe.savedRecipe });
            })
            .catch(err => { return res.json(err) })
    } catch (error) {
        return res.json(err)
    }
}

const savedRecipeById = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID);
        res.json({ savedRecipe: user?.savedRecipe });

    } catch (error) {
        return res.json(error)
    }
}

const savedRecipes = async (req, res) => {
    try {
        const userId = req.params.userID
        const user = await UserModel.findById(userId);
        
        const savedRecipes = await RecipeModel.find({
            _id: { $in: user?.savedRecipe }
        })
        console.log(savedRecipes);
        res.json({ savedRecipes });

    } catch (error) {
        return res.json(error)
    }
}

export default { getRecipe, createRecipe, savedRecipe, savedRecipeById, savedRecipes };
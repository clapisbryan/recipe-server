import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });

    if (user) {
        return res.json({ message: "User already exist!" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
        username,
        password: hashPassword
    });
    return newUser.save().then(user => {
        return res.json({ message: "User Registered Successfully" });
    }).catch(err => {
        return res.json({ message: "Registered Failed", error: err })
    })
});
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });

    if (!user) {
        return res.json({ message: "User Doesn't Exist!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.json({ message: "Username or Password is Incorrect!" });
    }

    const token = jwt.sign({ id: user._id }, process.env.AUTH_SECRET_KEY);
    res.json({ token, userID: user._id });
});

export { router as userRoute }


export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, process.env.AUTH_SECRET_KEY, (err) => {
            if (err) return res.sendStatus(403);
            next();
        });
    } else {
        res.sendStatus(401);
    }
};
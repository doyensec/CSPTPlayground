const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const config = require('../config/config');
const { isAdmin } = require('../middleware/auth');
const User = require('../models/user');

const saltRounds = 10;

const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})

const userSchema = Joi.object({
    username: Joi.string(),
    role: Joi.string(),
    password: Joi.string()
})


class UserController {

    // Create a new user
    static async createUser(req, res) {
        try {
            let validationError = userSchema.validate(req.body).error;
            if (validationError) {
                return res.status(400).json({
                    status: 400,
                    message: `Invalid request.${validationError}`
                });
            }
            const user = new User(req.body);
            if (req.path === '/signup') {
                user['role'] = 'member';
            }

            user['password'] = bcrypt.hashSync(user['password'], saltRounds);

            await user.save();
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    // Retrieve a user with path param ID
    static async getUser(req, res) {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json();
            }
            res.json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    // Update a user with path param ID
    static async updateUser(req, res) {
        let validationError = userSchema.validate(req.body).error;
        if (validationError) {
            return res.status(400).json({
                status: 400,
                message: `Invalid request.${validationError}`
            });
        }
        //Only allows username,password,role parameters
        const updates = Object.keys(req.body);
        const allowedUpdates = ['username', 'password', 'role'];
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

        if (!isValidOperation) {
            return res.status(400).json({ error: 'Invalid updates!' });
        }

        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json();
            }

            if (req.body['password']) {
                req.body['password'] = bcrypt.hashSync(req.body['password'], saltRounds);
            }

            updates.forEach((update) => (user[update] = req.body[update]));
            await user.save();

            res.json(user);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    // Delete a user with path param ID
    static async deleteUser(req, res) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            if (!user) {
                return res.status(404).json();
            }
            res.json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    // Retrieve all users
    static async getAllUsers(req, res) {
        try {
            const users = await User.find({});
            res.json(users);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    // Login
    static async login(req, res) {
        try {
            let validationError = loginSchema.validate(req.body).error;
            if (validationError) {
                return res.status(400).json({
                    status: 400,
                    message: `Invalid request.${validationError}`
                });
            }

            User.findOne({ "username": req.body.username }).exec().then((user) => {

                if (!user) {
                    return res.status(401).json({
                        status: 401,
                        message: "Invalid username or password.",
                    });
                }
                else {

                    //Check password
                    let isValid = false;
                    if (req.body.password && user['password']) {
                        isValid = bcrypt.compareSync(req.body.password, user['password'])
                    }
                    if (!isValid) {
                        return res.status(401).json({
                            status: 401,
                            message: "Invalid username or password.",
                        });
                    }

                    const payload = {
                        username: user.username,
                        role: user.role
                    };
                    var token = jwt.sign(payload, config.jwtSecret, {
                        expiresIn: 60 * 60 * 24
                    });
                    res.status(200).json({
                        message: "You have succesfully loggedin.",
                        token: token
                    });
                }
            })
        } catch (error) { next(error); }

    }

}

router.post('/login', UserController.login);
router.post('/signup', UserController.createUser);
router.post('/users', isAdmin, UserController.createUser);
router.get('/users/:id', isAdmin, UserController.getUser);
router.put('/users/:id', isAdmin, UserController.updateUser);
router.get('/users', isAdmin, UserController.getAllUsers);
router.delete('/users/:id', isAdmin, UserController.deleteUser);

module.exports = router;
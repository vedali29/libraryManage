const express = require('express');
const User = require('../models/User');
const router = express.Router();


//get all users
router.get('/', async (req, res) => {
    try{
        const users = await User.find();
        res.json(users);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
});

//add more user-related routes as needed ,like create, update and delete

//create user
router.post('/', async (req, res) => {
    const user = new User({
        userId: req.body.userId,
        name: req.body.name,
        email: req.body.email
    });
    try{
        const newUser = await user.save();
        res.status(201).json(newUser);
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
});

//delete user
router.delete('/:id', async (req, res) => {
    try{
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        res.json(deletedUser);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
});

//update user
router.patch('/:id', async (req, res) => {
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(updatedUser);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}); 


module.exports = router;
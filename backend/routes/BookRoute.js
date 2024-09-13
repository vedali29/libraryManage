const express = require('express');
const Book = require('../models/Book');
const router = express.Router();

//search books by name or term
router.get('/', async (req, res) => {
    const {searchTerm} = req.query;
    try{
        const books = await Book.find({bookName: {$regex: searchTerm, $options: 'i'} });
        res.json(books);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
});

//get books by rent range
router.get('/range', async (req, res) => {
    const {minRent, maxRent} = req.query;
    try{
        const books = await Book.find({rentPerDay: {$gte: minRent, $lte: maxRent} });
        res.json(books);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
});

module.exports = router;
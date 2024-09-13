const express = require('express');
const Transcation = require('../models/Transcation');
const router = express.Router();
const Book = require('../models/Book');
const User = require('../models/User');

//Issue a book
router.post('/issue', async (req, res) => {
    const {bookId, userId, issueDate} = req.body;

    try{
        const book = await Book.findOne(bookId);
        const user = await User.findOne(userId);

        if(!book || !user){
            return res.status(400).json({message: 'Book or User not found'});
        }

        const transcation = new Transcation({
            bookId,
            userId,
            issueDate,
            returnDate:null,
            totalRent:null
        });

        await transcation.save();
        res.json({message: 'Book issued successfully',transcation});
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
});

//Return a book
router.post('/return', async (req, res) => {
    const {bookId, userId, returnDate} = req.body;
    try{
        const transcation = await Transcation.findOne({bookId, userId,returnDate:null});

        if(!transcation){
            return res.status(400).json({message: 'Transcation not issued'});

        }

        //calculate total rent based on issueDate and returnDate

        const issueDate = transcation.issueDate;
        const rentPerDay = await Book.findOne({bookId}).select('rentPerDay');
        const daysRented = Math.ceil((new Date(returnDate) - new Date(issueDate))/ (1000 * 60 * 60 * 24));
        const totalRent = rentPerDay.rentPerDay * daysRented;
        transcation.returnDate = returnDate;
        transcation.totalRent = totalRent;
        await transcation.save();
        res.json({message: 'Book returned successfully',totalRent});
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
});

module.exports = router;
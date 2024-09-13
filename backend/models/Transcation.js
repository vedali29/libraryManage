const mongoose = require('mongoose');
const transcationSchema = new mongoose.Schema({
    transcationId: {type: String, required: true,unique: true},
    bookId: {type: String, required: true, ref: 'Book'},
    userId: {type: String, required: true, ref: 'User'},
    issueDate: {type: Date, required: true},
    returnDate: {type: Date, required: true},
    totalRent: {type: Number}
})

module.exports = mongoose.model('Transcation',transcationSchema);
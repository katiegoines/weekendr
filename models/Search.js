const 
    mongoose = require('mongoose'),
    searchSchema = new mongoose.Schema({
        search: {type: String, required: true},
        startDate: {type: Date},
        endDate: {type: Date},
        brunch: {type: Boolean},
        lunch: {type: Boolean},
        dinner: {type: Boolean},
        shopping: {type: Boolean},
        music: {type: Boolean},
        quantity: {type: Number},
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    })

const Search = mongoose.model('Search', searchSchema)
module.exports = Search
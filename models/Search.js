const 
    mongoose = require('mongoose'),
    searchSchema = new mongoose.Schema({
        search: {type: String, required: true},
        town: {type: String},
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    })

const Search = mongoose.model('Search', searchSchema)
module.exports = Search
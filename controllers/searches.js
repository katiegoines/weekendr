const 
    Search = require('../models/Search.js')

module.exports = {
    index: (req, res) => {
        Search.find({user: req.user._id}, (err, searches) => {
            res.json(searches)
        })
    },

    create: (req, res) => {
        // console.log(req.body)
        var newSearch = new Search({
            search: req.body.search,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            brunch: req.body.brunch,
            lunch: req.body.lunch,
            dinner: req.body.dinner,
            shopping: req.body.shopping,
            music: req.body.music,
            quantity: req.body.quantity
        })
        newSearch.user = req.params.id
        newSearch.save((err, search) => {
            res.json({success: true, message: "Search saved.", search})
        })
    },

    destroy: (req, res) => {
        Search.findByIdAndRemove(req.params.searchid, (err, search) => {
            res.json({successs: true, message: "Search deleted.", search})
        })
    },
}
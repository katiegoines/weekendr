const 
    Search = require('../models/Search.js')

module.exports = {
    index: (req, res) => {
        Search.find({user: req.user._id}, (err, searches) => {
            res.json(searches)
        })
    },

    create: (req, res) => {
        var newSearch = new Search({search: req.body.address, town: req.body.town})
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
const 
    Search = require('../models/Search.js')

module.exports = {
    index: (req, res) => {
        // console.log(req)
        Search.find({}, (err, searches) => {
            res.json(searches)
        })
    },

    create: (req, res) => {
        // console.log(req.body)
        var newSearch = new Search({search: req.body.address, town: req.body.town})
        newSearch.user = req.params.id
        newSearch.save((er, search) => {
            res.json({success: true, message: "Search saved.", search})
        })
    },

    destroy: (req, res) => {
        Search.findByIdAndRemove(req.params.id, (err, search) => {
            res.json({successs: true, message: "Search deleted.", search})
        })
    },
}
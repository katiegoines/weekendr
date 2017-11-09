const 
    Search = require('../models/Search.js')

module.exports = {
    index: (req, res) => {
        console.log(req.user)
        Search.find({user: req.user._id}, (err, searches) => {
            res.json(searches)
        })
    },

    create: (req, res) => {
        // console.log(req.body)
        var newSearch = new Search({search: req.body.address, town: req.body.town})
        newSearch.user = req.params.id
        newSearch.save((err, search) => {
            res.json({success: true, message: "Search saved.", search})
        })
    },

    show: (req, res) => {
        // console.log(req)
        // Search.findById(req.search._id, (err, search) => {
        //     console.log(search)
        //     res.json(user)
        // })
    },

    destroy: (req, res) => {
        // console.log(req.params)
        Search.findByIdAndRemove(req.params.searchid, (err, search) => {
            res.json({successs: true, message: "Search deleted.", search})
        })
    },
}
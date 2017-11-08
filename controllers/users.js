const 
    User = require('../models/User.js'),
    signToken = require('../serverAuth.js').signToken

module.exports = {
    index: (req, res) => {
        User.find({}, (err, users) => {
            res.json(users)
        })
    },

    show: (req, res) => {
        // console.log(`Current user: ${req.user}`)
        // console.log(req.user._id)
        User.findById(req.user._id, (err, user) => {
            // console.log(user._id)
            res.json(user)
        })
    },

    create: (req, res) => {
        User.create(req.body, (err, user) => {
            if(err) return res.json({success: false, code: err.code})
            const token = signToken(user)
            res.json({success: true, message: "User created. Token attached.", token})
        })
    },

    update: (req, res) => {
        console.log(req.body)
        User.findById(req.params.id, (err, user) => {
            Object.assign(user, req.body)
            user.save((err, updatedUser) => {
                res.json({success: true, message: "User updated.", user: updatedUser})
            })
        })

        // User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, user) => {
        //     res.json({success: true, message: "User updated.", user})
        // })
    },

    destroy: (req, res) => {
        User.findByIdAndRemove(req.params.id, (err, user) => {
            res.json({successs: true, message: "User deleted.", user})
        })
    },

    authenticate: (req, res) => {
        User.findOne({email: req.body.email}, (err, user) => {
            if(!user || !user.validPassword(req.body.password)) {
                return res.json({success: false, message: "Invalid credentials."})
            }
            const token = signToken(user)
            res.json({success: true, message: "Token attached.", token})
        })
    },


}
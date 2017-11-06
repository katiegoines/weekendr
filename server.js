const 
    dontenv = require('dotenv').load(),
    express = require('express'),
    app = express(),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/move-it',
    PORT = process.env.PORT || 3001,
    usersRoutes = require('./routes/users.js')
    // thirdPartyAPIRoutes = require('./routes/thirdpartyapis.js')
    
const
    yelp = require('yelp-fusion'),
    yelpID = process.env.YELP_ID,
    yelpSecret = process.env.YELP_SECRET

mongoose.connect(MONGODB_URI, (err) => {
    console.log(err || "Connected to MongoDB.")
})

app.use(logger('dev'))
app.use(bodyParser.json())

app.get('/api', (req, res) => { 
    res.json({message:"API root."})
})



// app.use('/api/search', thirdPartyAPIRoutes)


app.get('/api/search', (req, res) => {
    console.log(req.params)
    yelp.accessToken(yelpID, yelpSecret)
    .then(response => {
        // console.log(response)
        const client = yelp.client(response.jsonBody.access_token)
        client.search({
            term: req.query.term,
            location: req.query.location
        })
        .then((response) => {
            var results = response.jsonBody.businesses
            // console.log(results)
            res.json(results)
        })
    });
})


app.use('/api/users', usersRoutes)

app.listen(PORT, (err) => {
    console.log(err || `Server running on port ${PORT}.`)
})
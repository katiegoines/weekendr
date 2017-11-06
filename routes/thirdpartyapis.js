const  
    express = require('express'),
    thirdPartyAPIRouter = new express.Router()

const
    yelp = require('yelp-fusion'),
    yelpID = process.env.YELP_ID,
    yelpSecret = process.env.YELP_SECRET

thirdPartyAPIRouter.get('/api/search', (req, res) => {
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
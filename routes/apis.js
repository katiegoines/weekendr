const  
    express = require('express'),
    httpClient = require('request')
    apiRoutes = new express.Router()

const
    yelp = require('yelp-fusion'),
    yelpID = process.env.YELP_ID,
    yelpSecret = process.env.YELP_SECRET,
    walkScoreID = process.env.WALK_SCORE_ID,
    googleID = process.env.GOOGLE_API_KEY


apiRoutes.route('/yelp')
    .get((req, res) => {
        // console.log(req.params)
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

apiRoutes.route('/google')
    .get((req, res) => {
        // console.log(req.query.address)
        var apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.address}&key=${googleID}`
        httpClient.get(apiUrl, (err, response, body) => {
            // console.log(response.body)
            var results = JSON.parse(response.body)
            res.json(results)
        })
        // console.log(req)
    })

apiRoutes.route('/walkscore')
    .get((req, res) => {
        // console.log(req.query.lon)
        var apiUrl = `http://api.walkscore.com/score?format=json&address=${req.query.address}&lat=${req.query.lat}&lon=${req.query.lon}&transit=1&bike=1&wsapikey=${walkScoreID}`
        httpClient.get(apiUrl, (err, response, body) => {
            var results = JSON.parse(response.body)
            // console.log(results)
            res.json(results)
        })
    })



module.exports = apiRoutes
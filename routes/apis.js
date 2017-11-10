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
        yelp.accessToken(yelpID, yelpSecret)
        .then(response => {
            console.log(response)
            const client = yelp.client(response.jsonBody.access_token)
            client.search({
                term: req.query.term,
                location: req.query.location
            })
            .then((response) => {
                var results = response.jsonBody.businesses
                res.json(results)
            })
        });
    })

apiRoutes.route('/google')
    .get((req, res) => {
        var apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.address}&key=${googleID}`
        httpClient.get(apiUrl, (err, response, body) => {
            var results = JSON.parse(response.body)
            res.json(results)
        })
    })

apiRoutes.route('/walkscore')
    .get((req, res) => {
        var apiUrl = `http://api.walkscore.com/score?format=json&address=${req.query.address}&lat=${req.query.lat}&lon=${req.query.lon}&transit=1&bike=1&wsapikey=${walkScoreID}`
        httpClient.get(apiUrl, (err, response, body) => {
            var results = JSON.parse(response.body)
            res.json(results)
        })
    })

apiRoutes.route('/reversegeo')
    .get((req, res) => {
        var apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${req.query.lat},${req.query.lon}&sensor=false`
        httpClient.get(apiUrl, (err, response, body) => {
            var results = JSON.parse(response.body)
            var ac2 = results.results[0].address_components[2].long_name
            var ac3 = results.results[0].address_components[3].short_name
            var ac4 = results.results[0].address_components[4].short_name
            var ac5 = results.results[0].address_components[5].short_name
            res.json(`${ac2}, ${ac3}, ${ac4}, ${ac5}`)
        })
    })

apiRoutes.route('/places')
    .get((req, res) => {
        var apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.query.lat},${req.query.lon}&radius=500&key=${googleID}`
        httpClient.get(apiUrl, (err, response, body) => {
            var results = JSON.parse(response.body)
            if(!!results.results && !!results.results[0] && !!results.results[0].photos) {
                var photoref = results.results[0].photos[0].photo_reference
            res.json({photoref: photoref, apiKey: googleID})
            } else {
                res.json({apiKey: googleID})
            }
            
        })
    })


module.exports = apiRoutes
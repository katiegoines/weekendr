const  
    express = require('express'),
    httpClient = require('request')
    apiRoutes = new express.Router()

const
    yelp = require('yelp-fusion'),
    // yelpID = process.env.YELP_ID,
    // yelpSecret = process.env.YELP_SECRET,
    walkScoreID = process.env.WALK_SCORE_ID,
    googleID = process.env.GOOGLE_API_KEY,
    eventfulID = process.env.EVENTFUL_API_KEY
    yelpKey = process.env.API_KEY


//Request for all Yelp Searches - prior to Mar 2017
// apiRoutes.route('/yelp')
//     .get((req, res) => {
//         yelp.accessToken(yelpID, yelpSecret)
//         .then(response => {
//             const client = yelp.client(response.jsonBody.access_token)
//             client.search({
//                 categories: req.query.categories,
//                 location: req.query.location
//             })
//             .then((response) => {
//                 // console.log(response.body)
//                 var results = response.jsonBody.businesses
//                 res.json(results)
//             })
//             .catch(e => {
//                 // console.log(e)
//                 if(e.name == "RestCallResponseFiltersUnhandledStatusError") {
//                     res.json(e)
//                 }
//             })
//         });
//     })

// Request for all Yelp Searches - after March 2017
apiRoutes.route('/yelp')
.get((req, res) => {
    const client = yelp.client(yelpKey)
    client.search({
        term: req.query.categories,
        location: req.query.location
    }).then(response => {
        // console.log(response.jsonBody.businesses)
        res.json(response.jsonBody.businesses)
    }).catch(e => {
        console.log(e);
    });
})

apiRoutes.route('/eventful')
    .get((req, res) => {
        // console.log(req.query.dateRange)
        var apiUrl = `https://api.eventful.com/json/events/search?app_key=${eventfulID}&location=${req.query.location}&category=${req.query.category}&date=${req.query.dateRange}&sort_order=popularity&within=15&scheme=https`        
        httpClient.get(apiUrl, (err, response, body) => {
            // var results = JSON.parse(response.body)
            // console.log(results)
            // res.json(results)
            // console.log(JSON.parse(response.body))
            // res.json(JSON.parse(response.body))
            res.json(response.body)
        })
    })


apiRoutes.route('/geocode')
    .get((req, res) => {
        var apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.search}&key=${googleID}`
        httpClient.get(apiUrl, (err, response, body) => {
            var results = JSON.parse(response.body)
            // console.log(results)
            res.json(results)
        })
    })

// apiRoutes.route('/walkscore')
//     .get((req, res) => {
//         var apiUrl = `http://api.walkscore.com/score?format=json&address=${req.query.address}&lat=${req.query.lat}&lon=${req.query.lon}&transit=1&bike=1&wsapikey=${walkScoreID}`
//         httpClient.get(apiUrl, (err, response, body) => {
//             var results = JSON.parse(response.body)
//             res.json(results)
//         })
//     })

apiRoutes.route('/places')
    .get((req, res) => {
        var apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${googleID}&location=${req.query.lat},${req.query.lon}&radius=50000&type=${req.query.category}`
        httpClient.get(apiUrl, (err, response, body) => {
            var results = JSON.parse(response.body)
            res.json({results, apiKey: googleID})
        })
    })


module.exports = apiRoutes
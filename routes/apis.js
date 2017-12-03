const  
    express = require('express'),
    httpClient = require('request')
    apiRoutes = new express.Router()

const
    yelp = require('yelp-fusion'),
    yelpID = process.env.YELP_ID,
    yelpSecret = process.env.YELP_SECRET,
    walkScoreID = process.env.WALK_SCORE_ID,
    googleID = process.env.GOOGLE_API_KEY,
    eventfulID = process.env.EVENTFUL_API_KEY


//Request for all Yelp Searches
apiRoutes.route('/yelp')
    .get((req, res) => {
        yelp.accessToken(yelpID, yelpSecret)
        .then(response => {
            const client = yelp.client(response.jsonBody.access_token)
            client.search({
                term: req.query.term,
                location: req.query.location
            })
            .then((response) => {
                // console.log(response.body)
                var results = response.jsonBody.businesses
                res.json(results)
            })
            .catch(e => {
                // console.log(e)
                if(e.name == "RestCallResponseFiltersUnhandledStatusError") {
                    res.json(e)
                }
            })
        });
    })

apiRoutes.route('/eventful')
    .get((req, res) => {
        // console.log(req.query.dateRange)
        var apiUrl = `https://api.eventful.com/json/events/search?app_key=${eventfulID}&location=${req.query.location}&category=${req.query.category}&date=${req.query.dateRange}&sort_order=popularity&within=15`        
        httpClient.get(apiUrl, (err, response, body) => {
            var results = JSON.parse(response.body)
            // console.log(results)
            res.json(results)
        })
    })


// apiRoutes.route('/google')
//     .get((req, res) => {
//         var apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.address}&key=${googleID}`
//         httpClient.get(apiUrl, (err, response, body) => {
//             var results = JSON.parse(response.body)
//             res.json(results)
//         })
//     })

// apiRoutes.route('/walkscore')
//     .get((req, res) => {
//         var apiUrl = `http://api.walkscore.com/score?format=json&address=${req.query.address}&lat=${req.query.lat}&lon=${req.query.lon}&transit=1&bike=1&wsapikey=${walkScoreID}`
//         httpClient.get(apiUrl, (err, response, body) => {
//             var results = JSON.parse(response.body)
//             res.json(results)
//         })
//     })

// apiRoutes.route('/reversegeo')
//     .get((req, res) => {
//         var apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${req.query.lat},${req.query.lon}&sensor=false`
//         httpClient.get(apiUrl, (err, response, body) => {
//             var results = JSON.parse(response.body)
//             // console.log(results.results[0].address_components)
//             var ac2 = results.results[0].address_components[2].long_name
//             var ac3 = results.results[0].address_components[3].short_name
//             var ac4 = results.results[0].address_components[4].short_name
//             if(!!results.results[0].address_components[5]) {
//                 var ac5 = results.results[0].address_components[5].short_name
//             } else {
//                 var ac5 = ""
//             }
//             res.json(`${ac2}, ${ac3}, ${ac4}, ${ac5}`)
//         })
//     })

// apiRoutes.route('/places')
//     .get((req, res) => {
//         var apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.query.lat},${req.query.lon}&radius=500&key=${googleID}`
//         httpClient.get(apiUrl, (err, response, body) => {
//             var results = JSON.parse(response.body)
//             if(!!results.results && !!results.results[0] && !!results.results[0].photos) {
//                 var photoref = results.results[0].photos[0].photo_reference
//             res.json({photoref: photoref, apiKey: googleID})
//             } else {
//                 res.json({apiKey: googleID})
//             }
            
//         })
//     })


module.exports = apiRoutes
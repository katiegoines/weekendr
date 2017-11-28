import React from 'react'
import axios from 'axios'

class Search extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false,                                                                                                             // For implementing a "Exploring..." note while data APIs are accessed
            error: false,                                                                                                               // If data from Yelp is unavailable, let user know the location is not available on Move It!
            ready: false,                                                                                                               // If all data has been gathered, populate page
            address: '',                                                                                                                // Query entered into search field
            yelpRestaurants: {head: "", list: []},                                                                                      // List populated from yelpRestaurantSearch() - NOTE: will provide 20 listings, changing limit had no effect
            yelpActivities: {head: "", list: []},                                                                                       // List populated from yelpActivitySearch() - NOTE: will provide 20 listings, changing limit had no effect       
            yelpRetail: {head: "", list: []},                                                                                           // List populated from yelpRetailSearch() - NOTE: will provide 20 listings, changing limit had no effect
            yelpGyms: {head: "", list: []},                                                                                             // List populated from yelpGymSearch() - NOTE: will provide 20 listings, changing limit had no effect
            lng: '',                                                                                                                    // Longitude from Google Geocode request
            lat: '',                                                                                                                    // Latitude from Google Geocode request
            walkscore: {
                head: '',                                                                                                               // Heading to be populated once request is made so that it doesn't show on page until the query has been made
                walkscore: null, 
                description: '', 
                logo_url: '',
                moreinfo: ''
            },
            photoref:'',                                                                                                                // From Google Places request
            photo: '',                                                                                                                  // URL
            map: '',                                                                                                                    // From Google Static Maps request 
            town: ''                                                                                                                    // From Google Reverse Geo
        }
    }

    // Before the component mounts:
    componentWillMount() {                                       
        if(!!localStorage.search) {                                                                                                     // If there is something set to localStorage.search (if you clicked a saved search within your account), set the address and town to the data saved in localStorage
            this.setState({
                address: localStorage.search,
                town: localStorage.town
            })
        }
    }
    
    // When the component mounts:
    componentDidMount() {                                       
        if(!!localStorage.search) {                                                                                                     // If there is something set to localStorage.search, run onFormSubmit()
            this.onFormSubmit()
        }
    }

    // When text is typed into the search bar:
    onInputChange(evt) {                                         
		this.setState({                                                                                                                 // Set the state to the text in the search bar
			address: evt.target.value
		})
    }

    // When the search form is submitted:
    onFormSubmit(evt) {
        if(!localStorage.search) evt.preventDefault()                                                                                   // If localStorage.search is empty, don't reload the page
        this.setState({loading: true, error: false})                                                                                    // Set the this.state.loading to true so that the "Exploring" message appears, and set the this.state.error to false so the "Coming soon..." message does not appear
        this.yelpRestaurantSearch()                                                                                                     // Run yelpRestaurantSearch()
        // setTimeout(this.yelpRestaurantSearch.bind(this), 500) 
        // this.reference = ''  DONT THINK I NEED THIS                                           
    }
    
    // Get Yelp results for a query
    yelpRestaurantSearch() {
        axios({method: 'get', url: `/api/search/yelp?term=restaurants&location=${this.state.address}`})                                 // Run an axios request to the Yelp API for "restaurants" with the location set to whatever was typed in the search bar
        .then((res) => { 
            // console.log(res.data)
            if(res.data.fullType === "rest-call.response-filters.unhandled-status") {                                                   // Then, if there is an error, throw an error
                throw new Error("error")
            } else {
                this.setState({yelpRestaurants: {list: res.data, head: "Restaurants"}})                                                 // If there is not an error, store the restaurant data in the state to be rendered
            }
        })
        .then(() => {
            this.yelpActivitySearch()                                                                                                   // Then, run yelpActivitySearch(), yelpRetailSearch(), and yelpGymSearch() - these run after yelpRestaurantSearch() so that if the error is caught, the process ends.
            this.yelpRetailSearch()
            this.yelpGymSearch()
            // this.codeAddress()
        })
        .catch(e => {
            this.setState({error: true});                                                                                               // If there's an error, set this.state.error to true, so the "Coming soon..." message appears
        })
    }

    // Get Yelp results for a query
    yelpActivitySearch() {
        axios({method: 'get', url: `/api/search/yelp?term=activity&location=${this.state.address}`})                                    // Run an axios request to the Yelp API for "activity" with the location set to whatever was typed in the search bar
        .then((res) => {
            this.setState({yelpActivities: {list: res.data, head: "Activities"}})
        })
        // .then(() => {
        //     this.yelpRetailSearch()
        // })
        .catch(e => {
            console.log(e);
        })
    }

    // Get Yelp results for a query
    yelpRetailSearch() {
        axios({method: 'get', url: `/api/search/yelp?term=shopping&location=${this.state.address}`})                                    // Run an axios request to the Yelp API for "shopping" with the location set to whatever was typed in the search bar
        .then((res) => {
            this.setState({yelpRetail: {list: res.data, head: "Shopping"}})
        })
        // .then(() => {
        //     this.yelpGymSearch()
        // })
        .catch(e => {
            console.log(e);
        })
    }

    // Get Yelp results for a query
    yelpGymSearch() {
        axios({method: 'get', url: `/api/search/yelp?term=fitness&location=${this.state.address}`})                                     // Run an axios request to the Yelp API for "fitness" with the location set to whatever was typed in the search bar
        .then((res) => {
            this.setState({yelpGyms: {list: res.data, head: "Fitness"}})
        })
        .then(() => {
            this.codeAddress()                                                                                                          // Then run codeAddress() - needs to run after the Yelp searches so that these are definitely finished when the PlacesSearch runs
        })
        .catch(e => {
            console.log(e);
        })
    }

    // Get Google longitude and latitude for search query put in search field
    codeAddress() {
        var addr = this.state.address
        axios({method: 'get', url: `api/search/google?address=${addr}`})
        .then((res) => {
            // console.log(res.data)
            this.setState({                                                                                                             // Then store the longitude and latitude in state
                    lng: res.data.results[0].geometry.location.lng, 
                    lat: res.data.results[0].geometry.location.lat
            })
        })
        .then((res) => {                                                                                                                // Then run walkScoreSearch(), reverseGeo(), and placesSearch()
            this.walkScoreSearch()
            this.reverseGeo()
            this.placesSearch()
        })
    }

    // Get the WalkScore using query typed in search field, longitude/latituded provided from Google Geocode
    walkScoreSearch() {
        var addr = this.state.address
        var lat = this.state.lat
        var lng = this.state.lng
        axios({method: 'get', url: `api/search/walkscore?address=${addr}&lat=${lat}&lon=${lng}`})
        .then((res) => {
            this.setState({walkscore:
                {
                    head: "Walkability by ",
                    walkscore: res.data.walkscore,
                    description: res.data.description,
                    logo_url: res.data.logo_url,
                    moreinfo: res.data.ws_link
                }
            })
        })
    }

    // Get location name using longitude/latitude provided from Google Geocode
    reverseGeo() {
        var lat = this.state.lat
        var lng = this.state.lng
        axios({method: 'get', url: `api/search/reversegeo?lat=${lat}&lon=${lng}`})
        .then((res) => {
            this.setState({town: res.data})
            // this.placesSearch()
        })
    }

    // Get photo of place using longitude/latitude
    placesSearch() {
        var lat = this.state.lat
        var lng = this.state.lng
        axios({method: 'get', url: `api/search/places?lat=${lat}&lon=${lng}`})
        .then((res) => {
            this.reference = res.data.photoref                                                                                          // Set photo reference to data recieved from axious call to Google Places
            var yR = this.state.yelpRestaurants.list
            var yS = this.state.yelpRetail.list
            var yF = this.state.yelpGyms.list
            var yA = this.state.yelpActivities.list
            if(!!this.reference) {
                this.setState({
                    photo: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=700&photoreference=${this.reference}&key=${res.data.apiKey}`      // Use photo reference to get photo of location from Google Places
                })         
            } else {
                this.setState({
                    photo: 'https://tctechcrunch2011.files.wordpress.com/2015/08/clouds.jpg'                                                            // If no photo exists, use this photo of clouds.
                })
            }
            console.log(yR.length >= 7)
            console.log(yS.length >= 7)
            console.log(yF.length >= 7)
            console.log(yA.length >= 7)
            if(yR.length >= 7 && yS.length >= 7 && yF.length >= 7 && yA.length >= 7) {                                                                      // Also, if the Yelp searches provided 7 or more results, plot these places on the Google Map
                console.log("OKAY")
                this.setState({
                    map: `https://maps.googleapis.com/maps/api/staticmap?
                    center=${this.state.lat},${this.state.lng}
                    &size=700x500&scale=2&maptype=roadmap
                    &markers=size:mid%7Ccolor:0x048BA8%7Clabel:R%7C${yR[0].coordinates.latitude},${yR[0].coordinates.longitude}
                        |${yR[1].coordinates.latitude},${yR[1].coordinates.longitude}
                        |${yR[2].coordinates.latitude},${yR[2].coordinates.longitude}
                        |${yR[3].coordinates.latitude},${yR[3].coordinates.longitude}
                        |${yR[4].coordinates.latitude},${yR[4].coordinates.longitude}
                        |${yR[5].coordinates.latitude},${yR[5].coordinates.longitude}
                        |${yR[6].coordinates.latitude},${yR[6].coordinates.longitude}
                    &markers=size:mid%7Ccolor:0x99C24D%7Clabel:S%7C${yS[0].coordinates.latitude},${yS[0].coordinates.longitude}
                        |${yS[1].coordinates.latitude},${yS[1].coordinates.longitude}
                        |${yS[2].coordinates.latitude},${yS[2].coordinates.longitude}
                        |${yS[3].coordinates.latitude},${yS[3].coordinates.longitude}
                        |${yS[4].coordinates.latitude},${yS[4].coordinates.longitude}
                        |${yS[5].coordinates.latitude},${yS[5].coordinates.longitude}
                        |${yS[6].coordinates.latitude},${yS[6].coordinates.longitude}
                    &markers=size:mid%7Ccolor:0x2E4057%7Clabel:F%7C${yF[0].coordinates.latitude},${yF[0].coordinates.longitude}
                        |${yF[1].coordinates.latitude},${yF[1].coordinates.longitude}
                        |${yF[2].coordinates.latitude},${yF[2].coordinates.longitude}
                        |${yF[3].coordinates.latitude},${yF[3].coordinates.longitude}
                        |${yF[4].coordinates.latitude},${yF[4].coordinates.longitude}
                        |${yF[5].coordinates.latitude},${yF[5].coordinates.longitude}
                        |${yF[6].coordinates.latitude},${yF[6].coordinates.longitude}
                    &markers=size:mid%7Ccolor:0xF18F01%7Clabel:A%7C${yA[0].coordinates.latitude},${yA[0].coordinates.longitude}
                        |${yA[1].coordinates.latitude},${yA[1].coordinates.longitude} 
                        |${yA[2].coordinates.latitude},${yA[2].coordinates.longitude}
                        |${yA[3].coordinates.latitude},${yA[3].coordinates.longitude}
                        |${yA[4].coordinates.latitude},${yA[4].coordinates.longitude}
                        |${yA[5].coordinates.latitude},${yA[5].coordinates.longitude}
                        |${yA[6].coordinates.latitude},${yA[6].coordinates.longitude}               
                    &key=${res.data.apiKey}`})   
            } else {
                this.setState({
                    map: `https://maps.googleapis.com/maps/api/staticmap?
                    center=${this.state.lat},${this.state.lng}
                    &zoom=10
                    &size=700x500&scale=2&maptype=roadmap             
                    &key=${res.data.apiKey}`})   
            }           
        })
        .then(() => {                                                                                       
            this.setState({loading: false})                         // Then set the loading to false so that the "Exploring..." message goes away
            this.setState({ready: true})                            // And set the ready to true so that the results populate on the page
        })
    }

    // Before the component unmounts: 
    componentWillUnmount() {
        localStorage.removeItem('search')                           // Remove search and town from localStorage
        localStorage.removeItem('town')
    }
    
    // To save a search to your account
    saveButton() {
        const id = this.props.currentUser._id
        axios({method: 'post', url: `/api/users/${id}/searches`, data: {address: this.state.address, town: this.state.town}})
        .then((res) => {
            this.props.history.push(`/profile`)
        })
    }

    // To clear search results to create a new search
    newSearch() {
        localStorage.removeItem('search')
        localStorage.removeItem('town')
        this.setState({
            error: false,
            loading: false,
            address: '',
            yelpRestaurants: {head: "", list: []},
            yelpActivities: {head: "", list: []},            
            yelpRetail: {head: "", list: []},
            yelpGyms: {head: "", list: []},
            lng: '',
            lat: '',
            walkscore: {
                head: '',
                walkscore: null,
                description: '',
                logo_url: '',
                moreinfo: ''
            },
            photoref:'',
            photo: '',
            map: '',
            town: ''
        })
    }
	
	render() {
        const { address } = this.state
            return (
                <div className='Search'>
                    {this.state.ready}
                    <div className="search-heading">
                        {!this.state.town
                            ? <h2>Where Do You Wanna Go?</h2>
                            : <h2 className="white-text">Where Do You Wanna Go?</h2>}
                    </div>
                    
                    <div className="search-form">
                        
                        {!localStorage.search && !this.state.town
                        ? (<div>
                                <form onChange={this.onInputChange.bind(this)} onSubmit={this.onFormSubmit.bind(this)}>
                                    <input type="text" placeholder="Address or City, State, Zip" name="address" value={address} />
                                </form>
                                
                            </div>)
                        : <div><h3>{this.state.town}</h3></div>}
                        <div className="search-buttons">
                        {!localStorage.search
                            ? <button onClick={this.onFormSubmit.bind(this)} className="button button-outline left-button">Go</button>
                            : <button onClick={this.onFormSubmit.bind(this)} className="button button-outline left-button" >Back</button>}
                        {this.props.currentUser
                            ? <button className="button button-outline middle-button" onClick={this.saveButton.bind(this)}>Save Search</button> 
                            : null}
                        <button className="button button-outline right-button" onClick={this.newSearch.bind(this)}>New Search</button>
                        </div>
                    </div>
                {!!this.state.loading
                    ? <div><h3 className="exploring">Exploring...</h3></div>
                    : null
                }

                {!!this.state.error
                    ? <div><h3>Coming soon. Please try another location!</h3></div>
                    : null
                }

                
                {!this.state.ready
                ? null
                : (
                    <div>
                        <div className="search-images">
                            {/* <div className="background-img-box"> */}
                                {!!this.state.photo
                                    ? <img className="background-img object-fit_cover" src={this.state.photo} alt="" />
                                    : null
                                }
                            {/* </div> */}
                            {/* <div className="map-box"> */}
                                <img className="map" src={this.state.map} alt="" />
                            </div>
                            <div className="walk-score">
                                <h3><a href={this.state.walkscore.moreinfo} target="_blank" rel="noopener noreferrer">{this.state.walkscore.head} </a><img className="c-im" src={this.state.walkscore.logo_url} alt=""/></h3>
                                <div>
                                    {this.state.walkscore.walkscore}
                                    <div><small>{this.state.walkscore.description}</small></div>
                                </div>
                            {/* </div> */}
                        </div>

                        <div className="search-results">
                            {<div className="search-category"><h3>{this.state.yelpRestaurants.head}</h3></div>}
                            {this.state.yelpRestaurants.list.slice(0, 7).map(el => {
                                return (
                                    <div key={el.id} className="card-2">
                                        <img className="card-img-2 object-fit_cover" src={el.image_url} alt="" />
                                        <div className="card-overlay"> 
                                            <div className="card-title"><a href={el.url} target="_blank">{el.name}</a></div>
                                            <div className="card-info">
                                                <div className="yelp-categories">{el.categories.map((cat, i)=> {
                                                    return (
                                                        <span key={i}>{` - ${cat.title} - `}</span>
                                                    )
                                                })}</div>
                                                <div className="body-text">
                                                    <div>{el.location.address1}</div>
                                                    <div>{el.location.city}</div>
                                                    <div>{`${(el.distance * 0.000621371192).toFixed(2)}mi away`}</div>
                                                    <div>{`Price: ${el.price}`}</div>
                                                    <div>{`Rating: ${el.rating} (${el.review_count} reviews)`}</div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}

                            {<div className="search-category"><h3>{this.state.yelpActivities.head}</h3></div>}
                            {this.state.yelpActivities.list.slice(0, 7).map(el => {
                                return (
                                    <div key={el.id} className="card-2">
                                        <img className="card-img-2 object-fit_cover" src={el.image_url} alt="" />
                                        <div className="card-overlay"> 
                                            <div className="card-title"><a href={el.url} target="_blank">{el.name}</a></div>
                                            <div className="card-info">
                                                <div className="yelp-categories">{el.categories.map((cat, i)=> {
                                                    return (
                                                        <span key={i}>{` - ${cat.title} - `}</span>
                                                    )
                                                })}</div>
                                                <div className="body-text">
                                                    <div>{el.location.address1}</div>
                                                    <div>{el.location.city}</div>
                                                    <div>{`${(el.distance * 0.000621371192).toFixed(2)}mi away`}</div>
                                                    <div>{`Price: ${el.price}`}</div>
                                                    <div>{`Rating: ${el.rating} (${el.review_count} reviews)`}</div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}

                            {<div className="search-category"><h3>{this.state.yelpRetail.head}</h3></div>}
                            {this.state.yelpRetail.list.slice(0, 7).map(el => {
                                return (
                                    <div key={el.id} className="card-2">
                                        <img className="card-img-2 object-fit_cover" src={el.image_url} alt="" />
                                        <div className="card-overlay"> 
                                            <div className="card-title"><a href={el.url} target="_blank">{el.name}</a></div>
                                            <div className="card-info">
                                                <div className="yelp-categories">{el.categories.map((cat, i)=> {
                                                    return (
                                                        <span key={i}>{` - ${cat.title} - `}</span>
                                                    )
                                                })}</div>
                                                <div className="body-text">
                                                    <div>{el.location.address1}</div>
                                                    <div>{el.location.city}</div>
                                                    <div>{`${(el.distance * 0.000621371192).toFixed(2)}mi away`}</div>
                                                    <div>{`Price: ${el.price}`}</div>
                                                    <div>{`Rating: ${el.rating} (${el.review_count} reviews)`}</div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}

                            {<div className="search-category"><h3>{this.state.yelpGyms.head}</h3></div>}
                            {this.state.yelpGyms.list.slice(0, 7).map(el => {
                                return (
                                    <div key={el.id} className="card-2">
                                        <img className="card-img-2 object-fit_cover" src={el.image_url} alt="" />
                                        <div className="card-overlay"> 
                                            <div className="card-title"><a href={el.url} target="_blank">{el.name}</a></div>
                                            <div className="card-info">
                                                <div className="yelp-categories">{el.categories.map((cat, i)=> {
                                                    return (
                                                        <span key={i}>{` - ${cat.title} - `}</span>
                                                    )
                                                })}</div>
                                                <div className="body-text">
                                                    <div>{el.location.address1}</div>
                                                    <div>{el.location.city}</div>
                                                    <div>{`${(el.distance * 0.000621371192).toFixed(2)}mi away`}</div>
                                                    <div>{`Price: ${el.price}`}</div>
                                                    <div>{`Rating: ${el.rating} (${el.review_count} reviews)`}</div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}
                </div>
            )
    }
}

export default Search
import React from 'react'
import axios from 'axios'

class Search extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            ready: false,
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
        }
    }

    componentWillMount() {
        if(!!localStorage.search) {
            this.setState({
                address: localStorage.search,
                town: localStorage.town
            })
        }
    }

    componentDidMount() {
        if(!!localStorage.search) {
            this.onFormSubmit()
            
        }
    }
    
    componentWillUnmount() {
        localStorage.removeItem('search')
        localStorage.removeItem('town')
    }


	onInputChange(evt) {
		this.setState({
			address: evt.target.value
		})
    }

    yelpRestaurantSearch() {
        axios({method: 'get', url: `/api/search/yelp?term=restaurants&location=${this.state.address}`})
        .then((res) => {
            this.setState({yelpRestaurants: {list: res.data, head: "Restaurants"}})
        })
        .then(() => {
            this.yelpActivitySearch()
        })
        .catch(e => {
            console.log(e);
        })
    }

    yelpActivitySearch() {
        axios({method: 'get', url: `/api/search/yelp?term=activity&location=${this.state.address}`})
        .then((res) => {
            this.setState({yelpActivities: {list: res.data, head: "Activities"}})
        })
        .then(() => {
            this.yelpRetailSearch()
        })
        .catch(e => {
            console.log(e);
        })
    }

    yelpRetailSearch() {
        axios({method: 'get', url: `/api/search/yelp?term=shopping&location=${this.state.address}`})
        .then((res) => {
            this.setState({yelpRetail: {list: res.data, head: "Shopping"}})
        })
        .then(() => {
            this.yelpGymSearch()
        })
        .catch(e => {
            console.log(e);
        })
    }

    yelpGymSearch() {
        axios({method: 'get', url: `/api/search/yelp?term=fitness&location=${this.state.address}`})
        .then((res) => {
            this.setState({yelpGyms: {list: res.data, head: "Fitness"}})
        })
        .then(() => {
            this.codeAddress()   
        })
        .catch(e => {
            console.log(e);
        })
    }

    
    codeAddress() {
        var addr = this.state.address
        axios({method: 'get', url: `api/search/google?address=${addr}`})
        .then((res) => {
            // console.log(res.data)
            this.setState({
                    lng: res.data.results[0].geometry.location.lng, 
                    lat: res.data.results[0].geometry.location.lat
            })
        })
        .then((res) => {
            this.walkScoreSearch()
        })
    }

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
        .then((res) => {
            this.reverseGeo()
        })
    }

    reverseGeo() {
        var lat = this.state.lat
        var lng = this.state.lng
        axios({method: 'get', url: `api/search/reversegeo?lat=${lat}&lon=${lng}`})
        .then((res) => {
            this.setState({town: res.data})
            this.placesSearch()
        })
    }

    placesSearch() {
        var lat = this.state.lat
        var lng = this.state.lng
        axios({method: 'get', url: `api/search/places?lat=${lat}&lon=${lng}`})
        .then((res) => {
            this.reference = res.data.photoref
            var yR = this.state.yelpRestaurants.list
            var yS = this.state.yelpRetail.list
            var yF = this.state.yelpGyms.list
            var yA = this.state.yelpActivities.list
            if(!!this.reference) {
                this.setState({
                    photo: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=700&photoreference=${this.reference}&key=${res.data.apiKey}`
                })         
            } else {
                this.setState({
                    photo: 'https://tctechcrunch2011.files.wordpress.com/2015/08/clouds.jpg'
                })
            }
            if(yR.length > 7 && yS.length > 7 && yF.length > 7 && yA.length > 7) {
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
            this.setState({loading: false})
            this.setState({ready: true})
        })
    }
    
    saveButton() {
        const id = this.props.currentUser._id
        axios({method: 'post', url: `/api/users/${id}/searches`, data: {address: this.state.address, town: this.state.town}})
        .then((res) => {
            this.props.history.push(`/profile`)
        })
    }

    newSearch() {
        localStorage.removeItem('search')
        localStorage.removeItem('town')
        this.setState({
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

	onFormSubmit(evt) {
        if(!localStorage.search) evt.preventDefault()
        this.setState({loading: "true"})
        setTimeout(this.yelpRestaurantSearch.bind(this), 500)
        this.reference = ''
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
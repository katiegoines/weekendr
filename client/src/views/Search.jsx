import React from 'react'
import axios from 'axios'

class Search extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            address: '',
            yelpRestaurants: {head: "", list: []},
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
            town: ''
        }
    }

	
    
    componentWillMount() {
        // console.log(this.props.currentUser)
        // console.log(!!localStorage)
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
    
    yelpSearch() {
        this.yelpRestaurantSearch()
        this.yelpRetailSearch()
        this.yelpGymSearch()
    }

    yelpRestaurantSearch() {
        axios({method: 'get', url: `/api/search/yelp?term=restaurants&location=${this.state.address}`})
        .then((res) => {
            // console.log(res.data)
            this.setState({yelpRestaurants: {list: res.data, head: "Restaurants"}})
        })
        .catch(e => {
            console.log(e);
        })
    }

    yelpRetailSearch() {
        axios({method: 'get', url: `/api/search/yelp?term=shopping&limit=4&location=${this.state.address}`})
        .then((res) => {
            // console.log(res.data)
            this.setState({yelpRetail: {list: res.data, head: "Shopping"}})
        })
        .catch(e => {
            console.log(e);
        })
    }

    yelpGymSearch() {
        axios({method: 'get', url: `/api/search/yelp?term=fitness&limit=4&location=${this.state.address}`})
        .then((res) => {
            // console.log(res.data)
            this.setState({yelpGyms: {list: res.data, head: "Fitness"}})
        })
        .catch(e => {
            console.log(e);
        })
    }

    /*
    codeAddress() {
        var addr = this.state.address
        axios({method: 'get', url: `api/search/google?address=${addr}`})
        .then((res) => {
            // console.log(res.data.results[0].geometry.location.lat)
            this.setState({
                    lng: res.data.results[0].geometry.location.lng, 
                    lat: res.data.results[0].geometry.location.lat
            })
        })
        .then((res) => {
            this.walkScoreSearch()
        })
        .then((res) => {
            this.reverseGeo()
        })
    }

    walkScoreSearch() {
        var addr = this.state.address
        var lat = this.state.lat
        var lng = this.state.lng
        axios({method: 'get', url: `api/search/walkscore?address=${addr}&lat=${lat}&lon=${lng}`})
        .then((res) => {
            // console.log(res.data)
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

    reverseGeo() {
        var lat = this.state.lat
        var lng = this.state.lng
        axios({method: 'get', url: `api/search/reversegeo?lat=${lat}&lon=${lng}`})
        .then((res) => {
            // console.log(res.data)
            this.setState({town: res.data})
            this.placesSearch()
        })
    }

    placesSearch() {
        var lat = this.state.lat
        var lng = this.state.lng
        axios({method: 'get', url: `api/search/places?query=${this.state.town}&lat=${lat}&lon=${lng}`})
        .then((res) => {
            // console.log(res.data.photoref)
            this.reference = res.data.photoref
            this.setState({photoref: res.data.photoref, photo: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=900&photoreference=${this.reference}&key=${res.data.apiKey}`})            
        })
    }
    */

    saveButton() {
        // console.log("Clicked save.")
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
            yelpRetail: {head: "", list: []},
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
            town: ''
        })
    }

	onFormSubmit(evt) {
        if(!localStorage.search) evt.preventDefault()
        // console.log(this.state.address)
        this.yelpSearch()
        // this.codeAddress()
        // this.setState({address:""})
        this.reference = ''
    }
    
	
	render() {
		const { address } = this.state
		return (
			<div className='Search'>
                 {/* <div className="background" >
                    <img className="background-img" src={this.state.photo} alt="" />
                    <h2><span className="town">{this.state.town}</span></h2>
                </div> */}
                <div className="search-results">
                    <div className="search-category"><h3>{this.state.yelpRestaurants.head}</h3></div>
                    {this.state.yelpRestaurants.list.slice(0, 7).map(el => {
                        return (
                                <img className="card-img-2" key={el.id} src={el.image_url} alt="" />
                        )
                    })}

                    <div className="search-category"><h3>{this.state.yelpRetail.head}</h3></div>
                    {this.state.yelpRetail.list.slice(0, 7).map(el => {
                        return (
                                <img className="card-img-2" key={el.id} src={el.image_url} alt="" />
                        )
                    })}

                    <div className="search-category"><h3>{this.state.yelpGyms.head}</h3></div>
                    {this.state.yelpGyms.list.slice(0, 7).map(el => {
                        return (
                                <img className="card-img-2" key={el.id} src={el.image_url} alt="" />
                        )
                    })}
                </div>
                
                <div className="middle-section-box">
                    <div className="middle-section">
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
                            {!localStorage.search
                                ? <button onClick={this.onFormSubmit.bind(this)} className="button button-outline left-button">Go</button>
                                : <button onClick={this.onFormSubmit.bind(this)} className="button button-outline left-button display-none" >Go</button>}
                            {/* <button onClick={this.onFormSubmit.bind(this)} className="button button-outline left-button">Go</button> */}
                            {this.props.currentUser
                                ? <button className="button button-outline middle-button" onClick={this.saveButton.bind(this)}>Save Search</button> 
                                : null}
                            <button className="button button-outline right-button" onClick={this.newSearch.bind(this)}>New Search</button>
                            
                        </div>
                    </div>
                </div>

               
                
                {/* <div className="yelp-restaurants">
                    <h3>{this.state.yelpRestaurants.head}</h3>
                    {this.state.yelpRestaurants.list.slice(0, 5).map(el => {
                        return (

                            <div key={el.id} className="card"> 
                                <div className="card-img-box">
                                    <img className="card-img" src={el.image_url} alt="" />
                                </div>
                                <div className="card-title"><a href={el.url} target="_blank">{el.name}</a></div>
                                <div className="card-info">
                                    <div className="yelp-categories">{el.categories.map((cat, i)=> {
                                        return (
                                            <span key={i}>{` - ${cat.title} - `}</span>
                                        )
                                    })}</div>
                                    <div>{el.location.address1}</div>
                                    <div>{el.location.city}</div>
                                    <div>{`${(el.distance * 0.000621371192).toFixed(2)}mi away`}</div>
                                    <div>{`Price: ${el.price}`}</div>
                                    <div>{`Rating: ${el.rating} (${el.review_count} reviews)`}</div>
                                    
                                </div>

                            </div>
                       
                    
                    
                        )
                    })}
                </div>
                

                <div className="yelp-nail-salons">
                    <h3>{this.state.yelpRetail.head}</h3>
                    {this.state.yelpRetail.list.slice(0, 5).map(el => {
                        return (
                        
                            <div key={el.id} className="card"> 
                                <div className="card-img-box">
                                    <img className="card-img" src={el.image_url} alt="" />
                                </div>
                                <div className="card-title"><a href={el.url} target="_blank">{el.name}</a></div>
                                <div className="card-info">
                                    <div className="yelp-categories">{el.categories.map((cat, i)=> {
                                        return (
                                            <span key={i}>{` - ${cat.title} - `}</span>
                                        )
                                    })}</div>
                                    <div>{el.location.address1}</div>
                                    <div>{el.location.city}</div>
                                    <div>{`${(el.distance * 0.000621371192).toFixed(2)}mi away`}</div>
                                    <div>{`Price: ${el.price}`}</div>
                                    <div>{`Rating: ${el.rating} (${el.review_count} reviews)`}</div>
                                    
                                </div>

                            </div>
                        )
                    })}
                </div> */}

                <div className="walk-score">
                    <h3><a href={this.state.walkscore.moreinfo} target="_blank" rel="noopener noreferrer">{this.state.walkscore.head} </a><img className="c-im" src={this.state.walkscore.logo_url} alt=""/></h3>
                    <div>
                        {this.state.walkscore.walkscore}
                        <div><small>{this.state.walkscore.description}</small></div>
                    </div>
                </div>
                
			</div>
		)
	}
}

export default Search
import React from 'react'
import axios from 'axios'
import clientAuth from '../clientAuth'

class Search extends React.Component {
	state = {
        address: '',
        yelpRestaurants: {head: "", list: []},
        yelpNailSalons: {head: "", list: []},
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
    
    componentWillMount() {
        console.log(!!localStorage)
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
            console.log(res.data)
            this.setState({yelpRestaurants: {list: res.data, head: "Restaurants"}})
        })
    }

    yelpNailSalonSearch() {
        axios({method: 'get', url: `/api/search/yelp?term=shopping&limit=4&location=${this.state.address}`})
        .then((res) => {
            // console.log(res.data)
            this.setState({yelpNailSalons: {list: res.data, head: "Shopping"}})
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
        console.log("Clicked save.")
        const id = clientAuth.getCurrentUser()._id
        axios({method: 'post', url: `/api/users/${id}/searches`, data: {address: this.state.address, town: this.state.town}})
        .then((res) => {
            console.log(res)
        })
    }

    newSearch() {
        localStorage.removeItem('search')
        localStorage.removeItem('town')
        this.setState({
            address: '',
            yelpRestaurants: {head: "", list: []},
            yelpNailSalons: {head: "", list: []},
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
        if(!localStorage.search) {
            evt.preventDefault()
        }
        // console.log(this.state.address)
        this.yelpRestaurantSearch()
        this.yelpNailSalonSearch()
        // this.codeAddress()
        // this.setState({address:""})
        this.reference = ''
    }
    
	
	render() {
		const { address } = this.state
		return (
			<div className='Search'>
                <div className="search-heading">
                    <h2>Where Do You Wanna Go?</h2>
                </div>
                <div className="search-form">
                    {!localStorage.search
                    ? (
                        <div>
                        <form onChange={this.onInputChange.bind(this)} onSubmit={this.onFormSubmit.bind(this)}>
                            <input type="text" placeholder="Address or City, State, Zip" name="address" value={address} />
                            <button className="button button-outline">Search</button>
                        </form>
                        <div>{clientAuth.getCurrentUser() ? <button className="button button-outline" onClick={this.saveButton.bind(this)}>Save Search</button> : null }</div>
                        </div>
                    )
                    : null
                    }

                    <button className="button button-outline" onClick={this.newSearch.bind(this)}>New Search</button>
                </div>
				


                

				

                

                <div className="background" >
                    <img className="background-img" src={this.state.photo} alt="" />
                    <h2><span className="town">{this.state.town}</span></h2>
                </div>
                
                <div className="yelp-restaurants">
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
                    <h3>{this.state.yelpNailSalons.head}</h3>
                    {this.state.yelpNailSalons.list.slice(0, 5).map(el => {
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
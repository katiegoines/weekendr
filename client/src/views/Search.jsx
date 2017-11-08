import React from 'react'
import axios from 'axios'

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
        photoref:''
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
        axios({method: 'get', url: `/api/search/yelp?term=nail salon&location=${this.state.address}`})
        .then((res) => {
            // console.log(res.data)
            this.setState({yelpNailSalons: {list: res.data, head: "Nail Salons"}})
        })
    }

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
            this.town = res.data
            this.placesSearch()
        })
    }

    placesSearch() {
        var lat = this.state.lat
        var lng = this.state.lng
        axios({method: 'get', url: `api/search/places?query=${this.town}&lat=${lat}&lon=${lng}`})
        .then((res) => {
            // this.setState({photoref: res.data.photoref})
            // console.log(res.data.photoref)
            this.reference = res.data.photoref
            this.photo = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1920&photoreference=${this.reference}&key=${res.data.apiKey}`
        })
    }

	onFormSubmit(evt) {
        evt.preventDefault()
        // console.log(this.state.address)
        this.yelpRestaurantSearch()
        this.yelpNailSalonSearch()
        this.codeAddress()
        // this.setState({address:""})
        this.reference = ''
    }
    
	
	render() {
		const { address } = this.state
		return (
			<div className='Search'>
				<h1>Search Address</h1>

				<form onChange={this.onInputChange.bind(this)} onSubmit={this.onFormSubmit.bind(this)}>
					<input type="text" placeholder="Address or City, State, Zip" name="address" value={address} />
					<button>Search</button>
				</form>

                <div>
                    {<img src={this.photo} alt="" />}
                    <h2>{this.town}</h2>
                </div>
                
                <div className="yelp-restaurants">
                    <h2>{this.state.yelpRestaurants.head}</h2>
                    {this.state.yelpRestaurants.list.map(el => {
                        return (

                            <div key={el.id} className="card"> 
                                <div className="card-img-box">
                                    <img className="card-img" src={el.image_url} alt="" />
                                </div>
                                <div className="card-title">{el.name}</div>

                            </div>
                       
                    
                    
                        )
                    })}
                </div>

                <div className="yelp-nail-salons">
                    <h2>{this.state.yelpNailSalons.head}</h2>
                    {this.state.yelpNailSalons.list.map(el => {
                        return (
                        <div key={el.id}>{el.name}</div>
                        )
                    })}
                </div>

                <div className="walk-score">
                    <h2><a href={this.state.walkscore.moreinfo} target="_blank" rel="noopener noreferrer">{this.state.walkscore.head} </a><img className="c-im" src={this.state.walkscore.logo_url} alt=""/></h2>
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
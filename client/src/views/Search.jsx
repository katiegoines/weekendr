import React from 'react'
import axios from 'axios'

class Search extends React.Component {
	state = {
        address: '',
        yelpRestaurants: {head: "", list: []},
        yelpNailSalons: {head: "", list: []},
	}

	onInputChange(evt) {
		this.setState({
			address: evt.target.value
		})
	}


    yelpRestaurantSearch() {
        axios({method: 'get', url: `/api/search?term=restaurants&location=${this.state.address}`})
        .then((res) => {
            // console.log(res.data)
            this.setState({yelpRestaurants: {list: res.data, head: "Restaurants"}})
        })
    }

    yelpNailSalonSearch() {
        axios({method: 'get', url: `/api/search?term=nail salon&location=${this.state.address}`})
        .then((res) => {
            console.log(res.data)
            this.setState({yelpNailSalons: {list: res.data, head: "Nail Salons"}})
        })
    }

	onFormSubmit(evt) {
        evt.preventDefault()
        console.log(this.state.address)
        this.yelpRestaurantSearch()
        this.yelpNailSalonSearch()
    }
    
	
	render() {
		const { address } = this.state
		return (
			<div className='Search'>
				<h1>Search an Address</h1>

				<form onChange={this.onInputChange.bind(this)} onSubmit={this.onFormSubmit.bind(this)}>
					<input type="text" placeholder="Address or City, State, Zip" name="address" value={address} />
					<button>Search</button>
				</form>
                
                <div className="yelp-restaurants">
                    <h2>{this.state.yelpRestaurants.head}</h2>
                    {this.state.yelpRestaurants.list.map(el => {
                        return (
                        <div key={el.id}>{el.name}</div>
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
                
			</div>
		)
	}
}

export default Search
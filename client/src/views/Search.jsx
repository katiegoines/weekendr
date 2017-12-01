import React from 'react'
// import axios from 'axios'
// import { Route } from 'react-router-dom'
import SearchForm from './search/SearchForm'
import YelpRestaurants from './search/YelpRestaurants'



class Search extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            showResults: true,
            run: false,
            loading: false, 
            error: false,
            ready: false,
            search: '',
            town: '',
            lat: '',
            lon: '',
            active: {
                restaurants: true,
            },
        }
        this.onCheckbox = this.onCheckbox.bind(this)
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onNewSearch = this.onNewSearch.bind(this)
        this.yelpRestaurantResults = this.yelpRestaurantResults.bind(this)
    }

    onFormSubmit(search) {
        // console.log(search)
        this.setState({search: search, run: true})
    }

    onCheckbox(active) {
        console.log(active)
        this.setState({active: active})
    }

    onNewSearch() {
        this.setState({search: '', showResults: true})
    }

    yelpRestaurantResults(returnedResults) {
        this.setState({results: {
            yelpRestaurants: returnedResults
        }})
    }

	render() {
        return (
            <div className="search-page">
                <div className="search-heading">
                    <h1>Where will you be this weekend*?</h1>
                    
                </div>
                <div className="form">
                    <SearchForm {...this.props} onCheckbox={this.onCheckbox} onSubmit={this.onFormSubmit} onNewSearch={this.onNewSearch} />
                </div>

                {this.state.showResults
                ? <h1>SHOW RESULTS</h1>
                : <h1>CLEAR RESULTS</h1>
                }

                {this.state.run && this.state.active.restaurants
                ? (<div className="results">
                    <YelpRestaurants {...this.props} showResults={this.state.showResults} yrResultsCP={this.yelpRestaurantResults} run={this.state.run} search={this.state.search} />
                </div>)
                : null
                }
                
                
                <div className="page-end">
                    <small>*Definitely not limited to just weekends</small>
                </div>
            </div>
            
        )
    }
}

export default Search
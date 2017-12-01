import React from 'react'
// import axios from 'axios'
// import { Route } from 'react-router-dom'
import SearchForm from './search/SearchForm'
import YelpRestaurants from './search/YelpRestaurants'



class Search extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            clearAll: false,
            run: false,
            loading: false, 
            error: false,
            ready: false,
            search: '',
            town: '',
            lat: '',
            lon: '',
            selection: {
                restaurants: false,
                shopping: false,
                activities: false,
            },
            results: {
                yelpRestaurants: {active: false, head: "", list: []}
            }
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onNewSearch = this.onNewSearch.bind(this)
        this.yelpRestaurantResults = this.yelpRestaurantResults.bind(this)
    }

    onFormSubmit(search) {
        // console.log(search)
        this.setState({search: search, run: true})
    }

    onNewSearch() {
        this.setState({search: '', clearAll: true})
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
                    <SearchForm {...this.props} onSubmit={this.onFormSubmit} onNewSearch={this.onNewSearch} />
                </div>
                {this.state.run && !this.state.clearAll
                ? (<div className="results">
                    <YelpRestaurants {...this.props} clearAll={this.state.clearAll} yrResultsCP={this.yelpRestaurantResults} yrResultsPC={this.state.results.yelpRestaurants} run={this.state.run} search={this.state.search} />
                </div>)
                : null}
                
                
                <div className="page-end">
                    <small>*Definitely not limited to weekends</small>
                </div>
            </div>
            
        )
    }
}

export default Search
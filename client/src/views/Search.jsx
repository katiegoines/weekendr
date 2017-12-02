import React from 'react'
import SearchForm from './search/SearchForm'
import YelpRestaurants from './search/YelpRestaurants'
import YelpShopping from './search/YelpShopping'

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
                shopping: true,
            },
            startDate: '',
            endDate: ''
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onNewSearch = this.onNewSearch.bind(this)
    }

    componentDidMount() {
        // console.log(this.state)
    }

    componentDidUpdate() {
        console.log(this.state)
    }

    onFormSubmit(forsubmit) {
        this.setState({run: true, search: forsubmit.search, startDate: forsubmit.startDate, endDate: forsubmit.endDate, active: forsubmit.active})
    }

    onNewSearch() {
        this.setState({search: '', showResults: true, run: false})
    }

	render() {
        return (
            <div className="search-page">
                <div className="search-heading">
                    <h1>Where will you be this weekend?</h1>
                    
                </div>
                <div className="form">
                    <SearchForm {...this.props} onCheckbox={this.onCheckbox} onSubmit={this.onFormSubmit} onNewSearch={this.onNewSearch} />
                </div>

                {!!this.state.run && !!this.state.active.restaurants
                ? (<span className="results">
                    <YelpRestaurants {...this.props} showResults={this.state.showResults} run={this.state.run} search={this.state.search} />
                </span>)
                : null
                }

                {!!this.state.run && !!this.state.active.shopping
                ? (<span className="results">
                    <YelpShopping {...this.props} showResults={this.state.showResults} run={this.state.run} search={this.state.search} />
                </span>)
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
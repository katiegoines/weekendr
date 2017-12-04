import React from 'react'
import SearchForm from './search/SearchForm'
// import YelpRestaurants from './search/YelpRestaurants'
import Brunch from './search/Brunch'
import Lunch from './search/Lunch'
import Dinner from './search/Dinner'
import YelpShopping from './search/YelpShopping'
import Music from './search/Music'

class Search extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            showResults: true,
            run: false,
            loading: false, 
            error: false,
            ready: false,
            town: '',
            lat: '',
            lon: '',
            fromForm: {
                search: '',
                brunch: true,
                lunch: true,
                dinner: true,
                shopping: true,
                music: true,
                startDate: '',
                endDate: '',
                quantity: ''
            },
            
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onNewSearch = this.onNewSearch.bind(this)
    }

    componentDidMount() {
        console.log(this.state)
    }

    componentDidUpdate() {
        console.log(this.state)
    }

    onFormSubmit(forsubmit) {
        this.setState({run: true, fromForm: forsubmit})
    }

    onNewSearch() {
        this.setState({fromForm: {search: ''}, showResults: true, run: false})
    }

	render() {
        const s = this.state
        return (
            <div className="search-page">
                <div className="search-heading">
                    <h1>Where will you be this weekend?</h1>
                    
                </div>
                <div className="form">
                    <SearchForm {...this.props} onCheckbox={this.onCheckbox} onSubmit={this.onFormSubmit} onNewSearch={this.onNewSearch} />
                </div>

                {!!s.run && s.fromForm.search === ''
                ? null
                : ( <span>
                    {!!s.run && !!s.fromForm.brunch
                    ? (<span className="results">
                        <Brunch {...this.props} showResults={s.showResults} run={s.run} search={s.fromForm.search} quantity={s.fromForm.quantity} />
                    </span>)
                    : null
                    }
    
                    {!!s.run && !!s.fromForm.lunch
                    ? (<span className="results">
                        <Lunch {...this.props} showResults={s.showResults} run={s.run} search={s.fromForm.search} quantity={s.fromForm.quantity} />
                    </span>)
                    : null
                    }
    
                    {!!s.run && !!s.fromForm.dinner
                    ? (<span className="results">
                        <Dinner {...this.props} showResults={s.showResults} run={s.run} search={s.fromForm.search} quantity={s.fromForm.quantity} />
                    </span>)
                    : null
                    }
    
                    {!!s.run && !!s.fromForm.shopping
                    ? (<span className="results">
                        <YelpShopping {...this.props} showResults={s.showResults} run={s.run} search={s.fromForm.search} quantity={s.fromForm.quantity} />
                    </span>)
                    : null
                    }
                    
                    {!!s.run && !!s.fromForm.music
                    ? (<span className="results">
                        <Music {...this.props} showResults={s.showResults} run={s.run} search={s.fromForm.search} startDate={s.fromForm.startDate} endDate={s.fromForm.endDate} quantity={s.fromForm.quantity} />
                    </span>)
                    : null
                    }
                    </span>)
                }

                
                
                <div className="page-end">
                    <small>*Definitely not limited to just weekends</small>
                </div>
            </div>
            
        )
    }
}

export default Search
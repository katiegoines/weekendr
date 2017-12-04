import React from 'react'
import SearchForm from './search/SearchForm'
import Results from './search/Results'

class Search extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            run: false,
            // loading: false, 
            error: false,
            savedSearch: false,
            // town: '',
            // lat: '',
            // lon: '',
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
            }
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onNewSearch = this.onNewSearch.bind(this)
        this.onBackSearch = this.onBackSearch.bind(this)
    }

    componentDidMount() {
        console.log(this.state)
    }

    componentDidUpdate() {
        console.log(this.state)
    }

    onFormSubmit(forsubmit) {
        if(forsubmit.search !== '') {
           this.setState({run: true, fromForm: forsubmit}) 
        }
        
    }

    onNewSearch(run) {
        this.setState({fromForm: {search: ''}, run: run})
    }

    onBackSearch(run) {
        this.setState({
            run: run,
            savedSearch: true,
            fromForm: {
                search: localStorage.getItem('search'),
                startDate: localStorage.getItem('startDate'),
                endDate: localStorage.getItem('endDate'),
                brunch: JSON.parse(localStorage.getItem('brunch')),
                lunch: JSON.parse(localStorage.getItem('lunch')),
                dinner: JSON.parse(localStorage.getItem('dinner')),
                shopping: JSON.parse(localStorage.getItem('shopping')),
                music: JSON.parse(localStorage.getItem('music')),
                quantity: JSON.parse(localStorage.getItem('quantity')),

            }
        })
    }

	render() {
        const s = this.state
        return (
            <div>
                    <div className="results">
                        {!s.run 
                            ? <div className="search-page">
                                <div className="search-heading">
                                    <h1>Where will you be this weekend?</h1>
                                </div>
                                <div className="form">
                                    <SearchForm 
                                        {...this.props} 
                                        onCheckbox={this.onCheckbox} 
                                        onSubmit={this.onFormSubmit} 
                                        onNewSearch={this.onNewSearch}
                                        fromForm={s.fromForm}
                                        savedSearch={s.savedSearch} />
                                </div>
                            </div>
                            : <Results 
                                {...this.props}
                                run={s.run} 
                                fromForm={s.fromForm}
                                onNewSearch={this.onNewSearch}
                                onBackSearch={this.onBackSearch} />
                        }              
                    </div>  
                    <div className="page-end">
                        <small>*Definitely not limited to just weekends</small>
                    </div>
            </div>
            
        )
    }
}

export default Search


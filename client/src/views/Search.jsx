import React from 'react'
import SearchForm from './search/SearchForm'
import Results from './search/Results'

class Search extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            run: false,
            error: false,
            savedSearch: false,
            fromForm: {
                search: '',
                lon: '', 
                lat: '',
                brunch: true,
                cafes: true,
                vegetarian: true,
                foodstands: true,
                desserts: true,
                breweries: true,
                wineries: true,
                cocktails: true,
                pubs: true,
                clubs: true,
                antiques: true,
                media: true,
                sportinggoods: true,
                fashion: true,
                fleamarkets: true,
                hiking: true,
                museums: true,
                zoos: true,
                spas: true,
                parks: true,
                music: true,
                sports: true,
                performingarts: true,
                comedy: true,
                technology: true,
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
        if(localStorage.getItem('saved') === "true") {
            this.setState({
                run: true,
                fromForm: JSON.parse(localStorage.getItem('formInfo'))
            })
        }
    }

    componentDidUpdate() {
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
            fromForm: JSON.parse(localStorage.getItem('formInfo'))            
        })
    }

	render() {
        const s = this.state
        return (
            <div>
                {!!s.run && s.fromForm.search === ''
                    ? null
                    : <div className="results">
                        {!s.run
                            ? <div className="search-page">
                                <div className="search-heading">
                                    <div className="swirly-font swirly-heading">Weekendr</div>
                                    <h1>What do you wanna do this weekend?</h1>
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
                                currentUser={this.props.currentUser}
                                run={s.run} 
                                fromForm={s.fromForm}
                                onNewSearch={this.onNewSearch}
                                onBackSearch={this.onBackSearch} />
                        }              
                    </div> 
                }
            </div>
        )
    }
}

export default Search


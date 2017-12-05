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
                lunch: true,
                dinner: true,
                shopping: true,
                music: true,
                museums: true,
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
                                    <h1>What are you up to this weekend?</h1>
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


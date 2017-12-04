import React from 'react'
import SearchForm from './search/SearchForm'
import Results from './search/Results'

class Search extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            run: false,
            loading: false, 
            error: false,
            tileView: true,
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
            }
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
        if(forsubmit.search !== '') {
           this.setState({run: true, fromForm: forsubmit}) 
        }
        
    }

    onNewSearch() {
        this.setState({fromForm: {search: ''}, run: false})
    }

	render() {
        const s = this.state
        return (
            <div className="search-page">
                <div className="search-heading">
                    <h1>Where will you be this weekend?</h1>
                    
                </div>
                <div className="form">
                    <SearchForm 
                        {...this.props} 
                        onCheckbox={this.onCheckbox} 
                        onSubmit={this.onFormSubmit} 
                        onNewSearch={this.onNewSearch} />
                </div>

                <div className="results">
                    {!s.run && s.fromForm.search === ''
                        ? null
                        : <Results 
                            {...this.props}
                            run={s.run} 
                            fromForm={s.fromForm}
                            // search={s.fromForm.search} 
                            // quantity={s.fromForm.quantity} 
                            tileView={s.tileView}  />
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


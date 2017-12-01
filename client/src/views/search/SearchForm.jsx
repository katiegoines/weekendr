import React from 'react'
// import axios from 'axios'


class SearchForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            showResults: false,
            submitted: false,
            input: '',
            search: '',
            active: {
                restaurants: false
            }
        }

        this.submitSearchTerm = this.submitSearchTerm.bind(this)
        this.newSearch = this.newSearch.bind(this)
    }

    onInputChange(evt) {  
        // console.log(evt.target)                                       
		this.setState({                                                                                                                                 // Set the state to the text in the search bar
            search: evt.target.value
        })
    }

    checkbox() {
        this.setState({active: {restaurants: !this.state.active.restaurants}})
        const { onCheckbox } = this.props
        onCheckbox(this.state.active)
        // console.log(this.state.active)
    }

    submitSearchTerm(evt, otherStuff) {
        evt.preventDefault()
        this.setState({submitted: true})
        const { onSubmit } = this.props
        onSubmit(this.state.search)

        const { onCheckbox } = this.props
        onCheckbox(this.state.active)
        // console.log(this.state.active)
    }

    newSearch() {
        // console.log("SearchForm")
        this.setState({submitted: false, showResults: true, search: '', input: '', active: {restaurants: false}})
        const {onNewSearch} = this.props
        onNewSearch(this.state.showResults)
    }

    

	render() {
        return (
            <div className="search-form">
                {this.state.submitted === false
                 ? (<div>
                        <form  onSubmit={this.submitSearchTerm.bind(this)} >
                            <input onChange={this.onInputChange.bind(this)} type="text" placeholder="Address or City, State, Zip" name="address" value={this.state.search} />
                            <input type="checkbox" id="restaurants" value="restaurants" onClick={this.checkbox.bind(this)} />
                            <label className="label-inline" htmlFor="restaurants">Restaurants</label>

                        </form>
                        <button onClick={this.submitSearchTerm.bind(this)} className="button button-outline left-button">Go</button>
                    </div>)
                  : <div>
                        <h2 className="search-heading">{this.state.search}</h2>
                        <button className="button button-outline right-button" onClick={this.newSearch.bind(this)}>New Search</button>
                    </div>
             
                }
                {/* <button className="button button-outline middle-button" onClick={this.saveButton.bind(this)}>Save Search</button>  */}
            </div>
            
        )
    }
}

export default SearchForm
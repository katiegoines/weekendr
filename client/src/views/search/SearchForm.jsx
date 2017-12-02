import React from 'react'

class SearchForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            showResults: false,
            submitted: false,
            input: '',
            
            forsubmit: {
                search: '' ,
                startDate: '', 
                endDate: '',
                active: {
                    restaurants: true,
                    shopping: true
                }
            }
        }

        this.submitSearchTerm = this.submitSearchTerm.bind(this)
        this.newSearch = this.newSearch.bind(this)
    }

    componentDidMount() {
    }

    onInputChange(evt) {  
        const fs = this.state.forsubmit
        this.setState({
            forsubmit: {
                search: evt.target.value, 
                startDate: fs.startDate,
                active: {restaurants: fs.active.restaurants, shopping: fs.active.shopping}
            }
        })        
    }

    onInputChangeStartDate(evt) {  
        const fs = this.state.forsubmit        
        this.setState({
            forsubmit: {
                search: fs.search, 
                startDate: evt.target.value, 
                endDate: fs.endDate, 
                active: {restaurants: fs.active.restaurants, shopping: fs.active.shopping}
            }
        })        
    }

    onInputChangeEndDate(evt) {  
        const fs = this.state.forsubmit        
        this.setState({
            forsubmit: {
                search: fs.search, 
                startDate: fs.startDate, 
                endDate: evt.target.value, 
                active: {restaurants: fs.active.restaurants, shopping: fs.active.shopping}
            }
        })        
    }

    checkboxRestaurant(evt) {
        var toggle = !this.state.forsubmit.active.restaurants
        this.setState({forsubmit: {active: {restaurants: toggle, shopping: this.state.forsubmit.active.shopping}}})
    }

    checkboxShopping() {
        var toggle = !this.state.forsubmit.active.shopping
        this.setState({forsubmit: {active: {shopping: toggle, restaurants: this.state.forsubmit.active.restaurants}}})
    }

    submitSearchTerm(evt) {
        evt.preventDefault()
        this.setState({submitted: true})
        const { onSubmit } = this.props
        onSubmit(this.state.forsubmit)
    }

    newSearch() {
        this.setState({submitted: false, showResults: true, input: '', forsubmit: {search: '', active: {restaurants: true, shopping: true}}})
        const {onNewSearch} = this.props
        onNewSearch(this.state.showResults)
    }

	render() {
        return (
            <div className="search-form">
                {this.state.submitted === false
                 ? (<div>
                        <form  onSubmit={this.submitSearchTerm.bind(this)} >
                            <input 
                                type="text" 
                                name="address" 
                                placeholder="Address or City, State, Zip" 
                                value={this.state.forsubmit.search}
                                onChange={this.onInputChange.bind(this)}  />
                            <input 
                                type="date" 
                                name="startDate" 
                                placeholder="Start Date" 
                                value={this.state.forsubmit.startDate}
                                onChange={this.onInputChangeStartDate.bind(this)} />
                            <input 
                                type="date" 
                                name="endDate" 
                                placeholder="End Date" 
                                value={this.state.forsubmit.endDate}
                                onChange={this.onInputChangeEndDate.bind(this)} />
                            <div>
                                <span className="checkbox">
                                    <input 
                                        type="checkbox" 
                                        name="restaurants" 
                                        value='' 
                                        onChange={this.checkboxRestaurant.bind(this)} 
                                        defaultChecked />
                                    <label className="label-inline" htmlFor="restaurants">Restaurants</label>
                                </span>
                                <span className="checkbox">
                                    <input 
                                        type="checkbox" 
                                        name="shopping" 
                                        value='' 
                                        onChange={this.checkboxShopping.bind(this)} 
                                        defaultChecked />
                                    <label className="label-inline" htmlFor="shopping">Shopping</label>
                                </span>
                            </div>
                            

                        </form>
                        <button 
                            onClick={this.submitSearchTerm.bind(this)} 
                            className="button button-outline left-button">Go
                        </button>
                    </div>)
                  : <div>
                        <h2 className="search-heading">{this.state.forsubmit.search}</h2>
                        <button 
                            className="button button-outline right-button" 
                            onClick={this.newSearch.bind(this)}>New Search
                        </button>
                    </div>
             
                }
                {/* <button className="button button-outline middle-button" onClick={this.saveButton.bind(this)}>Save Search</button>  */}
            </div>
            
        )
    }
}

export default SearchForm
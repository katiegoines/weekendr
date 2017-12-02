import React from 'react'
// import axios from 'axios'


class SearchForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            showResults: false,
            submitted: false,
            input: '',
            
            forsubmit: {
                active: {
                    restaurants: true,
                    shopping: true
                },
                search: ''  
            }
            
        }

        this.submitSearchTerm = this.submitSearchTerm.bind(this)
        this.newSearch = this.newSearch.bind(this)
    }

    componentDidMount() {
        // console.log('restaurant: ' + this.state.forsubmit.active.restaurants + " -- shopping: " + this.state.forsubmit.active.shopping)
        // console.log(this.state.forsubmit)
    }

    onInputChange(evt) {  
        // console.log(evt.target)  
        this.setState({forsubmit: {search: evt.target.value, active: {restaurants: this.state.forsubmit.active.restaurants, shopping: this.state.forsubmit.active.shopping}}})
        // console.log(this.state.forsubmit)
        
    }

    checkboxRestaurant(evt) {
        var toggle = !this.state.forsubmit.active.restaurants
        console.log(toggle)
        this.setState({forsubmit: {active: {restaurants: toggle, shopping: this.state.forsubmit.active.shopping}}})
        
        // console.log('clicked restaurant| ' + 'restaurant: ' + this.state.forsubmit.active.restaurants + " -- shopping: " + this.state.forsubmit.active.shopping)
    }

    checkboxShopping() {
        var toggle = !this.state.forsubmit.active.shopping
        console.log(toggle)
        this.setState({forsubmit: {active: {shopping: toggle, restaurants: this.state.forsubmit.active.restaurants}}})
        console.log('clicked shopping| restaurant: ' + this.state.forsubmit.active.restaurants + " -- shopping: " + this.state.forsubmit.active.shopping)
    }

    submitSearchTerm(evt) {
        
        evt.preventDefault()
        this.setState({submitted: true})
        const { onSubmit } = this.props
        onSubmit(this.state.forsubmit)
        
        // console.log(this.state.forsubmit)
    }

    newSearch() {
        // console.log("SearchForm")
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
                            <input onChange={this.onInputChange.bind(this)} type="text" placeholder="Address or City, State, Zip" name="address" value={this.state.forsubmit.search} />

                            <input type="checkbox" id="restaurants" name="restaurants" value='' onChange={this.checkboxRestaurant.bind(this)} defaultChecked />
                            <label className="label-inline" htmlFor="restaurants">Restaurants</label>

                            
                            <input type="checkbox" id="shopping" name="shopping" value='' onChange={this.checkboxShopping.bind(this)} defaultChecked />
                            <label className="label-inline" htmlFor="shopping">Shopping</label>

                        </form>
                        <button onClick={this.submitSearchTerm.bind(this)} className="button button-outline left-button">Go</button>
                    </div>)
                  : <div>
                        <h2 className="search-heading">{this.state.forsubmit.search}</h2>
                        <button className="button button-outline right-button" onClick={this.newSearch.bind(this)}>New Search</button>
                    </div>
             
                }
                {/* <button className="button button-outline middle-button" onClick={this.saveButton.bind(this)}>Save Search</button>  */}
            </div>
            
        )
    }
}

export default SearchForm
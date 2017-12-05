import React from 'react'
import axios from 'axios'


class SearchForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            showResults: false,
            submitted: false,
            input: '',
            blank: '',
            tileView: true,
            all: true,
            forsubmit: {
                search: '' ,
                lon: 0,
                lat: 0,
                startDate: '', 
                endDate: '',
                brunch: true,
                lunch: true,
                dinner: true,
                shopping: true,
                music: true,
                museums: true,
                quantity: 1,
            }
        }
        this.submitSearchTerm = this.submitSearchTerm.bind(this)
        this.codeAddress = this.codeAddress.bind(this)
        this.onInputChange = this.onInputChange.bind(this)
        this.checkboxAll = this.checkboxAll.bind(this)
        this.checkbox = this.checkbox.bind(this)
        this.quantity = this.quantity.bind(this)
    }

    componentWillMount() {
        if(!!this.props.savedSearch) {
            this.setState({forsubmit: this.props.fromForm})
        }
    }

    onInputChange(evt) {  
        this.setState({
            forsubmit: {
                ...this.state.forsubmit,
                [evt.target.name]: evt.target.value
            }
        }) 
    }

    checkbox(evt) {
        if(evt.target.value === "true") {
            this.setState({
                forsubmit: {
                    ...this.state.forsubmit,
                    [evt.target.name]: false
                }
            })
        } else if (evt.target.value === "false") {
            this.setState({
                forsubmit: {
                    ...this.state.forsubmit,
                    [evt.target.name]: true
                }
            })
        }
    }

    checkboxAll(evt) {
        if(evt.target.value === "true") {
            this.setState({
                all: false,
                forsubmit: {
                    ...this.state.forsubmit,
                    brunch: false,
                    lunch: false,
                    dinner: false,
                    shopping: false,
                    music: false,
                    museums: false
                }
            })
        } else if (evt.target.value === "false") {
            this.setState({
                all: true,
                forsubmit: {
                    ...this.state.forsubmit,
                    brunch: true,
                    lunch: true,
                    dinner: true,
                    shopping: true,
                    music: true,
                    museums: true
                }
            })
        }
    }

    quantity(evt) {
        this.setState({
            forsubmit: {
                ...this.state.forsubmit,
                [evt.target.name]: evt.target.value
            }
        })
    }

    submitSearchTerm(evt) {
        evt.preventDefault()
        this.codeAddress()
    }

    codeAddress() {
        var search = this.state.forsubmit.search
        axios({method: 'get', url: `api/search/geocode?search=${search}`})
        .then((res) => {
            console.log(search)
            console.log(res.data.results[0].geometry.location.lng)
            console.log(res.data.results[0].geometry.location.lat)            
            this.setState({ 
                forsubmit: {
                    ...this.state.forsubmit, 
                    lon: res.data.results[0].geometry.location.lng,
                    lat: res.data.results[0].geometry.location.lat
                }
            })
        })
        .then((res) => {
            if(this.state.forsubmit.search === '') {
                this.setState({blank: 'blank'})
            } else {
                localStorage.removeItem('saved')
    
                localStorage.setItem('search', this.state.forsubmit.search)
                localStorage.setItem('startDate', this.state.forsubmit.startDate)
                localStorage.setItem('endDate', this.state.forsubmit.endDate)
                localStorage.setItem('lon', this.state.forsubmit.lon)
                localStorage.setItem('lat', this.state.forsubmit.lat)                
                localStorage.setItem('brunch', this.state.forsubmit.brunch)
                localStorage.setItem('lunch', this.state.forsubmit.lunch)
                localStorage.setItem('dinner', this.state.forsubmit.dinner)
                localStorage.setItem('shopping', this.state.forsubmit.shopping)
                localStorage.setItem('music', this.state.forsubmit.music)
                localStorage.setItem('museums', this.state.forsubmit.museums)
                localStorage.setItem('quantity', this.state.forsubmit.quantity)
                this.setState({submitted: true})  
            }
            const { onSubmit } = this.props
            onSubmit(this.state.forsubmit)
        })
    }

   

	render() {
        return (
            <div className="search-form">
                <div>
                    <div className="form-box">
                        <form  onSubmit={this.submitSearchTerm} >
                            <input 
                                type="text"
                                id={this.state.blank} 
                                name="search" 
                                placeholder="Address or City, State, Zip" 
                                value={this.state.forsubmit.search}
                                onChange={this.onInputChange}  />
                            <div className="dates">
                                <span className="date-label">from</span>
                                <input 
                                    type="date" 
                                    name="startDate" 
                                    value={this.state.forsubmit.startDate}
                                    onChange={this.onInputChange} />
                                <span className="date-label">to</span>
                                <input 
                                    type="date" 
                                    name="endDate" 
                                    value={this.state.forsubmit.endDate}
                                    onChange={this.onInputChange} />
                            </div>
                            
                            <div>
                                <span className="checkbox">
                                    <input 
                                        type="checkbox" 
                                        name="all" 
                                        value={this.state.all}
                                        onChange={this.checkboxAll} 
                                        checked={this.state.all} />
                                    <label className="label-inline" htmlFor="brunch">Check/Uncheck All</label>
                                </span>
                                <span className="checkbox">
                                    <input 
                                        type="checkbox" 
                                        name="brunch" 
                                        value={this.state.forsubmit.brunch}
                                        onChange={this.checkbox} 
                                        checked={this.state.forsubmit.brunch} />
                                    <label className="label-inline" htmlFor="brunch">Brunch</label>
                                </span>
                                <span className="checkbox">
                                    <input 
                                        type="checkbox" 
                                        name="lunch" 
                                        value={this.state.forsubmit.lunch}
                                        onChange={this.checkbox} 
                                        checked={this.state.forsubmit.lunch} />
                                    <label className="label-inline" htmlFor="lunch">Lunch</label>
                                </span>
                                <span className="checkbox">
                                    <input 
                                        type="checkbox" 
                                        name="dinner" 
                                        value={this.state.forsubmit.dinner}
                                        onChange={this.checkbox} 
                                        checked={this.state.forsubmit.dinner} />
                                    <label className="label-inline" htmlFor="dinner">Dinner</label>
                                </span>
                                <span className="checkbox">
                                    <input 
                                        type="checkbox" 
                                        name="shopping" 
                                        value={this.state.forsubmit.shopping}
                                        onChange={this.checkbox} 
                                        checked={this.state.forsubmit.shopping} />
                                    <label className="label-inline" htmlFor="shopping">Shopping</label>
                                </span>
                                <span className="checkbox">
                                    <input 
                                        type="checkbox" 
                                        name="music" 
                                        value={this.state.forsubmit.music}
                                        onChange={this.checkbox} 
                                        checked={this.state.forsubmit.music} />
                                    <label className="label-inline" htmlFor="music">Music</label>
                                </span>
                                <span className="checkbox">
                                    <input 
                                        type="checkbox" 
                                        name="museums" 
                                        value={this.state.forsubmit.museums}
                                        onChange={this.checkbox} 
                                        checked={this.state.forsubmit.museums} />
                                    <label className="label-inline" htmlFor="museums">Museums</label>
                                </span>
                                <span className="dropdown">
                                    <label className="label-inline" htmlFor="results-quantity">No. of Results</label>
                                    <select 
                                        id="results-quantity"
                                        name="quantity"
                                        defaultValue={this.state.forsubmit.quantity}
                                        onChange={this.quantity} >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                    </select>
                                </span>
                            </div>
                        </form>
                    </div>
                        <button 
                            onClick={this.codeAddress} 
                            className="button button-outline">Go
                        </button>
                </div>
            </div>
            
        )
    }
}

export default SearchForm
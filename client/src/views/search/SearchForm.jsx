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

    componentDidMount() {
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
                    cafes: false,
                    vegetarian: false,
                    foodstands: false,
                    desserts: false,
                    breweries: false,
                    wineries: false,
                    cocktails: false,
                    pubs: false,
                    clubs: false,
                    antiques: false,
                    media: false,
                    sportinggoods: false,
                    fashion: false,
                    fleamarkets: false,
                    hiking: false,
                    museums: false,
                    zoos: false,
                    spas: false,
                    parks: false,
                    music: false,
                    sports: false,
                    performingarts: false,
                    comedy: false,
                    technology: false,
                }
            })
        } else if (evt.target.value === "false") {
            this.setState({
                all: true,
                forsubmit: {
                    ...this.state.forsubmit,
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
        if(this.state.forsubmit.search === '') {
            this.setState({blank: 'blank'})
        } else {
            this.codeAddress()  
        }
    }

    codeAddress() {
        var search = this.state.forsubmit.search
        axios({method: 'get', url: `api/search/geocode?search=${search}`})
        .then((res) => {           
            this.setState({ 
                forsubmit: {
                    ...this.state.forsubmit, 
                    lon: res.data.results[0].geometry.location.lng,
                    lat: res.data.results[0].geometry.location.lat
                }
            })
        })
        .then((res) => {
                localStorage.removeItem('saved')
                localStorage.setItem('formInfo', JSON.stringify(this.state.forsubmit))

                const { onSubmit } = this.props
                onSubmit(this.state.forsubmit)
        })
    }

    componentWillUnmount() {
        this.setState({submitted: true}) 
    }

	render() {
        return (
            <div className="search-form">
                <div>
                    <div className="form-box">
                        <form onSubmit={this.submitSearchTerm} >
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
                                </div>
                                <div className="cat-groups">
                                    <span className="check-title">Food</span>
                                    <span className="checkbox-short">
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
                                            name="cafes" 
                                            value={this.state.forsubmit.cafes}
                                            onChange={this.checkbox} 
                                            checked={this.state.forsubmit.cafes} />
                                        <label className="label-inline" htmlFor="cafes">Cafes</label>
                                    </span>
                                    <span className="checkbox-long">
                                        <input 
                                            type="checkbox" 
                                            name="vegetarian" 
                                            value={this.state.forsubmit.vegetarian}
                                            onChange={this.checkbox} 
                                            checked={this.state.forsubmit.vegetarian} />
                                        <label className="label-inline" htmlFor="vegetarian">Vegetarian/Vegan</label>
                                    </span>
                                    <span className="checkbox">
                                        <input 
                                            type="checkbox" 
                                            name="foodstands" 
                                            value={this.state.forsubmit.foodstands}
                                            onChange={this.checkbox} 
                                            checked={this.state.forsubmit.foodstands} />
                                        <label className="label-inline" htmlFor="foodstands">Food Stands</label>
                                    </span>
                                    <span className="checkbox">
                                        <input 
                                            type="checkbox" 
                                            name="desserts" 
                                            value={this.state.forsubmit.desserts}
                                            onChange={this.checkbox} 
                                            checked={this.state.forsubmit.desserts} />
                                        <label className="label-inline" htmlFor="desserts">Desserts</label>
                                    </span>
                                </div>


                                <div className="cat-groups">
                                    <span className="check-title">Bars</span>
                                    <span className="checkbox-short">
                                        <input 
                                            type="checkbox" 
                                            name="breweries" 
                                            value={this.state.forsubmit.breweries}
                                            onChange={this.checkbox} 
                                            checked={this.state.forsubmit.breweries} />
                                        <label className="label-inline" htmlFor="breweries">Breweries</label>
                                    </span>
                                    <span className="checkbox">
                                        <input 
                                            type="checkbox" 
                                            name="wineries" 
                                            value={this.state.forsubmit.wineries}
                                            onChange={this.checkbox} 
                                            checked={this.state.forsubmit.wineries} />
                                        <label className="label-inline" htmlFor="wineries">Wine Tasting</label>
                                    </span>
                                    <span className="checkbox-long">
                                        <input 
                                            type="checkbox" 
                                            name="cocktails" 
                                            value={this.state.forsubmit.cocktails}
                                            onChange={this.checkbox} 
                                            checked={this.state.forsubmit.cocktails} />
                                        <label className="label-inline" htmlFor="cocktails">Cocktail Bars</label>
                                    </span>
                                    <span className="checkbox">
                                        <input 
                                            type="checkbox" 
                                            name="pubs" 
                                            value={this.state.forsubmit.pubs}
                                            onChange={this.checkbox} 
                                            checked={this.state.forsubmit.pubs} />
                                        <label className="label-inline" htmlFor="pubs">Pubs</label>
                                    </span>
                                    <span className="checkbox">
                                        <input 
                                            type="checkbox" 
                                            name="clubs" 
                                            value={this.state.forsubmit.clubs}
                                            onChange={this.checkbox} 
                                            checked={this.state.forsubmit.clubs} />
                                        <label className="label-inline" htmlFor="clubs">Clubs</label>
                                    </span>
                                </div>


                                <div className="cat-groups">
                                    <span className="check-title">Shopping</span>
                                    <span className="checkbox-short">
                                        <input 
                                            type="checkbox" 
                                            name="fashion" 
                                            value={this.state.forsubmit.fashion}
                                            onChange={this.checkbox} 
                                            checked={this.state.forsubmit.fashion} />
                                        <label className="label-inline" htmlFor="fashion">Clothes</label>
                                    </span>
                                    <span className="checkbox">
                                        <input 
                                            type="checkbox" 
                                            name="antiques" 
                                            value={this.state.forsubmit.antiques}
                                            onChange={this.checkbox} 
                                            checked={this.state.forsubmit.antiques} />
                                        <label className="label-inline" htmlFor="antiques">Antiques</label>
                                    </span>
                                    <span className="checkbox-long">
                                        <input 
                                            type="checkbox" 
                                            name="media" 
                                            value={this.state.forsubmit.media}
                                            onChange={this.checkbox} 
                                            checked={this.state.forsubmit.media} />
                                        <label className="label-inline" htmlFor="media">Books/Movies/Music</label>
                                    </span>
                                    <span className="checkbox">
                                        <input 
                                            type="checkbox" 
                                            name="sportinggoods" 
                                            value={this.state.forsubmit.sportinggoods}
                                            onChange={this.checkbox} 
                                            checked={this.state.forsubmit.sportinggoods} />
                                        <label className="label-inline" htmlFor="sportinggoods">Sporting Goods</label>
                                    </span>
                                    <span className="checkbox">
                                        <input 
                                            type="checkbox" 
                                            name="fleamarkets" 
                                            value={this.state.forsubmit.fleamarkets}
                                            onChange={this.checkbox} 
                                            checked={this.state.forsubmit.fleamarkets} />
                                        <label className="label-inline" htmlFor="fleamarkets">Flea Markets</label>
                                    </span>
                                </div>
                                <div className="cat-groups">
                                    <span className="check-title">Activities</span>
                                    <span className="checkbox-short">
                                        <input 
                                            type="checkbox" 
                                            name="hiking" 
                                            value={this.state.forsubmit.hiking}
                                            onChange={this.checkbox} 
                                            checked={this.state.forsubmit.hiking} />
                                        <label className="label-inline" htmlFor="hiking">Hikes</label>
                                    </span>
                                    <span className="checkbox">
                                        <input 
                                            type="checkbox" 
                                            name="museums" 
                                            value={this.state.forsubmit.museums}
                                            onChange={this.checkbox} 
                                            checked={this.state.forsubmit.museums} />
                                        <label className="label-inline" htmlFor="museums">Musuems</label>
                                    </span>
                                    <span className="checkbox-long">
                                        <input 
                                            type="checkbox" 
                                            name="zoos" 
                                            value={this.state.forsubmit.zoos}
                                            onChange={this.checkbox} 
                                            checked={this.state.forsubmit.zoos} />
                                        <label className="label-inline" htmlFor="zoos">Zoos/Aquariums</label>
                                    </span>
                                    <span className="checkbox">
                                        <input 
                                            type="checkbox" 
                                            name="parks" 
                                            value={this.state.forsubmit.parks}
                                            onChange={this.checkbox} 
                                            checked={this.state.forsubmit.parks} />
                                        <label className="label-inline" htmlFor="parks">Parks</label>
                                    </span>
                                    <span className="checkbox">
                                        <input 
                                            type="checkbox" 
                                            name="spas" 
                                            value={this.state.forsubmit.spas}
                                            onChange={this.checkbox} 
                                            checked={this.state.forsubmit.spas} />
                                        <label className="label-inline" htmlFor="spas">Spas</label>
                                    </span>
                                </div>
                                <div className="cat-groups">
                                    <span className="check-title">Events</span>
                                    <span className="checkbox-short">
                                        <input 
                                            type="checkbox" 
                                            name="music" 
                                            value={this.state.forsubmit.music}
                                            onChange={this.checkbox} 
                                            checked={this.state.forsubmit.music} />
                                        <label className="label-inline" htmlFor="music">Concerts</label>
                                    </span>
                                    <span className="checkbox">
                                        <input 
                                            type="checkbox" 
                                            name="sports" 
                                            value={this.state.forsubmit.sports}
                                            onChange={this.checkbox} 
                                            checked={this.state.forsubmit.sports} />
                                        <label className="label-inline" htmlFor="sports">Sports</label>
                                    </span>
                                    <span className="checkbox-long">
                                        <input 
                                            type="checkbox" 
                                            name="performingarts" 
                                            value={this.state.forsubmit.performingarts}
                                            onChange={this.checkbox} 
                                            checked={this.state.forsubmit.performingarts} />
                                        <label className="label-inline" htmlFor="performingarts">Performing Arts</label>
                                    </span>
                                    <span className="checkbox">
                                        <input 
                                            type="checkbox" 
                                            name="comedy" 
                                            value={this.state.forsubmit.comedy}
                                            onChange={this.checkbox} 
                                            checked={this.state.forsubmit.comedy} />
                                        <label className="label-inline" htmlFor="comedy">Comedy</label>
                                    </span>
                                    <span className="checkbox">
                                        <input 
                                            type="checkbox" 
                                            name="technology" 
                                            value={this.state.forsubmit.technology}
                                            onChange={this.checkbox} 
                                            checked={this.state.forsubmit.technology} />
                                        <label className="label-inline" htmlFor="technology">Tech</label>
                                    </span>
                                </div>
                                
                                <span className="dropdown">
                                    <div className="results-title">No. of Results</div>
                                    <select 
                                        id="results-quantity"
                                        name="quantity"
                                        defaultValue={this.props.fromForm.quantity}
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
                                    <button 
                                        onClick={this.submitSearchTerm} 
                                        className="button button-outline">Go
                                    </button>
                                </span>
                                <div><small className ="adv">*Dates default to this upcoming weekend. Adventures definitely not limited to weekends.</small></div>
                            </div>
                        </form>
                    </div>
                        
                </div>
            </div>
            
        )
    }
}

export default SearchForm
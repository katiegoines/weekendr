import React from 'react'
import axios from 'axios'


class Dinner extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            ready: false,
            color: '',
            error: false,
            results: {head: "", list: []}
        }        
    }

    componentDidMount() {
        if(this.props.showResults) {
          this.yelpRestaurantRequest()  
        } 
    }
    
    componentWillReceiveProps() {
        if(this.props.showResults) {
            this.setState({results:{head:'', list: []}})
        }
    }

    yelpRestaurantRequest() {
        axios({method: 'get', url: `/api/search/yelp?term=dinner&location=${this.props.search}`})
        .then((res) => { 
            if(res.data.fullType === "rest-call.response-filters.unhandled-status") {
                throw new Error("error")
            } else {
                this.setState({results: {
                    list: res.data, 
                    head: "Dinner"
                }})
            }
        })
        .then(res => {
            this.randomizeColor()
        })
        .catch(e => {
            this.setState({error: true});
        })
    }

    randomizeColor() {
        var x = Math.floor(Math.random() * 3)
        this.setState({color: x})
    }

	render() {
        return (
            <span className="search-results">
                {!this.state.error
                ? (<span>
                        {this.state.results.head !== ''
                        ? (<div className="search-category">
                            <h3>{this.state.results.head}</h3>
                        </div>)
                        : null}
                        
                        {this.state.results.list.slice(0, 7).map(el => {
                            return (
                                <div key={el.id} className="card-2">
                                    <img className="card-img-2 object-fit_cover" src={el.image_url} alt="" />
                                    <div className={`card-overlay-${this.state.color}`}> 
                                        <div className={`card-title-${this.state.color}`}><a href={el.url} target="_blank">{el.name}</a></div>
                                        <div className="card-info">
                                            <div className="yelp-categories">{el.categories.map((cat, i)=> {
                                                return (
                                                    <span key={i}>{` - ${cat.title} - `}</span>
                                                )
                                            })}</div>
                                            <div className="body-text">
                                                <div>{el.location.address1}</div>
                                                <div>{el.location.city}</div>
                                                <div>{`${(el.distance * 0.000621371192).toFixed(2)}mi away`}</div>
                                                <div>{`Price: ${el.price}`}</div>
                                                <div>{`Rating: ${el.rating} (${el.review_count} reviews)`}</div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                  </span>)
                : (<span>
                    <div className="search-category">
                        <h3>Dinner <br /> Coming Soon</h3>
                    </div>
                </span>)
                }
                        
                
            </span>
            
            
        )
    }
}

export default Dinner
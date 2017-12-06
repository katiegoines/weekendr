import React from 'react'
import axios from 'axios'


class Wineries extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            error: false,
            tileView: true,
            results: {head: "", list: []}
        }        
    }

    componentDidMount() {
          this.request()  
    }

    componentDidUpdate() {
        if(this.state.tileView !== this.props.tileView) {
            this.setState({tileView: this.props.tileView})
        }
    }
    
    componentWillReceiveProps() {
        // if(this.props.run) {
        //     this.setState({results:{head:'', list: []}})
        // }
    }

    request() {
        axios({method: 'get', url: `/api/search/yelp?categories=winetastingroom&location=${this.props.search}`})
        .then((res) => { 
            if(res.data.fullType === "rest-call.response-filters.unhandled-status") {
                throw new Error("error")
            } else {
                this.setState({results: {
                        list: res.data, 
                        head: "Wine Tasting"
                }})
            }
        })
        .then(res => {
            console.log(this.state.results.list)
            this.randomizeColor()
        })
        .catch(e => {
            this.setState({error: true});
        })
    }

    randomizeColor() {
        var x = Math.floor(Math.random() * 4)
        this.color = x
        return x
    }

	render() {
        return (
            <span>
                {!!this.state.tileView
                    ? <span className="search-results">
                        {!this.state.error
                            ? <span>
                                {this.state.results.head !== ''
                                    ? <div className="search-category">
                                        <h3>{this.state.results.head}</h3>
                                        <a href={`https://www.yelp.com/search?categories=winetastingroom&location=${this.props.search}&start=0&cflt=winetastingroom`} target="_blank">See more results from Yelp</a>
                                    </div>
                                    : null
                                }
                                {this.state.results.list.slice(0, this.props.quantity).map(el => {
                                    return (
                                        <div key={el.id} className="card-2">
                                            <img className={`card-img-${this.randomizeColor()}`} src={el.image_url} alt="" />
                                            <div className={el.image !== null ? `card-overlay-${this.color}` : `card-overlay-${this.randomizeColor()}`}>
                                                <div className="card-title"><a href={el.url} target="_blank">{el.name}</a></div>
                                                <div className="card-info">
                                                    <div className="yelp-categories">{el.categories.map((cat, i)=> {
                                                        return (
                                                            <span key={i}>
                                                                {i < el.categories.length - 1
                                                                    ? cat.title + " - "
                                                                    : cat.title
                                                                }
                                                            </span>
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
                            </span>
                            : <span>
                                <div className="search-category">
                                    <h3>Wine Tasting <br /> Coming Soon</h3>
                                </div>
                            </span>
                        }                
                    </span>
                    : <div className={`search-results-list-${this.randomizeColor()}`}>
                        <h3>{this.state.results.head}</h3>
                        {this.state.results.list.slice(0, this.props.quantity).map(el => {
                            return (
                                <div  className="list-result" key={el.id}><a href={el.url} target="_blank">{el.name}</a>
                                    <div>
                                        <div>
                                            {el.categories.map((cat, i) => {
                                                return (
                                                    <span key={i}><small>
                                                        {(i + 1) < el.categories.length ? <span>{`${cat.title}, `}</span> : <span>{cat.title}</span>}
                                                    </small></span>
                                                )
                                            })}
                                        </div>
                                        <div>{`${el.location.address1}, ${el.location.city}`}</div>
                                        <div>{`${(el.distance * 0.000621371192).toFixed(2)}mi away`}</div>
                                        <div>{`Price: ${el.price}`}</div>
                                        <div>{`Rating: ${el.rating} (${el.review_count} reviews)`}</div>
                                    </div>
                                </div> 
                            )
                        })} 
                    </div>
                }
            </span>
        )
    }
}

export default Wineries
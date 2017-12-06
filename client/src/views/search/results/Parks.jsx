import React from 'react'
import axios from 'axios'


class Parks extends React.Component {
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
    }

    request() {
        axios({method: 'get', url: `/api/search/places?category=parks&lat=${this.props.lat}&lon=${this.props.lon}`})
        .then((res) => { 
            // console.log(res.data)
            if(res.data.fullType === "rest-call.response-filters.unhandled-status") {
                throw new Error("error")
            } else {
                console.log(res.data.results)
                this.key = res.data.apiKey
                this.setState({results: {
                        list: res.data.results.results, 
                        head: "Parks"
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
                                        {/* <a href={``} target="_blank">See more results from Google</a> */}
                                    </div>
                                    : null
                                }
                                {this.state.results.list.slice(0, this.props.quantity).map(el => {
                                    return (
                                        <div key={el.id} className="card-2">
                                            <img className={`card-img-${this.randomizeColor()}`} src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photoreference=${el.photos[0].photo_reference}&key=${this.key}`} alt="" />
                                            <div className={el.image !== null ? `card-overlay-${this.color}` : `card-overlay-${this.randomizeColor()}`}>
                                                <div className="card-title">{el.name}</div>
                                                <br />
                                                <div className="card-info">
                                                    <div className="body-text">
                                                        <div>{el.vicinity}</div>
                                                        <div>{`Rating: ${el.rating}`}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </span>
                            : <span>
                                <div className="search-category">
                                    <h3>Parks <br /> Coming Soon</h3>
                                </div>
                            </span>
                        }                
                    </span>
                    : <div className={`search-results-list-${this.randomizeColor()}`}>
                        <h3>{this.state.results.head}</h3>
                        {this.state.results.list.slice(0, this.props.quantity).map(el => {
                            return (
                                <div className="list-result" key={el.id}><span className="non-a">{el.name}</span>
                                    <div>
                                        <div>{el.vicinity}</div>
                                        <div>{`Rating: ${el.rating}`}</div>
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

export default Parks
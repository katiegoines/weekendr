import React from 'react'
import axios from 'axios'
import Moment from 'react-moment'


class Events extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            error: false, 
            tileView: true,
            results: {head: '', list: []}
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
    
    // componentWillReceiveProps() {
    //     if(this.props.run) {
    //         this.setState({results:{brunch:{head:'', list: []}}})
    //     }
    // }

    request() {
        console.log(this.props.startDate)
        var dates
        if(this.props.startDate !== "" && this.props.endDate !== "") {
            dates = this.props.startDate.replace(/[^0-9]/g, '') + "00-" + this.props.endDate.replace(/[^0-9]/g, '') + "00"
        } else {
            var today = new Date()
            var dd = today.getDate() > 10 ? today.getDate() : "0" + today.getDate()
            var mm = (today.getMonth() + 1) > 10 ? (today.getMonth() + 1) : "0" + (today.getMonth() + 1)
            var yyyy = today.getFullYear()
            var other = new Date(today.getTime() + (5 * 86400000))
            var ddo = other.getDate() > 10 ? other.getDate() : "0" + other.getDate()
            var mmo = (other.getMonth() + 1) > 10 ? (other.getMonth() + 1) : "0" + (other.getMonth() + 1)            
            var yyyyo = other.getFullYear()
            dates = `${yyyy}${mm}${dd}00-${yyyyo}${mmo}${ddo}00`
        }
        axios({method: 'get', url: `/api/search/eventful?location=${this.props.search}&category=music&dateRange=${dates}`})
        .then((res) => { 
            if(res.data.fullType === "rest-call.response-filters.unhandled-status") {
                throw new Error("error")
            } else {
                console.log(res.data.events.event)
                this.setState({
                    ready: true,
                    results: {
                        list: res.data.events.event, 
                        head: "Music Events"
                    }
                })
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
                                        ? <div className="search-category"><h3>{this.state.results.head}</h3></div>
                                        : null
                                    }
                                    {this.state.results.list.slice(0, this.props.quantity).map(el => {
                                        return (
                                            <div key={el.id} className="card-2">
                                                {el.image !==  null
                                                    ? <img className={`card-img-${this.randomizeColor()}`} src={`//d1marr3m5x4iac.cloudfront.net/images/large${el.image.medium.url.substr(45)}`} alt="" />
                                                    : null
                                                }
                                                <div className={el.image !== null ? `card-overlay-${this.color}` : `card-overlay-${this.randomizeColor()}`}> 
                                                    <div className="card-title">
                                                        <a href={el.url} target="_blank">
                                                            {el.title.length > 45
                                                                ? el.title.replace(/&#39;/g, "'").replace(/&#38;/g, "&").replace(/&amp;/g, "&").substr(0,45) + "..."
                                                                : el.title.replace(/&#39;/g, "'").replace(/&#38;/g, "&").replace(/&amp;/g, "&")
                                                            }
                                                            
                                                        </a>
                                                    </div>
                                                    <div className="card-info">
                                                        <div className="body-text">
                                                            <div>{el.venue_name.replace(/&#39;/g, "'").replace(/&#38;/g, "&").replace(/&amp;/g, "&")}</div>
                                                            <div>{el.venue_address}</div>
                                                            <div>{el.city_name}</div>
                                                            <br />
                                                            {el.stop_time === null || el.stop_time.substr(0,10) === el.start_time.substr(0,10)
                                                                ? <span>
                                                                        <div><Moment format="ddd MMM D">{el.start_time}</Moment></div>
                                                                        <div>Starts at <Moment format="h:mm a">{el.start_time}</Moment></div>
                                                                    </span>          
                                                                : <div>Through <Moment format="ddd MMM D">{el.stop_time}</Moment></div>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </span>
                                : <span>
                                    <div className="search-category">
                                        <h3>Music Events <br /> Coming Soon</h3>
                                    </div>
                                </span>
                            }
                        </span>
                        : <div className="search-results-list-3">
                            <h3>{this.state.results.head}</h3>
                            {this.state.results.list.slice(0, this.props.quantity).map(el => {
                                return (
                                    <div className="list-result" key={el.id}>
                                        <a href={el.url} target="_blank">
                                            {el.title.length > 45
                                                ? el.title.replace(/&#39;/g, "'").replace(/&#38;/g, "&").replace(/&amp;/g, "&").substr(0,45) + "..."
                                                : el.title.replace(/&#39;/g, "'").replace(/&#38;/g, "&").replace(/&amp;/g, "&")
                                            }
                                            
                                        </a>
                                        <div>
                                            <div>{el.venue_name.replace(/&#39;/g, "'").replace(/&#38;/g, "&").replace(/&amp;/g, "&")}</div>
                                            <div>{el.venue_address}</div>
                                            <div>{el.city_name}</div>
                                            {el.stop_time === null || el.stop_time.substr(0,10) === el.start_time.substr(0,10)
                                                ? <span>
                                                        <div><Moment format="ddd MMM D">{el.start_time}</Moment></div>
                                                        <div>Starts at <Moment format="h:mm a">{el.start_time}</Moment></div>
                                                    </span>          
                                                : <div>Through <Moment format="ddd MMM D">{el.stop_time}</Moment></div>
                                            }
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

export default Events
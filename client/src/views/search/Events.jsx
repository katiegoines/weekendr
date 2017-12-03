import React from 'react'
import axios from 'axios'
import Moment from 'react-moment'


class Events extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            dateRange: '',
            search: this.props.search,
            color: '',
            results: {head: '', list: []}
        }        
    }

    componentDidMount() {
        console.log(this.props.search)
        if(this.props.showResults) {
          this.request()  
        }
    }
    
    componentWillReceiveProps() {
        if(this.props.showResults) {
            this.setState({results:{brunch:{head:'', list: []}}})
        }
    }

    request() {
        var dates
        if(this.state.startDate !== undefined && this.state.endDate !== undefined) {
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
        axios({method: 'get', url: `/api/search/eventful?location=${this.state.search}&category=music&dateRange=${dates}`})
        .then((res) => { 
            if(res.data.fullType === "rest-call.response-filters.unhandled-status") {
                throw new Error("error")
            } else {
                console.log(res.data.events.event)
                this.setState({results: {
                        list: res.data.events.event, 
                        head: "Music"
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
                                    {el.image !==  null
                                     ? <img className="card-img-2 object-fit_cover" src={el.image.medium.url} alt="" />
                                     : null
                                    }
                                    <div className={`card-overlay-${this.state.color}`}> 
                                        <div className={`card-title-${this.state.color}`}><a href={el.url} target="_blank">{el.title.replace(/&#39;/g, "'").replace(/&#38;/g, "&").replace(/&amp;/g, "&")}</a></div>
                                        <div className="card-info">
                                            <div className="body-text">
                                                <div>{el.venue_name.replace(/&#39;/g, "'").replace(/&#38;/g, "&").replace(/&amp;/g, "&")}</div>
                                                <div>{el.venue_address}</div>
                                                <div>{el.city_name}</div>
                                                {el.stop_time === null || el.stop_time.substr(0,10) === el.start_time.substr(0,10)
                                                ? (<span>
                                                        <div><Moment format="ddd MMM D">{el.start_time}</Moment></div>
                                                        <div>Starts at <Moment format="h:mm a">{el.start_time}</Moment></div>
                                                    </span>)            
                                                : <div>Through <Moment format="ddd MMM D">{el.stop_time}</Moment></div>}

                                                <br />
                                                {el.description !== null
                                                ? <div>{el.description.replace(/&#39;/g, "'").replace(/&#38;/g, "&")}</div>
                                                : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                  </span>)
                : (<span>
                    <div className="search-category">
                        <h3>Music <br /> Coming Soon</h3>
                    </div>
                </span>)
                }
                        
                
            </span>
            //  <h1>music</h1>   
        )
    }
}

export default Events
import React from 'react'
import axios from 'axios'


class Lunch extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            ready: false,
            error: false,
            results: {head: "", list: []}
        }        
    }

    componentDidMount() {
        if(this.props.showResults) {
          this.request()  
        } 
    }
    
    componentWillReceiveProps() {
        if(this.props.showResults) {
            this.setState({results:{head:'', list: []}})
        }
    }

    request() {
        axios({method: 'get', url: `/api/search/yelp?term=Lunch&location=${this.props.search}`})
        .then((res) => { 
            if(res.data.fullType === "rest-call.response-filters.unhandled-status") {
                throw new Error("error")
            } else {
                this.setState({results: {
                        list: res.data, 
                        head: "Lunch"
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
            // <span className="search-results">
            //     {!this.state.error
            //     ? (<span>
            //             {this.state.results.head !== ''
            //             ? (<div className="search-category">
            //                 <h3>{this.state.results.head}</h3>
            //             </div>)
            //             : null}
                        
            //             {this.state.results.list.slice(0, this.props.quantity).map(el => {
            //                 return (
            //                     <div key={el.id} className="card-2">
            //                         <img className={`card-img-${this.randomizeColor()}`} src={el.image_url} alt="" />
            //                         <div className={el.image !== null ? `card-overlay-${this.color}` : `card-overlay-${this.randomizeColor()}`}>
            //                             <div className="card-title"><a href={el.url} target="_blank">{el.name}</a></div>
            //                             <div className="card-info">
            //                                 <div className="yelp-categories">{el.categories.map((cat, i)=> {
            //                                     return (
            //                                         <span key={i}>{` - ${cat.title} - `}</span>
            //                                     )
            //                                 })}</div>
            //                                 <div className="body-text">
            //                                     <div>{el.location.address1}</div>
            //                                     <div>{el.location.city}</div>
            //                                     <div>{`${(el.distance * 0.000621371192).toFixed(2)}mi away`}</div>
            //                                     <div>{`Price: ${el.price}`}</div>
            //                                     <div>{`Rating: ${el.rating} (${el.review_count} reviews)`}</div>
            //                                 </div>
                                            
            //                             </div>
            //                         </div>
            //                     </div>
            //                 )
            //             })}
            //       </span>)
            //     : (<span>
            //         <div className="search-category">
            //             <h3>Lunch <br /> Coming Soon</h3>
            //         </div>
            //     </span>)
            //     }                
            // </span>

            <div className="search-results-list-1">
                <h3>{this.state.results.head}</h3>
                   {this.state.results.list.slice(0, this.props.quantity).map(el => {
                       return (
                        <div key={el.id}><a href={el.url} target="_blank">{el.name}</a>
                            <ul>
                                <div>
                                    {el.categories.map((cat, i) => {
                                        return (
                                            <span key={i}><small>
                                                {(i + 1) < el.categories.length 
                                                ? <span>{`${cat.title}, `}</span>
                                                : <span>{cat.title}</span>
                                                }
                                            </small></span>
                                        )
                                    })}
                                </div>
                                <div>{`${el.location.address1}, ${el.location.city}`}</div>
                                <div>{`${(el.distance * 0.000621371192).toFixed(2)}mi away`}</div>
                                <div>{`Price: ${el.price}`}</div>
                                <div>{`Rating: ${el.rating} (${el.review_count} reviews)`}</div>
                            </ul>
                        </div> 
                       )
                       
                   })} 

            </div>
            
            
        )
    }
}

export default Lunch
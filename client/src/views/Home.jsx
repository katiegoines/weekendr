import React from 'react'

var i = 0

class Home extends React.Component {
	state = {
		slides: [
			"http://cdn.pcwallart.com/images/city-street-wallpaper-4.jpg", 
			"http://clv.h-cdn.co/assets/16/31/980x490/landscape-1470243304-gettyimages-513055773.jpg", 
			"https://snowbrains.com/wp-content/uploads/2014/02/beautiful-town-in-the-shadow-of-mountain-hdr-hd-wallpaper-35489.jpg",
			"http://ee24.com/media/articles/uploads/2013/10/17/schiltach-black-forest.jpg",
			"https://www.quickenloans.com/blog/wp-content/uploads/2015/03/iStock_000010342358Small.jpg",
			"https://i.pinimg.com/originals/99/7b/8e/997b8e0857cc47d79d214ff1848d481a.jpg",
			"http://4.bp.blogspot.com/-zuaJsxrmy1o/UF4CKn8k1JI/AAAAAAAAJ1k/J77LKRWrVKw/s1600/IMG_1748.jpg",
			"https://saintpaul.s3.amazonaws.com/CMS/1753/st._paul_skyline__large-slideshow.jpg"
			
		],
		currentPhoto: ''
	}

	componentDidMount() {
		this.getImage(0)
		this.interval = setInterval(() => {
			this.changeIndex()
		}, 5000)
	}

	changeIndex() {
		if(i < this.state.slides.length - 1) {
			++i
		} else {
			i = 0
		}
		this.getImage(i)
	}

	getImage(i) {
		this.setState({currentPhoto: this.state.slides[i]})
	}

	componentWillUnmount() {
		clearInterval(this.interval)
	}

	render() {
		return (
			<div className='Home'>
				{/* <h1> Move It! </h1> */}
				<div className="home-background-box">
					<img className="home-background .object-fit_cover" src={this.state.currentPhoto} alt="" />
					<div className="home-title-box">
						<div><h2 className="home-title">move it!</h2></div>
						{/* <div className="home-title"><img src={require('../images/logo-bg.png')} /></div> */}
						<div className="home-body">
							<p>Thinking about starting fresh in a brand new city? Before you pack your boxes, set your sights on the right fit. <strong>Let's explore!</strong></p>
							<ol>
								<li><em><strong>Search</strong></em> for cities that pique your interest and checkout an overview of what you might find when you get there.</li>
								<li><em><strong>Sign Up</strong></em> for an account so you can save your searches to revisit later.</li>
							</ol>
						</div>
						
					</div>
				</div>
			</div>
		)
	}
}



// const Home = (props) => {
// 	return (
// 		<div className='Home'>
// 			<h1>Move It</h1>
// 		</div>
// 	)
// }


export default Home
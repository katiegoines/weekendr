import React from 'react'
import { Link } from 'react-router-dom'
// import Logo from './images/logo.png'

const NavBar = (props) => {
	return (
		<div className='NavBar'>
			<span className="standard">
				<Link to="/"><span className="swirly-font swirly-nav">Weekendr</span></Link>
				{/* <Link to="/"><img className='logo' src={Logo} alt="logo" /></Link> */}
				{/* <Link to="/search">Search</Link> */}
			</span>
			
			{props.currentUser
				? (
					<span>
						<span className="account">
							{/* <span className="name">Hi, {props.currentUser.name}:</span> */}
							<Link to="/profile">Account</Link>
							<Link to="/logout">Log Out</Link>
						</span>
						
					</span>
				)
				: (
					<span>
						<span className="account">
							<Link to="/login">Log In</Link>
							<Link to="/signup">Sign Up</Link>
						</span>
					</span>
				)
			}
		</div>
	)
}

export default NavBar
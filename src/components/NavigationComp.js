import "../style.css"
import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'

const NavigationComp = () => {

	const location = useLocation()
	const [isAbout, setIsAbout] = useState(false)

	useEffect(() => {
		if(location.pathname === '/about'){
			setIsAbout(true)
		}
	},[location.pathname])
	
	return(
		<div className="navContainer"> 
			<Link to='/' className="navigation backHome">home</Link>
			{	!isAbout && <Link to='/about' className="navigation moreInf">more information</Link>}
		</div>
	)

}

export default NavigationComp 
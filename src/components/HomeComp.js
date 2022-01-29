import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const HomeComp = () => {

	const navigate = useNavigate()
	const [navigation, setNavigation] = useState(false)

	useEffect(() => {
		if(navigation) {
			console.log('naviate')
			navigate('/sketch')
		}
	})


	return(
		<div> 
			<button className='startBtn' onClick={() => setNavigation(true)}>Who Am I?</button>
		</div>
	)
}

export default HomeComp
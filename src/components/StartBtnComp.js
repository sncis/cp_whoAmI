import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDataStateCtx } from '../store/dataContext'


const StartBtnComp = () => {

	const {loading} = useDataStateCtx()
	const navigate = useNavigate()

	const [navigation, setNavigation] = useState(false)

	useEffect(() => {
		if(navigation && !loading){
			console.log('navigation clicked')
			// navigate('/sketch')
		}
	},[navigate, loading, navigation])

	return(
		<div>
			{!navigation && <button className='startBtn' onClick={() => setNavigation(true)}>Who Am I?</button>}
			{navigation && loading && <p>Loading your Information...</p>}
		</div>
	)
}

export default StartBtnComp
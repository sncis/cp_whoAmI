import React, { useEffect} from 'react'

import StartBtnComp from '../components/StartBtnComp'
import FingerPrintComp from '../components/FingerprintComp'
import APIComp from '../components/APIComp'


const HomePage = () => {
	useEffect(() => {
		console.log("*********HOME PAGE**************")
	},)
	
	return(
		<div> 
			<FingerPrintComp />
			<StartBtnComp />
			{/* <APIComp /> */}
		</div>
	)
}

export default HomePage
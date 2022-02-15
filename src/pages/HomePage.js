import React, { createElement, useEffect, useState, useCallback} from 'react'

import StartBtnComp from '../components/StartBtnComp'
import FingerPrintComp from '../components/FingerprintComp'
import APIComp from '../components/APIComp'
import { useDataStateCtx } from '../store/dataContext'
import TextComp from '../components/TextComp'


const HomePage = () => {

	const {lastVisitText} = useDataStateCtx()

	const [renderComp, setRenderComp] = useState([])

	useEffect(() => {
		console.log("*********HOME PAGE**************")
	},)

	useEffect(() => {
		if(lastVisitText){
			let props ={i:1, text:lastVisitText}
			let element = createElement(TextComp, props)
			setRenderComp( c => [...c, element])
		}
	

	},[lastVisitText])

	
	return(
		<div> 
			<FingerPrintComp />
			<StartBtnComp />

			{ lastVisitText && renderComp.map(comp => comp)}
			{/* <APIComp /> */}
		</div>
	)
}

export default HomePage
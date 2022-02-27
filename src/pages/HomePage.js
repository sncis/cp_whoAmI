import React, { createElement, useEffect, useState, useCallback} from 'react'

import StartBtnComp from '../components/StartBtnComp'
import FingerPrintComp from '../components/FingerprintComp'
import InfoComp from '../components/InfoComp'
import { useDataStateCtx } from '../store/dataContext'
import TextComp from '../components/TextComp'


const HomePage = () => {

	const {lastVisitText} = useDataStateCtx()

	const [renderComp, setRenderComp] = useState([])
	const [count, setCount] = useState(1)

	useEffect(() => {
		console.log("*********HOME PAGE**************")
	},)

	useEffect(() => {
		if(lastVisitText){
			// let index = Math.random(0,100)
			console.log(count)
			setCount(c => c +1)
			let props ={i:count, text: lastVisitText}
			let element = createElement(TextComp, props)
			setRenderComp(comps => [...comps, element])
		}
	},[lastVisitText])

	
	return(
		<div> 
			<FingerPrintComp />
			<InfoComp />

			<StartBtnComp />
			{ lastVisitText && renderComp}
		</div>
	)
}

export default HomePage
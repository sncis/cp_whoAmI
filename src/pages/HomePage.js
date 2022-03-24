import React, { createElement, useEffect, useState} from 'react'

import StartBtnComp from '../components/StartBtnComp'
import FingerPrintComp from '../components/FingerprintComp'
import InfoComp from '../components/InfoComp'
import { useDataStateCtx } from '../store/dataContext'
import TextComp from '../components/TextComp'


const HomePage = () => {

	const {lastVisitText} = useDataStateCtx()
	const [renderComp, setRenderComp] = useState([])

	useEffect(() => {
		let isMounted = true
		if(lastVisitText){
			let index = Math.random() * 100
			let props ={i:index,text: lastVisitText}
			let element = createElement(TextComp, props)
			if(isMounted){
				setRenderComp(element)
			}
			
		}
		return () => isMounted = false
	},[lastVisitText])


	return(
		<div> 
			<FingerPrintComp />
			<InfoComp />
			<StartBtnComp />
			<div>
				{lastVisitText && renderComp}
			</div>
		</div>
	)
}

export default HomePage
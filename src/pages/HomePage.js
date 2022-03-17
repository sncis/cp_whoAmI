import React, { createElement, useEffect, useState, useCallback} from 'react'

import StartBtnComp from '../components/StartBtnComp'
import FingerPrintComp from '../components/FingerprintComp'
import InfoComp from '../components/InfoComp'
import { useDataStateCtx } from '../store/dataContext'
import TextComp from '../components/TextComp'

import { getPermissions } from '../infoSources/navigatorInfos' 

const HomePage = () => {

	const {lastVisitText} = useDataStateCtx()
	const [renderComp, setRenderComp] = useState([])

	useEffect(() => {
		if(lastVisitText){
			let index = Math.random() * 100
			let props ={i:index,text: lastVisitText}
			let element = createElement(TextComp, props)
			setRenderComp(element)
		}
	},[lastVisitText])

	useEffect(() => {
		const getThem = async() => {
			let p = await getPermissions()
			// console.log('*****PERMISSOSNSNS****')
			// console.log(p)
		}
		getThem()
	},[])

	
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
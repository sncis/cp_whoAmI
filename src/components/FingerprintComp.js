import React, {useRef, useEffect, useState, useCallback } from 'react'
import { useDataDispatchCtx } from '../store/dataContext'
import { getSystemInfos } from '../infoSources/systemInfos'
import { hashFunction } from '../utils/hash'
import { drawCanvasFingerPrint } from '../utils/fingerprintDraw'
import { deletData, storeFingerprint, getFingerprintInfos,storeIPInfos } from '../store/actions/fingerPrintActions'
import { backendFetcher } from '../utils/apiHelpers/backendFetcher'

import { SET_FINGERPRINT, SET_LASTVISITSTEXT } from '../store/constants'

const FingerprintComp = () => {

	const [canvasHash, setCanvasHash] = useState('')
	// const [ fingerPrintID, setFingerPrintID] = useState('')
	// const [ lastVisit, setLastVisit ] = useState(null)
	const dispatch = useDataDispatchCtx()

	const canvasRef = useRef(null)

	//drawing fingerprint canvas and create fingerprint hash
	const draw = useCallback(async() => {
		let c1 = "rgb(25,255,0)"
		let c2 = "rgb(250,10,241)"
		let c3 = "rgb(255,0,0)"
		let c4 = "rgb(10,30,255)"

		const canvas = canvasRef.current
		const ctx = canvas.getContext('2d')

		await drawCanvasFingerPrint(ctx,c1, c2,c3,c4)
		
		let src = canvas.toDataURL();
		let hashString = hashFunction(src)
		// console.log('hatString in drawing comp ', hashString)
	
		setCanvasHash(hashString)
		return hashString
	},[])


// draw canvas fingerprinting effect
	// useEffect(() => {
	// 	draw()
	// },[draw])


// create fingerprinting string
const createFingerPrintString = useCallback(async()=> {
	let systemInf = await getSystemInfos()
	let canvasHash = await draw()

	let systemString = Object.values(systemInf).join('').replace(/[\s,-.—]/g, '')
	let fingerprintString = hashFunction(systemString.concat(canvasHash))

	return fingerprintString
	
},[draw])

//do fingerprint and store in backend
useEffect(() => {
	const doFingerprint = async() => {
		let fingerPrintString = await createFingerPrintString()
		dispatch({
			type:SET_FINGERPRINT,
			payload: fingerPrintString
		})
		let lastVisit = await getFingerprintInfos(fingerPrintString)
		let text;
		
		if(lastVisit){
			text = `Welcome Back! You visted us already ${lastVisit.n} times. The last time on the ${lastVisit.day} at ${lastVisit.time}`
		}else{
			text= "Welcome for the fist time!" 
		}
		
		dispatch({
			type: SET_LASTVISITSTEXT,
			payload: text
		})
	
		storeFingerprint(fingerPrintString)
	}

	doFingerprint()
	
},[createFingerPrintString, dispatch])





	return(
		// <div style={{border: '1px solid red', margin:"10px"}}>
		<div>
			{/* <p>{canvasHash}</p> */}
			<canvas ref={canvasRef} width='200' height='100' hidden></canvas>
		</div>
	)
}

export default FingerprintComp

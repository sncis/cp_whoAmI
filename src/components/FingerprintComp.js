import React, {useRef, useEffect, useCallback } from 'react'
import { useDataDispatchCtx } from '../store/dataContext'
import { fingerPrintInfos } from '../infoSources/systemInfos'
import { hashFunction } from '../utils/hash'
import { drawCanvasFingerPrint } from '../utils/fingerprintDraw'
import { storeFingerprint, getFingerprintInfos } from '../utils/fingerPrintActions'
import { SET_FINGERPRINT, SET_LASTVISITSTEXT } from '../store/constants'

const FingerprintComp = () => {


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
		
		return hashString
	},[])


// create fingerprinting string
const createFingerPrintString = useCallback(async()=> {
	let fingerPrintSystemInfos = await fingerPrintInfos()
	let hash = await draw()
	let systemString = Object.values(fingerPrintSystemInfos).join('').replace(/[\s,-.—]/g, '')
	let fingerPrint = hashFunction(systemString.concat(hash))

	return { fingerPrint: fingerPrint, fingerPrintSystemInfos: fingerPrintSystemInfos }
	
},[draw])

//do fingerprint and store in backend
useEffect(() => {
	const doFingerprint = async() => {
		let {fingerPrint, fingerPrintSystemInfos} = await createFingerPrintString()
		dispatch({
			type:SET_FINGERPRINT,
			payload: fingerPrint
		})
		let lastVisit = await getFingerprintInfos(fingerPrint)
		let text = lastVisit ? `Welcome Back! You visted us already ${lastVisit.n} times. The last time on the ${lastVisit.day} at ${lastVisit.time}` : "Welcome for the fist time!" 
		
		dispatch({
			type: SET_LASTVISITSTEXT,
			payload: text
		})
	
		let data = {fingerPrint, ...fingerPrintSystemInfos}
		storeFingerprint(data)
	}

	doFingerprint()
	
},[createFingerPrintString, dispatch])

	return(
		<div>
			<canvas ref={canvasRef} width='200' height='100' hidden></canvas>
		</div>
	)
}

export default FingerprintComp

import React, {useRef, useEffect, useCallback, useState } from 'react'
import { useDataDispatchCtx } from '../store/dataContext'
import { getFingerprintSystemInfos } from '../infoSources/systemInfos'
import { hashFunction } from '../utils/hash'
import { drawCanvasFingerPrint } from '../utils/fingerprintDraw'
import { storeFingerprint, getFingerprintInfos } from '../utils/fingerPrintActions'
import { SET_FINGERPRINT, SET_LASTVISITSTEXT } from '../store/constants'

const FingerprintComp = () => {
	const [finger, setFinger] = useState(undefined)
	const dispatch = useDataDispatchCtx()
	const canvasRef = useRef(null)

	const drawFingerprint = useCallback(async() => {
		const c1 = "rgb(25,255,0)"
		const c2 = "rgb(250,10,241)"
		const c3 = "rgb(255,0,0)"
		const c4 = "rgb(10,30,255)"

		const canvas = canvasRef.current
		const ctx = canvas.getContext('2d')

		await drawCanvasFingerPrint(ctx,c1, c2,c3,c4)
		
		const src = canvas.toDataURL();
		const hashString = hashFunction(src)
		
		return hashString
	},[])


const createFingerPrintString = useCallback(async()=> {
	const fingerPrintSystemInfos = await getFingerprintSystemInfos()
	const drawHash = await drawFingerprint()
	
	const systemString = Object.values(fingerPrintSystemInfos).join('').replace(/[\s,-.—]/g, '')
	const fingerPrint = hashFunction(systemString.concat(drawHash))
		setFinger(fingerPrint)
	return {fingerPrint: fingerPrint, fingerPrintSystemInfos: fingerPrintSystemInfos }
	
},[drawFingerprint])

const doFingerprint = useCallback(async() => {
	const {fingerPrint, fingerPrintSystemInfos} = await createFingerPrintString()
	dispatch({
		type:SET_FINGERPRINT,
		payload: fingerPrint
	})
	const lastVisit = await getFingerprintInfos(fingerPrint)

	const text = lastVisit ? `Welcome Back! You visted us already ${lastVisit.n} times. The last time on the ${lastVisit.day} at ${lastVisit.time}` : "Welcome for the fist time!" 
	
	dispatch({
		type: SET_LASTVISITSTEXT,
		payload: text
	})

	const data = {fingerPrint, ...fingerPrintSystemInfos}
	storeFingerprint(data)
},[createFingerPrintString, dispatch])

useEffect(() => {
	doFingerprint()
},[doFingerprint])

	return(
		<div>
			<p>{finger}</p>
			<canvas ref={canvasRef} width='200' height='100' ></canvas>
			{/* <canvas ref={canvasRef} width='200' height='100' hidden></canvas> */}

		</div>
	)
}

export default FingerprintComp

import React, {useRef, useEffect, useState, useCallback } from 'react'
import { useDataDispatchCtx } from '../store/dataContext'
import { systemInfos } from '../infoSources/systemInfos'
import { hashFunction } from '../utils/hash'
import { drawCanvasFingerPrint } from '../utils/canvasDraw'
import { deletData, storeFingerprint, getFingerprintInfos,storeIPInfos } from '../store/actions/fingerPrintActions'
import { backendFetcher } from '../store/actions/backendFetcher'

const FingerprintComp = () => {

	const [canvasHash, setCanvasHash] = useState('')
	const [ fingerPrintID, setFingerPrintID] = useState('')
	const dispatch = useDataDispatchCtx()

	const canvasRef = useRef(null)

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
		console.log('hatString in drawing comp ', hashString)
	
		setCanvasHash(hashString)
	},[])


// draw canvas fingerprinting effect
	useEffect(() => {
		draw()
	},[draw])


// create fingerprinting
const createFingerPrint = useCallback(async()=> {
	let systemInf = await systemInfos()

	let systemString = Object.values(systemInf).join('').replace(/[\s,-.—]/g, '')
	console.log(systemInf)

	let hash = canvasHash
	let fingerprintString = hashFunction(systemString.concat(hash))

	// let userData = {...systemInf, ...hash}
	console.log("systemString")
	console.log(systemString)

	console.log("fingerprintString")
	console.log(fingerprintString)
	// return userData
	return fingerprintString
	
},[])



useEffect(() => {
	console.log("fetching backend")

	const fetch = async() => {
		let options = { url:'/test/ip', method:'get'}
		let resp = await backendFetcher(options)

		dispatch(storeIPInfos(resp.data))
		console.log(resp)
	}

	fetch()

},[])



useEffect(() => {
	const getFingerprint = async() => {
		let fingerPrint = await createFingerPrint()
		console.log(fingerPrint)
		setFingerPrintID(fingerPrint)
		storeFingerprint(fingerPrint)
		getFingerprintInfos(fingerPrint)
	}

	getFingerprint()
	
},[createFingerPrint])





	return(
		<div style={{border: '1px solid red', margin:"10px"}}>
			<p>{canvasHash}</p>
			<canvas ref={canvasRef} width='200' height='100' style={{border:'1px solid #000000'}}></canvas>
			<button onClick={() => deletData(fingerPrintID)}>delete infos</button>
		</div>
	)
}

export default FingerprintComp

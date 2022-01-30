import React, {useRef, useEffect, useState, useCallback} from 'react'
import { useDataDispatchCtx } from '../store/dataContext'
import { SET_CANVASHASH } from '../store/constants'

const FingerprintComp = () => {

	const [hashString, setHash] = useState('')
	const dispatch = useDataDispatchCtx()

	const canvasRef = useRef(null)
	
	let c1 = "rgb(25,39,242)"
	let c2 = "rgb(250,10,241)"
	let c3 = "rgb(60,255,239)"

	let c4 = "rgb(255,246,62)"
	let c5 = "rgb(61,255,142)"
	let c6 = "rgb(230,108,8)"


	const drawFingerPrint = useCallback((ctx,color1, color2, color3) => {
		ctx.beginPath()
		ctx.fillStyle = color1;
		ctx.lineTo(10,40)
		ctx.lineTo(120,40)
		ctx.lineTo(10,90)
		ctx.lineTo(70,90)
		ctx.fill()
		ctx.closePath();


		ctx.beginPath()
		ctx.fillStyle = color2;
		ctx.lineTo(40,10)
		ctx.lineTo(90,10)
		ctx.lineTo(90,40)
		ctx.lineTo(70,40)
		ctx.lineTo(70,60)
		ctx.lineTo(100,60)
		ctx.lineTo(100,80)
		ctx.lineTo(10,80)
		ctx.lineTo(10,100)
		ctx.fill()
		ctx.shadowBlur=5;
		ctx.shadowColor="rgb(134,12,255)";
		ctx.closePath();

		ctx.fillStyle = color1;
		let txt1 = 'A$x^%!Q>';
		ctx.textBaseline = "top";
		ctx.font = '60px "Times New Roman"';
		ctx.rotate(-.3);
		ctx.fillText(txt1, -30, 10);

		let txt = 'AshybxYzgst$57jgcsfpo;?S@^%!_+=}"](Q>';
		ctx.textBaseline = "top";
		ctx.font = '10px "Arial"';
		ctx.textBaseline = "alphabetic";
		ctx.fillStyle = color3;
		ctx.rotate(.5);
		ctx.fillText(txt, 5, 10);

		ctx.fillStyle = "rgb(205,255,155)";
		ctx.shadowBlur=9;
		ctx.shadowColor="rgb(255,1,1)";
		ctx.fillRect(100,0,10,50);
		

	},[])
	
//canvas fingerprinting effect
	useEffect(() => {
		const canvas = canvasRef.current
		const ctx = canvas.getContext('2d')

		drawFingerPrint(ctx,c1, c2,c3)
		ctx.rotate(-.3)
		ctx.transform(.8, .3, .2, .8, 20, 50);
		drawFingerPrint(ctx,c4,c5,c6)


		let src = canvas.toDataURL();
		let hash = 0;
		
		for(let index in src){
			let char = src.charCodeAt(index)
			hash = ((hash<<5)-hash)+char
			hash = hash & hash
			setHash(hash)
		}
	},[])

	useEffect(() => {
		dispatch({
			type: SET_CANVASHASH,
			payload: hashString
		})
	},[hashString, dispatch])

// info fingerprinting



	return(
		<div style={{border: '1px solid red', margin:"10px"}}>
			<p>{hashString}</p>
			<canvas ref={canvasRef} width='200' height='100' style={{border:'1px solid #000000'}}></canvas>
		</div>
	)
}

export default FingerprintComp

export const drawCanvasFingerPrint = async(ctx,color1, color2, color3,color4) => {
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
	
	ctx.fillStyle = color4;
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
	ctx.fillRect(100,0,10,50)
}


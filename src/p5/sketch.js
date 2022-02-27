import port from '../img/port.jpeg'
import { getBrowser } from '../infoSources/browserInfos'
import { SET_ERROR } from '../store/constants'


export const sketch = (p5)=> {
	p5.state = {}
	p5.dispatch = () => {}

	const width = window.innerWidth -200
	// let height
	let infos
	let img
	let pixelSpots = []

	const selectImg = (browser) => {
		switch(browser){
			case "chrome":
				return port
			case 'firefox':
				return port
			case 'safari': 
				return port
			default: 
				return port
		}
	}


	p5.preload = () => {
		try{
			const browser = getBrowser()
			const image = selectImg(browser)
			console.log(browser, image)

			img = p5.loadImage(image, i => {
				img = i
				img.resize(0, window.innerHeight/1.5)
				console.log(img)
			})
			
		}catch(error){
			console.log("error in try block")

			console.log(error)
			p5.dispatch({
				type: SET_ERROR,
				payload: 'Error in preaload up the sketch'
			})
		}
		
	}


	p5.setup = async() => {
		try{
			await p5.state.displayInfos
			infos = Object.values(p5.state.displayInfos)

			console.log(infos)
			for(let i of infos){
				console.log(i)
			}


			p5.createCanvas(width, window.innerHeight -100)
			
			img.loadPixels()
			
			for(let x = 0; x < img.width; x ++){
				for(let y = 0; y< img.height; y++){
					if(x === img.width -1 && y === img.height -1){
						console.log("done")
					}

					let index = (x + y * img.width) * 4

					let color = img.pixels[index]

					if(color < 230){
						pixelSpots.push(p5.createVector(x,y))
					}
				}
			}

		}catch(error){
			console.log(error)
		
			p5.dispatch({
				type: SET_ERROR,
				payload: 'Error in setting up the sketch'
			})
		}
		
	
	}

	p5.draw = () => {
		p5.background(255)
		p5.fill(0)
		p5.ellipse(100,100,50)
		if(infos){
			for(let [i,v] of Object.entries(infos)) {
				// console.log(v)
				let x = 100 + i * 10
				let y = 50 + i* 10
				p5.ellipse(x,y,10)
				p5.text(v,x,y + 15)
			}
		}
		
	}

}
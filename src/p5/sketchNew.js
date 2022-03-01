import port from '../img/port.jpeg'
import {Particle} from './Particle'
import { getBrowser } from '../infoSources/browserInfos'
import { wait } from '../utils/helpers'



export const sketchNew = (p5) => {
	p5.state = {}
	p5.dispatch = () => {}

	const width = window.innerWidth
	let height
	let portImg
	let particles = []
	let spots = []
	let infos =[]
	let canvas
	let infoPoints = []
	let drawParticles = false
	let duration = 1000
	let startTime
	let startValue
	let drawStart = false
	let drawVars = []

	
// select image based on browser
	const selectImg = (browser) => {
		switch(browser){
			case'chrome':
				return port;
			case ' firefox':
				return true;
			case 'safari':
				return true
			default:
				return port
		}
	}

	const createNewParticle = () => {
		let index = Math.floor(p5.random(0, spots.length))
		let spot = spots[index]
		let x = spot.x
		let y = spot.y
		let color = spot.col
		let valid = true

		for(let p of particles){
			let dist = p5.dist(x,y,(p.x + p.getTextWidth()),(p.y + 15))
			let pWidth = p.radius * 2 

			if(dist < p.getTextWidth()){
				valid = false
				break
			}
		}

		if(valid){
			let info = infos.shift()
			return info !== undefined ? new Particle(p5, x, y, color,p5.state.drawVariables, info) : new Particle(p5, x, y, color,p5.state.drawVariables)
		}else{
			return null
		}
	}


	const createPoints = () => {
		// let total = 600
		
		let total = p5.state.drawVariables.screenResolution.width || 1000
		let count = 0
		while(count < total){
			let particle = createNewParticle()
			if(particle){
				particles.push(particle)
				count ++
			}
			
			if(count >= total){
				drawParticles = true
				startTime = p5.millis()
				infoPoints = particles.filter( p => p.info !== undefined)
				break
			}
		}
	}

	/*  p5 functions */
	p5.preload = () => {
		const browser = getBrowser()
		let image = selectImg(browser)

		portImg = p5.loadImage(image, img => {
			portImg = img
			portImg.resize(0, window.innerHeight/1.5)
			height = portImg.height
		})
	}

	p5.setup = async() => {
		await p5.state.displayInfos
		await p5.state.drawVariables
		// console.log(p5.state)

		// drawVars = Object.values(p5.state.drawVariables)
	
		infos = Object.values(p5.state.displayInfos)
		
		canvas = p5.createCanvas(width, height + 100)
	

		portImg.loadPixels()
	
		for(let x = 0; x < portImg.width; x++){
			for(let y = 0; y < portImg.height; y++){
				if(x === portImg.width - 1 && y === portImg.height - 1){
					createPoints()
				}
				let index = (x + y * portImg.width) * 4
				let col = portImg.pixels[index]
				let color = portImg.get(x,y)

				if(col < 230){
					// spots.push(p5.createVector(x,y))
					spots.push({x: x, y:y, col: color})
				}
			}
		}
	}

	let progress
	let current = startValue

	p5.draw = async() => {
		// p5.rectMode(p5.CENTER)
		p5.translate(width / 2 - (width / 4), 10);
		if(drawParticles){
			progress = (p5.millis() - startTime) / duration 
			if(progress >= 2){
				let p = infoPoints.shift()
				// console.log(p)
				
				if(p !== undefined){
					while(p.growing){
						p5.frameRate(0.7)
						p.grow()
						await wait(100)
						p.show()

						if(p.edges()){
							p.showInfo()
							p.growing = false
						}

						for(let otherP of particles){
							if(p !== otherP){
								let dist = p5.dist(p.x, p.y, otherP.x, otherP.y)

								if(dist < p.radius *  2  + otherP.radius * 2){
									p.showInfo()
									p.growing = false
									break
								}
							}
						}
						startValue = current
						startTime = p5.millis()
					}
				}
			
				if(p === undefined){
					console.log("no p anymore")
					drawStart = true
				}
			}


		if(drawStart)	{
			// console.log("draw start is ok")
			p5.frameRate(10)

			for(let p of particles){
				if(p.info !== undefined){
					continue
				}

				if(p.growing){
					if(p.edges()){
						p.growing = false
					}else{
						for(let otherP of particles){
							if( p !== otherP){
								let dist = p5.dist(p.x, p.y, otherP.x , otherP.y)
								if(dist  < p.radius + otherP.radius){
									p.growing = false
									break
								}
							}
						}
					}
				}
				p.grow()
				p.show()			
			}
		}
		}
	}
}
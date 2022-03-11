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
			let pWidth = (p.radius * 2) * p5.state.drawVariables.deviceMemory
			
			if(dist < pWidth){
			// if(dist < pWidth && p.getColor() !== spot.col){
				valid = false
				break
			}
		}

		if(valid){
			return new Particle(p5, x, y, color,p5.state.drawVariables)
			// let info = infos.shift()
			// return info !== undefined ? new Particle(p5, x, y, color,p5.state.drawVariables, info) : new Particle(p5, x, y, color,p5.state.drawVariables)
		}else{
			return null
		}
	}



	const checkPoint = (point) => {
		if(infoPoints.length > 0){
			for(let p of infoPoints){
				// infoPoints.forEach((p) => {
					// console.log(p)
					// console.log(point)

					// let dist = p5.dist(point.getX(), point.getY(), p.getX(), p.getY())
					// if(dist < point.getTextWidth()+ p.getTextWidth() + (p.radius * 2) + (point.radius * 2) + 100){
					// 	return false

					// }
					// return true


				// })

				
					// console.log(p)
					// let dist = p5.dist(point.getX(), point.getY(), p.getX(), p.getY())
					// console.log('something to loop', p)
					
					// if(dist < point.getTextWidth()+ p.getTextWidth() + (p.radius * 2) + (point.radius * 2) + 100){
					// 	// break
					// 	return false
					// }
					return true
				
				}
			// 	console.log(p)
			
			// 	let dist = p5.dist(point.getX(), point.getY(), p.getX(), p.getY())
			// 	console.log('dist', dist)
			// 	if(dist < p.getTextWidth() + 100){
			// 		// break
			// 		return false
			// 	}
			// 	return true
			// }
		}
		else if(infoPoints.length === 0){
			return true
		}
	}


	const createInfoPoints = () => {
		let index = Math.floor(p5.random(0, particles.length))

		let p = particles[index]

		let valid = checkPoint(p)
		if(valid){
			p.setInfo(infos.shift())
			// console.log(p.getInfo())
			infoPoints.push(p)
		}
	}


	const createPoints = () => {
		// let total = 6000
		
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
				while(infos.length > 0){
					// console.log('info linegh', infos)
					createInfoPoints()
					if(!infos){
						// console.log('info points done')
						break
					}
					// break
				}
				// if(!infos){
				// 	console.log('info points done')
				// 	break
				// }

				// infoPoints = particles.filter( p => p.getInfo() !== undefined)
				// break
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
		console.log('displaInfos in sketch ', p5.state.displayInfos)
		
		infos = Object.values(p5.state.displayInfos)


		canvas = p5.createCanvas(width, height + 50)
	

		portImg.loadPixels()
	
		for(let x = 0; x < portImg.width; x++){
			for(let y = 0; y < portImg.height; y++){
				if(x === portImg.width - 1 && y === portImg.height - 1){
					createPoints()
				}
				let index = (x + y * portImg.width) * 4
				let col = portImg.pixels[index]
				let r = portImg.pixels[index]
				let g = portImg.pixels[index +1]
				let b = portImg.pixels[index+ 2]
				let color = portImg.get(x,y)
				let c = r + g + b
				// console.log(color, 'color')

				// if(col < 230){
					// if(r < 220 && g < 220 && b < 220){
						if( c < 750){
					// console.log(col)
					// console.log(colo)
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
				
				if(p !== undefined){
					while(p.isGrowing()){
						p5.frameRate(0.7)
						p.grow()
						await wait(100)
						p.show()
					
						if(p.edges()){
							p.showInfo()
							p.setGrowing(false)
						}

						for(let otherP of particles){
							if(p !== otherP){
								let dist = p5.dist(p.getX(), p.getY(), otherP.getX(), otherP.getY())

								if(dist < p.getRadius() *  2  + otherP.getRadius() * 2){
									p.showInfo()
									p.setGrowing(false)
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
				if(p.getInfo() !== undefined){
					continue
				}

				if(p.isGrowing()){
					if(p.edges()){
						p.setGrowing(false)
					}else{
						for(let otherP of particles){
							if( p !== otherP){
								let dist = p5.dist(p.getX(), p.getY(), otherP.getX() , otherP.getY())
								if(dist  < p.getRadius() + otherP.getRadius()){
									p.setGrowing(false)
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
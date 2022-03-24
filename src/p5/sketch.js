import chrome from '../img/chrome.png'
import firefox from '../img/firefox.png'
import safari from '../img/safari.png'
import {Particle} from './Particle'
import { getBrowser } from '../infoSources/browserInfos'
import { wait } from '../utils/filterHelpers'
import { isMobile } from '../infoSources/deviceInfos'



export const sketch = (p5) => {
	p5.state = {}
	p5.dispatch = () => {}

	const width = window.innerWidth
	let height
	let portImg
	let particles = []
	let spots = []
	let infos =[]
	let infoPoints = []
	let drawParticles = false
	let drawStart = false
	let drawVars
	let browser
	
	
	const selectImg = (b) => {
		switch(b){
			case'Chrome':
				return chrome;
			case 'Firefox':
				return firefox;
			case 'Safari':
			case "Safari Mobile":
				return safari
			default:
				return chrome
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
			// console.log(p)
			let dist = p5.dist(x,y,(p.getX() + p.getTextWidth()),(p.getY() + 15))
			let pWidth = p.getRadius() * 2
			// console.log(p.getRadius())
			// console.log(pWidth)
			// p5.noLoop()
			
			if(dist < pWidth){
				valid = false
				break
			}
		}

		if(valid){
			return new Particle(p5, x, y, color,)
		
		}else{
			return null
		}
	}


	const checkPoint = (point) => {
		let valid = false
		if(infoPoints.length > 0){
			infoPoints.forEach((p) => {
				if(p !== point){
					let dist = p5.dist(p.getX(), p.getY(), point.getX(), point.getY())
					let distance = p.getRadius()+ point.getRadius() + 200
					if(dist > distance){
						valid = true
					}
				}
			});
		return valid
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
			infoPoints.push(p)
		}
	}


	const createPoints = () => {
		
		let total = drawVars.screenResolution?.width || 1000
		let count = 0

		while(count < total){
			let particle = createNewParticle()
		
			if(particle){
				particles.push(particle)
				count ++
			}
		
			if(count >= total){
				drawParticles = true
				while(infos.length > 0){
					createInfoPoints()
					if(!infos){
						break
					}
				}
			
			}
		}
	}

	/*  p5 functions */
	p5.preload = () => {
		browser = getBrowser()
		let image = selectImg(browser)

		portImg = p5.loadImage(image, img => {
			portImg = img
			portImg.resize(0, window.innerHeight/1.3)
			height = portImg.height
		})
	}

	p5.setup = async() => {
		
		await p5.state.displayInfos
		drawVars = await p5.state.drawVariables		
		infos = Object.values(p5.state.displayInfos)

		p5.createCanvas(width, height + 100)

		portImg.loadPixels()
	
		for(let x = 0; x < portImg.width; x++){
			for(let y = 0; y < portImg.height; y++){
				if(x === portImg.width - 1 && y === portImg.height - 1){
					createPoints()
				}
				let index = (x + y * portImg.width) * 4
				let r = portImg.pixels[index]
				let g = portImg.pixels[index +1]
				let b = portImg.pixels[index+ 2]
				let color = portImg.get(x,y)
				let c = r + g + b
			
				if( c < 750){
					spots.push({x: x, y:y, col: color})
				}
			}
		}

	}

	p5.draw = async() => {	
		if(!isMobile() || window.innerWidth > 667){
			p5.translate(width / 2 - width/4, 20)
		}
	
		if(drawParticles){

			let p = infoPoints.shift()
			if(p !== undefined){
				while(p.isGrowing()){
					p5.frameRate(0.7)
					await wait(100)

					p.grow()
					await wait(100)
					p.show()

					if(p.edges()){
						p.showInfo()
						p.setGrowing(false)
						break
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
				}
			}
			if(p === undefined){
				drawStart = true
			}
		}


		if(drawStart)	{
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
				await wait(50)
				p.show()			
			}

			let doneArray = particles.filter((p) => p.isGrowing() === true)

			if(doneArray.length === 0){
				console.log('END')
				p5.noLoop()
			}
		}
	}
}
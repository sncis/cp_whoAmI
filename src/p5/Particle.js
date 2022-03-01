// const Particle = (p5, x, y, info = undefined) => {
export function Particle(p5,x,y, color, drawVars, info = undefined){
	// console.log('x in particles', x, y)
	this.x = x
	this.y = y
	this.info = info
	this.radius = Math.round((drawVars.zoomlevel / drawVars.cpu) / drawVars.fonts)
	this.growing = true
	this.color = color

	this.textWidth = p5.textWidth(info)


	this.getTextWidth = () => {
		// console.log(Math.floor(this.textWidth))
		return Math.floor(this.textWidth)
	}
	this.grow = () => {
		if(this.growing){
			this.radius += 1
		}
	}

	this.edges = () => {
		return (this.x + this.radius > p5.width || this.x - this.radius < 0 || this.y + this.radius > p5.height || this.y - this.radius < 0)
	}

	

	this.showInfo = () => {
		p5.noStroke()
		p5.textAlign(p5.CENTER)
		p5.fill(0)
		// p5.textWrap(p5.WORD)
		p5.text(this.info, this.x, (this.y + this.radius + (drawVars.cpu * 2)))
	}

	this.show = () => {
		// console.log('text width', this.textWidth)

		// console.log("show is called")
		// console.log(this.color)
		p5.fill(this.color)
		p5.stroke(this.color)
		p5.ellipse(this.x, this.y, this.radius * 2, this.radius * 2)
	}


}

// export default Particle
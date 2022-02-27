// const Particle = (p5, x, y, info = undefined) => {
export function Particle(p5,x,y,info = undefined){
	// console.log('x in particles', x, y)
	this.x = x
	this.y = y
	this.info = info
	this.radius = 1
	this.growing = true

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
		p5.text(this.info, this.x, (this.y + this.radius + 15))
	}

	this.show = () => {
		// console.log("show is called")
		p5.fill(0)
		p5.stroke(0)
		p5.ellipse(this.x, this.y, this.radius*2, this.radius * 2)
	}


}

// export default Particle
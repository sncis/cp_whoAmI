// const Particle = (p5, x, y, info = undefined) => {
export function Particle(p5,x,y, color, drawVars, info = undefined){
	this.x = x
	this.y = y
	this.info = info
	this.growing = true
	this.color = color
	this.drawVars = drawVars
	this.zoomLevel = drawVars.zoomLevel ? drawVars.zoomLevel : 100
	this.cpu = drawVars.cpu ? drawVars.cpu : 2
	this.fonts = drawVars.fonts ? drawVars.fonts : 20
	this.radius = Math.round(this.zoomLevel / this.fonts)
	this.deviceMemory = drawVars.deviceMemory ? drawVars.deviceMemory : 8
	this.textWidth = p5.textWidth(info)

	this.getX = () => {
		return this.x
	}
	this.getY = () => {
		return this.y
	}

	this.getInfo = () => {
		return this.info
	}

	this.setInfo = (value) => {
		this.info = value
	}

	this.isGrowing = () => {
		return this.growing
	}
	this.setGrowing = (value) => {
		this.growing = value
	}

	this.getRadius = () => {
		return this.radius
	}

	this.getColor = () => {
		return this.color
	}

	this.getTextWidth = () => {
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
		let decal = this.fonts/this.deviceMemory < 15 ? 15 : this.fonts/this.deviceMemory
		p5.text(this.info, this.x, (this.y + this.radius + decal))
	}

	this.show = () => {
		p5.fill(this.color)
		p5.stroke(this.color)
		p5.ellipse(this.x, this.y, this.radius * 2, this.radius * 2)
	}
}

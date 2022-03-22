
export const isTouchScreen = () => {
	let isTouch = false
	if("maxTouchPoints" in navigator || 'msMaxTouchPoints' in navigator){
		isTouch = navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0
	}
	return isTouch
}


export const getScreenResolution = (toString = false) => {
	const width = window.screen.width
	const height = window.screen.height
	const depth = window.screen.colorDepth

	if(toString){
		return `${width}, ${height}, ${depth}`
	}
	return {width, height, depth}
}


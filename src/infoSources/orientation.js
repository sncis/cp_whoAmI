export const isLandscape = () => {
		const landscape = window.innerWidth > window.innerHeight
		return landscape ? 'Device is in Landscape orientation' : 'Device is in Portrait orientation'
	}
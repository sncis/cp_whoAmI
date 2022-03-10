export const returnLayout = (keyQ, keyY, keyW) => {

	if(keyQ === 'q' && keyY === 'y' && keyW !== 'z'){
		return "QWERTY"
	}

	if(keyQ === 'q' && keyY === 'z'){
		return "QWERTZ"
	}

	if(keyQ === 'q' && keyY === 'j'){
		return "Colemak"
	}

	if(keyQ === "'" && keyY === 'f'){
		return "Dvorak"
	}

	if(keyQ === "q" && keyW === 'z'){
		return "QZERTY"
	}

	if(keyQ === "a" && keyW === 'z'){
		return "AZERTY"
	}
	else{
		return ''
	}
}

export const getKeyboardLayout = () => {
	let keyboardLayout = undefined
	if(navigator.keyboard){
		const keyboard = navigator.keyboard

		keyboardLayout = keyboard.getLayoutMap().then(layout => {
			let keyQ = layout.get('KeyQ')
			let keyY = layout.get('KeyY')
			let keyW = layout.get('KeyW')
		
			return  returnLayout(keyQ, keyY, keyW)
		})
	}	

	return keyboardLayout
}
import { useEffect, useState } from 'react'

export const usePointerEffect = () => {

	const [pointer, setPointer] = useState(null)

	const detectType = (event) => {
		switch(event.pointerType){
			case 'mouse':
				setPointer('mouse')
				break;
			case 'touch':
				setPointer('finger')
				break;
			case 'pen':
				setPointer('pen')
				break;
			default:
				return undefined
		}

	}
	useEffect(() => {
		document.addEventListener('pointerdown', detectType, true)

		return  () => document.removeEventListener('pointerdown',detectType, true )
	})

	return pointer
}
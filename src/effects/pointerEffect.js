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
			default:
				return 'no pointer'
		}

	}
	useEffect(() => {
		document.addEventListener('pointerdown', detectType, true)

		return  () => document.removeEventListener('pointerdown',detectType, true )
	})

	return pointer
}
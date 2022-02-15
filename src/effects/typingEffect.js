import { useState, useEffect } from "react";

export const useTypingEffect = (text) => {
	const [typedText, setTypedText] = useState('')

	useEffect(() => {
		const typingEffect = setTimeout(() => {
			setTypedText(text.slice(0, typedText.length + 1))
			console.log("length of typed text")
			console.log(typedText.length)
		}, 200)
		
		return () => clearTimeout(typingEffect)
	},[text, typedText])

	// if(typedText.length === text.length){
	// 	return true
	// }

	return typedText
}
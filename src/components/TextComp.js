import "../css/TextComp.css"
import React, { useRef } from 'react'
import { useTypingEffect } from '../effects/typingEffect'


const TextComp = (props) => {
	const typedText = useTypingEffect(props.text)
	let ref = useRef(true)

	if(ref.current && document.getElementById(props.i)){
		document.getElementById(props.i).classList.remove('blinking-cursor')
	}

	return(
		<div>
			<p key={props.i +1} id={props.i +1} className='typed-text blinking-cursor'>{typedText}</p>
		</div>
	)

}

export default TextComp
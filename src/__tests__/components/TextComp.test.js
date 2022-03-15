import React from 'react'
import { screen, render } from '@testing-library/react'
import { renderHook , act} from '@testing-library/react-hooks';
import { DataStateProvider } from '../../store/dataContext'


import TextComp from '../../components/TextComp'
import { useTypingEffect } from '../../effects/typingEffect'


const wrapper = () => (
	<DataStateProvider>
		<TextComp text="soem typed text" i={2}/>
	</DataStateProvider>
	)




describe("TextComp", () => {
	it('should render text', async() => {
		// const { result } = renderHook(useTypingEffect, {wrapper : wrapper})
		// console.log(result.current)
		// expect(result.current.typedText).toEqual('som typed text')
		// const {comp} = wrapper()
	
		// act(() => {
		// 	comp.current.setTypedText("some text")
		// })

		// expect(screen.getByText(/some typed text/)).toBeInTheDocument()
	})

	it('should render hook', () => {
		// const {result} = renderHook(useTypingEffect)

		// act(() => {
		// 	result.current.setTypedText('some text')
		// 	expect(result.current.typedText).toEqual("some text")
		// })
	})
})
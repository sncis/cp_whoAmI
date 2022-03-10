import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import {render, screen, fireEvent} from '@testing-library/react'
import { DataDispatchCtx, DataStateCtx } from '../../store/dataContext'
import StartBtnComp from '../../components/StartBtnComp'
import * as pointer from '../../effects/pointerEffect'


const renderStartBtnComp = (state, dispatch) => {
	return render(
		<MemoryRouter initialEntries={[{ pathname: '/' }]}>
		<DataDispatchCtx.Provider value={dispatch}>
			<DataStateCtx.Provider value ={state}>
				<StartBtnComp />
			</DataStateCtx.Provider>
		</DataDispatchCtx.Provider>
		</MemoryRouter>

	)
}

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
 useNavigate: () => mockedUseNavigate,
}));


describe('StartBtnComp', () => {

	it('should render without errors', () => {
		jest.spyOn(pointer, 'usePointerEffect').mockReturnValue('mouse')

		const mockDispatch = jest.fn()
		const mockState = {loading:false}
		const action = {"payload": "mouse", "type": "SET_POINTER"}

		renderStartBtnComp(mockState,mockDispatch)

		const btn = screen.getByRole('button')
		
		expect(btn).toBeInTheDocument()
		expect(screen.getByText(/Who Am I/)).toBeInTheDocument()
		expect(mockDispatch).toHaveBeenCalledWith(action)
	})

	it('should render loading message', () => {
		const mockDispatch = jest.fn()
		const mockState = {loading:true}
		
		renderStartBtnComp(mockState,mockDispatch)

		const btn = screen.getByRole('button')
		fireEvent.click(btn)
		expect(screen.getByText(/Loading your Information.../)).toBeInTheDocument()
		expect(mockedUseNavigate).not.toHaveBeenCalled()
	})
	
	it('should call navigation ', () => {
		const mockDispatch = jest.fn()
		const mockState = {loading:false}
		
		renderStartBtnComp(mockState,mockDispatch)

		const btn = screen.getByRole('button')
		fireEvent.click(btn)
		expect(screen.queryByText(/Loading your Information.../)).toBeNull()
		expect(mockedUseNavigate).toHaveBeenCalledWith('/sketch')
	})
})
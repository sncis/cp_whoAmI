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
	// beforeEach(() => {
	// 	jest.clearAllMocks()
	// })
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should render without errors', () => {

		const mockDispatch = jest.fn()
		const mockState = {loading:false}

		renderStartBtnComp(mockState,mockDispatch)

		const btn = screen.getByRole('button')
		
		expect(btn).toBeInTheDocument()
		expect(screen.getByText(/Who Am I/)).toBeInTheDocument()
	})
	
	it('should render loading message when button is clicked', () => {
		const mockDispatch = jest.fn()
		const mockState = {loading:true}
		
		renderStartBtnComp(mockState,mockDispatch)

		const btn = screen.getByRole('button')
		fireEvent.click(btn)
		expect(screen.getByText(/Loading your Information.../)).toBeInTheDocument()
		expect(mockedUseNavigate).not.toHaveBeenCalled()
	})

	it("should dispatch pointer type", () =>{
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
	
	it('should call navigation', () => {
		const mockDispatch = jest.fn()
		const mockState = {loading:false}
		
		renderStartBtnComp(mockState,mockDispatch)

		const btn = screen.getByRole('button')
		fireEvent.click(btn)
		expect(screen.queryByText(/Loading your Information.../)).toBeNull()
		expect(mockedUseNavigate).toHaveBeenCalledWith('/sketch')
	})

	it('should dispatch timeCollapse', async() =>{
		const mockDispatch = jest.fn()
		const mockState = {loading:false}
		jest.spyOn(pointer, 'usePointerEffect').mockReturnValue('touch')
	
		let d1 = new Date()
		const first = jest.spyOn(global, 'Date').mockReturnValueOnce(d1)
		
		renderStartBtnComp(mockState,mockDispatch)
	
		
		
		const btn = screen.getByRole('button')
		
		await fireEvent.click(btn)
	
		let d2 = new Date()
		const second = jest.spyOn(global, 'Date').mockReturnValueOnce(d2)

	
		const action = {
			"payload": "touch", "type": "SET_POINTER",
			"type": "SET_TIMETOCLICKBUTTON", "payload": (second - first) / 1000,
		}
		expect(mockDispatch).toHaveBeenCalledWith(action)
	})
})
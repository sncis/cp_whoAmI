import React from 'react'
import { render, screen } from '@testing-library/react'

import CanvasComp from '../../components/CanvasComp'
import { DataDispatchCtx, DataStateCtx } from '../../store/dataContext'


jest.mock('../../components/P5Wrapper', () => ()=> {return <div>p5 wrapper</div>})
jest.mock('../../pages/HomePage', () => () => <div>Hello Home page</div>)


const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
 useNavigate: () => mockedUseNavigate,
}));


const renderComp = (state, dispatch) => {
	return render(
		<DataDispatchCtx.Provider value={dispatch}>
			<DataStateCtx.Provider value ={state}>
				<CanvasComp />
			</DataStateCtx.Provider>
		</DataDispatchCtx.Provider>
		
	)
}

describe('CanvasComp', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})


	it('should render p5 component when display infos are present in state', () => {
		const mockState = {
			displayInfos : {as: "AS35244 Tele Columbus AG",
		 		city: "Munich",
		 		country: "Germany",
		 		countryCode: "DE"
			},
			loading:false
		}
		const mockDispatch = jest.fn()
		// p5Wrapper.mockImplementationOnce(()=> {return(<div>p5 wrapper</div>)})

		renderComp(mockState, mockDispatch)

		expect(screen.getByText(/p5 wrapper/)).toBeInTheDocument()
	})

	it('should not render p5 wrapper when no displayInfos in state', () => {
		const mockState={
			loading:true
		}
		const mockDispatch = jest.fn()
		renderComp(mockState, mockDispatch)

		expect(screen.queryByText(/p5 wrapper/)).toBeNull()
	})

	it('should redirect to home page when no displayinformation', async() => {
		const mockState = {
			loading:false
		}
		const mockDispatch = jest.fn()

	 	renderComp(mockState,mockDispatch)
		
		 expect(mockedUseNavigate).toHaveBeenCalled()

	})

	it('should redirect to home page when error occured', async() => {
		const mockState = {
			error:'some error'
		}
		const mockDispatch = jest.fn()

	 	renderComp(mockState,mockDispatch)
		
		 expect(mockedUseNavigate).toHaveBeenCalled()

	})

})


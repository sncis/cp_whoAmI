import React from 'react'
import { render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import {backendFetcher} from '../../store/actions/backendFetcher'
import { apiFetcher } from '../../store/actions/apiFetcher'

import HomeComp from './components/HomeComp'
import * as helpers from './utils/helpers'
import * as fonts from './infoSources/fonts'
import * as dispatchContext from './store/dataContext'

import { DataDispatchCtx, DataStateCtx } from './store/dataContext'


jest.mock('../../components/FingerprintComp', () => () => (<div>Fingerprint Comp</div>));
jest.mock('../../store/actions/backendFetcher')
jest.mock('../../store/actions/apiFetcher')



const renderHomeComp = (state, dispatch) => {
	return render(
		<DataDispatchCtx.Provider value={dispatch}>
			<DataStateCtx.Provider value ={state}>
				<BrowserRouter>
					<Routes>
						<Route exact path='/' element={<HomeComp />} />
					</Routes>		
				</BrowserRouter>
			</DataStateCtx.Provider>
		</DataDispatchCtx.Provider>
		
	)
}

describe("HomeComp", () => {
	beforeEach(() => {
		jest.clearAllMocks()

		jest.spyOn(helpers, "filterIPInfos").mockImplementation(() => {
			return {as:"some ISP", city: 'munich',regionName: "bavaria",timezone: "Berlin",vendor: "some vendor",zip:"87635"}
		})

		jest.spyOn(fonts, 'getFonts').mockImplementation(() => {
			return ['ARNO PRO','Agency FB','Arabic Typesetting','Arial Unicode MS',"Arial", "Arial Black", "Arial Narrow", "Arial Rounded MT Bold",'AvantGarde Bk BT',
			'BankGothic Md BT','Batang']
		})
	})


	it("should render without error", async() => {
		const mockState = {
			canvasHash: '123456',
			loading: false
		}
		const mockDispatch = jest.fn()

		backendFetcher.mockImplementationOnce(() =>  Promise.resolve({data:"1234"}))
		apiFetcher.mockImplementationOnce(() =>  Promise.resolve({data: '87643', status:200}))

		renderHomeComp(mockState,mockDispatch)
	
		const btn = screen.getByRole('button')

		expect(btn).toHaveClass("startBtn")
		expect(screen.getByText("Fingerprint Comp")).toBeInTheDocument()
		expect(screen.queryByText(/loading.../)).toBeNull()
	})

	it('should render loading when state loading is true and user clicks on button', async() => {
		const mockState = {
			canvasHash: '123456',
			loading: true
		}
		const mockDispatch = jest.fn()

		backendFetcher.mockImplementationOnce(() =>  Promise.resolve({data:"1234"}))
		apiFetcher.mockImplementationOnce(() =>  Promise.resolve({data: '87643', status:200}))
		
		renderHomeComp(mockState,mockDispatch)
		// screen.debug()

		const btn = screen.getByRole('button')
	
		expect(btn).toHaveClass("startBtn")
		expect(btn).toBeInTheDocument()
    
		userEvent.click(screen.getByRole('button'));

		expect(screen.getByText(/loading.../)).toBeInTheDocument()
		expect(screen.queryByRole('button')).toBeNull()

	})

})
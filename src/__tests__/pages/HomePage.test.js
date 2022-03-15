import React from 'react'
import { MemoryRouter } from 'react-router-dom'

import { render, screen, waitFor, act, fireEvent } from '@testing-library/react'

import { DataDispatchCtx, DataStateCtx } from '../../store/dataContext'
import HomePage from '../../pages/HomePage'


jest.mock('../../components/FingerPrintComp', () => ()=> {return <div>FingerPrintComp</div>})
jest.mock('../../components/InfoComp', () => ()=> {return <div>InfoComp</div>})
jest.mock('../../components/StartBtnComp', () => ()=> {return <div>StartBtnComp</div>})
jest.mock('../../components/TextComp', () => ()=> {return <div>Some typed text</div>})


const renderHomePage = async() => {
	const state = {
		lastVisitText : "2022-02-03T14:29:12.322Z",
	}
	const dispatch = jest.fn()

	return render(
		<MemoryRouter initialEntries={[{ pathname: '/' }]}>
			<DataDispatchCtx.Provider value={dispatch}>
				<DataStateCtx.Provider value ={state}>
					<HomePage />
				</DataStateCtx.Provider>
			</DataDispatchCtx.Provider>
		</MemoryRouter>	
	)
}

describe('HomePage', () => {

	it('should render without error', async() => {

		await renderHomePage()
		expect(screen.getByText(/FingerPrintComp/)).toBeInTheDocument()
		expect(screen.getByText(/InfoComp/)).toBeInTheDocument()
		expect(screen.getByText(/StartBtnComp/)).toBeInTheDocument()
		expect(screen.getByText(/Some typed text/)).toBeInTheDocument()
	})

})

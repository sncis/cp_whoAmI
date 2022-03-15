import React from 'react'
import { MemoryRouter } from 'react-router-dom'

import { render, screen, waitFor, act, fireEvent } from '@testing-library/react'
import AboutPage from '../../pages/AboutPage'
import { DataDispatchCtx, DataStateCtx } from '../../store/dataContext'
import * as fingerprintAction from '../../store/actions/fingerPrintActions'




jest.mock('../../infoSources/systemInfos', () => ({
	getSystemInfos: () => Promise.resolve({info: 'some sys info', secondInfo: 'some second Info'}),
}))

jest.mock('../../components/NavigationComp', () => ()=> {return <div>home</div>})

jest.mock("../../effects/batteryEffect", () =>  ({
	useBatteryStatusEffect: () => { 
		return {
			batteryLevel: 36,
			charging: true,
			chargingTime: Infinity,
			dischargingTime: 12345
			}
		}
	})
)

const mockedUseNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
 useNavigate: () => mockedUseNavigate,
}));


const renderAboutPage = async() => {
	const state = {
		fingerprint : 123456789,
		pointer: 'mouse',
		timeToClickButton: 1.98

	}

	const dispatch = jest.fn()
	return render(
		<MemoryRouter initialEntries={[{ pathname: '/about' }]}>
			<DataDispatchCtx.Provider value={dispatch}>
				<DataStateCtx.Provider value ={state}>
					<AboutPage />
				</DataStateCtx.Provider>
			</DataDispatchCtx.Provider>
		</MemoryRouter>	
	)
}

describe("AboutPage", () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('should render page without errors', async() => {

		renderAboutPage()
		await waitFor(() => screen.findByText('home'))
		await waitFor(()=> screen.findAllByText('mouse'))

		expect(screen.getByText(/home/)).toBeInTheDocument()

		expect(screen.getByText(/123456789/)).toBeInTheDocument()
		expect(screen.getByText(/1.98/)).toBeInTheDocument()

		expect(screen.getByText(/36/)).toBeInTheDocument()
		expect(screen.getByText(/Infinity/)).toBeInTheDocument()
		expect(screen.getByText(/12345/)).toBeInTheDocument()

		expect(screen.getByText(/some sys info/)).toBeInTheDocument()
		expect(screen.getByText(/some second Info/)).toBeInTheDocument()
		expect(screen.getByRole('button')).toBeInTheDocument()

		// screen.debug()

	})

	it('should callnaviage and deletDate when clicking on the button', async() => {
		renderAboutPage()
		
		await waitFor(()=> screen.findAllByText('mouse'))
		const deleteSpy = jest.spyOn(fingerprintAction, 'deletData').mockReturnValue(1)

		const btn = screen.getByRole('button')

		fireEvent.click(btn)
		expect(await deleteSpy).toHaveBeenCalled()
		expect(mockedUseNavigate).toHaveBeenCalledWith('/')
	})


})
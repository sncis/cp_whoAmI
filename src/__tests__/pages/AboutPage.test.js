import React from 'react'
import { MemoryRouter } from 'react-router-dom'

import { render, screen, waitFor, act, fireEvent } from '@testing-library/react'
import AboutPage from '../../pages/AboutPage'
import { DataDispatchCtx, DataStateCtx } from '../../store/dataContext'
import * as fingerprintAction from '../../utils/fingerPrintActions'
import * as browserInfos from '../../infoSources/browserInfos'

jest.mock('../../infoSources/systemInfos', () => ({
	getSystemInfos: () => Promise.resolve({info: 'some sys info', secondInfo: 'some second Info'}),
	getSystemInfoStrings: () => ({'string1': 'some string infos', 'string2': 'some second string',pointer: 'mouse', batteryLevel: 36, batteryCharging: true, batteryChargingTime: Infinity, batteryDischargingTime: 86689})
}))

jest.mock('../../components/NavigationComp', () => ()=> {return <div>home</div>})

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
		jest.spyOn(fingerprintAction, 'getAllFingerPrints').mockReturnValue([123456789,-1737131536, -1117550210, -958996391, -723832795, -631324613, -454327225, -44842997, -32188627, 41555124, 416568245])
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
		expect(screen.getByText(/86689/)).toBeInTheDocument()

		expect(screen.getByText(/some string infos/)).toBeInTheDocument()
		expect(screen.getByText(/some second string/)).toBeInTheDocument()
		expect(screen.getByRole('button')).toBeInTheDocument()

	})

	it('should call naviage and deletDate when clicking on the button', async() => {

		renderAboutPage()
		
		await waitFor(()=> screen.findAllByText('mouse'))
		const deleteSpy = jest.spyOn(fingerprintAction, 'deletData').mockReturnValue(1)

		const btn = screen.getByRole('button')

		fireEvent.click(btn)
		
		expect(await deleteSpy).toHaveBeenCalled()
		expect(mockedUseNavigate).toHaveBeenCalledWith('/')
	})

	it('should call get uniqueless of fingerprint', async() => {
		renderAboutPage()
		await waitFor(()=> screen.findAllByText('mouse'))

		expect(await screen.findByText('10')).toBeInTheDocument()
	})

	it('should call browserSpy', async() => {
		const browserSpy = jest.spyOn(browserInfos, 'isChrome').mockReturnValue(true)

		renderAboutPage()

		await waitFor(()=> screen.findAllByText('mouse'))
	
		expect(browserSpy).toHaveBeenCalled()

	})
})
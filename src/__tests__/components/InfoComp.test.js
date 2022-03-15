import React from 'react'
import { render, act } from '@testing-library/react'
import { mount } from 'enzyme'
import { DataDispatchCtx, DataStateCtx } from '../../store/dataContext'
import InfoComp from '../../components/InfoComp'

jest.mock('../../store/actions/ipInfosFetcher', () => ({
	fetchIpInfos: () => Promise.resolve({ fetchInfos: "some ip info", fetchIPInfos: "some other info"})
}))

jest.mock('../../infoSources/systemInfos', () => ({
	displayInfos: () => Promise.resolve({infos: "some system info"}),
	getDrawVariables: () => Promise.resolve({drawInfos: "some drawIndos info"})
}))


describe("InfoComp",() => {
	
	beforeEach(() => {
		jest.resetAllMocks()
	})

	it('should call disptach function 3 times with right arguements', async() => {
		const mockState= {}
		const mockDispatch = jest.fn()

		let action = {
			"payload": true, "type": "SET_LOADING",
			"payload": {infos: "some system info",fetchInfos: "some ip info", fetchIPInfos: "some other info","batteryLevel": "", "charging": "", "chargingTime": "", "dischargingTime": ""}, "type": "SET_DISPLAYINFOS",
			"payload": false, "type": "SET_LOADING"
		}


	 await act(async() => {
	 mount(
			<DataDispatchCtx.Provider value={mockDispatch}>
				<DataStateCtx.Provider value ={mockState}>
					<InfoComp />
				</DataStateCtx.Provider>
			</DataDispatchCtx.Provider>
		)		
	})

	expect(mockDispatch).toHaveBeenCalledWith(action)
	
	})
})
import React from 'react'
import { render, screen, act } from '@testing-library/react'
import { mount } from 'enzyme'
import { DataDispatchCtx, DataStateCtx } from '../../store/dataContext'
import InfoComp from '../../components/InfoComp'
// import * as fetcher from '../../store/actions/fetchActions'
// import { fetchIpInfos } from "../../store/actions/fetchActions"
// import { systemInfos } from '../../infoSources/systemInfos'

jest.mock('../../store/actions/fetchActions', () => ({
	fetchIpInfos: () => Promise.resolve({ fetchInfos: "some ip info", fetchIPInfos: "some other info"})
}))
jest.mock('../../infoSources/systemInfos', () => ({
	systemInfos: () => Promise.resolve({infos: "some system info"})
}))



// jest.mock('../../store/actions/fetchActions')
 
// jest.mock('../../infoSources/systemInfos')


const renderComp = (state,dispatch) => {
	return render(
		<DataDispatchCtx.Provider value={dispatch}>
			<DataStateCtx.Provider value ={state}>
				<InfoComp />
			</DataStateCtx.Provider>
		</DataDispatchCtx.Provider>
	)}


describe("InfoComp",() => {
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

	// })	renderComp(mockState, mockDispatch)

		
	})

	expect(mockDispatch).toHaveBeenCalledWith(action)
	
	})

})
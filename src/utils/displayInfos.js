import * as NAV_INFOS from './navigatorInfos'
import { filterData } from './helpers'



export const displayInfos = () => {

	let infos = {
		connectionType: NAV_INFOS.getConnectionType(),
		vendor: NAV_INFOS.getVendor(),
		language: NAV_INFOS.getLanguage(),
		paltform: NAV_INFOS.getPlatform(),
		deviceMemory: NAV_INFOS.getDeviceMemeory(),
		cpu : NAV_INFOS.getCPU()
	}

	return filterData(infos)
}
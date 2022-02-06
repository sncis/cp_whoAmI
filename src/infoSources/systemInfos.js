import * as NAV_INFOS from './navigatorInfos'
import { filterData } from '../utils/helpers'
import { getFonts } from './fonts'
import { getKeyboardLayout } from './keyboard'



export const systemInfos = async() => {

	let infos = {
		connectionType: NAV_INFOS.getConnectionType(),
		vendor: NAV_INFOS.getVendor(),
		language: NAV_INFOS.getLanguage(),
		paltform: NAV_INFOS.getPlatform(),
		deviceMemory: NAV_INFOS.getDeviceMemeory(),
		cpu : NAV_INFOS.getCPU(),
		fonts : getFonts().length,
		plugins: NAV_INFOS.getPlugins(),
		getPDFViewer : NAV_INFOS.getPdfViewerEnabled(), 
		keyLayout: await getKeyboardLayout()
	}

	return filterData(infos)
}
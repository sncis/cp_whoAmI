import * as NAV_INFOS from '../infoSources/navigatorInfos'
import { filterData } from '../utils/helpers'
import { getFonts } from '../infoSources/fonts'
import { getKeyboardLayout } from '../infoSources/keyboard'
import { getBrowser, getBrowserVersion } from './browserInfos'


export const systemInfos = async() => {

	let infos = {
		connectionType: NAV_INFOS.getConnectionType(),
		vendor: NAV_INFOS.getVendor(),
		language: NAV_INFOS.getLanguage(),
		paltform: Object.values(await NAV_INFOS.getPlatform()),
		deviceMemory: NAV_INFOS.getDeviceMemeory(),
		cpu : NAV_INFOS.getCPU(),
		fonts : getFonts().length,
		plugins: NAV_INFOS.getPlugins(),
		getPDFViewer : NAV_INFOS.getPdfViewerEnabled().toString(), 
		keyLayout: await getKeyboardLayout(),
		browser: getBrowser(),
		browserVersion: getBrowserVersion(),
		timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
		screenResolution: NAV_INFOS.getScreenResolution(),
		zoomLevel: NAV_INFOS.getZoomLevel()

	}

	return filterData(infos)
}

export const crossFingerPrintInfos = async() => {
	let infos = {
		timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
		hardwareConcurrency: NAV_INFOS.getCPU(),
		screenResolution: NAV_INFOS.getScreenResolution(),
		zoomLevel: NAV_INFOS.getZoomLevel()


	}
	

}
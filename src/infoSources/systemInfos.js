import * as NAV_INFOS from '../infoSources/navigatorInfos'
import { filterData, filterStrings } from '../utils/filterHelpers'
import { getFonts } from '../infoSources/fonts'
import { getKeyboardLayout } from '../infoSources/keyboard'
import { getBrowser, getBrowserVersion } from './browserInfos'
import { isLandscape } from './orientation'
import { isTouchScreen, getScreenResolution } from './screenInfos'
import { getBluetoothEnabled } from './blueThooth'
import { getLanguage, getLanguages } from './languages'
import { getPermissions } from './permissions'
import { getConnectionType, getDownlinkSpeed} from './connection'
import {getPlatform , getCPU, getDeviceMemeory } from './deviceInfos'

//infos which are displayed to user in sketch 
export const getDisplayInfos = async() => {
	let infos = {
		connectionType: getConnectionType(),
		vendor: NAV_INFOS.getVendor(),
		language: getLanguage(),
		paltform: await getPlatform(),
		deviceMemory: getDeviceMemeory(),
		cpu : getCPU(),
		fonts : getFonts().length,
		plugins: NAV_INFOS.getPlugins(),
		keyLayout: await getKeyboardLayout(),
		browser: getBrowser(),
		browserVersion: await getBrowserVersion(),
		timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
		screenResolution: getScreenResolution(true),
		zoomLevel: NAV_INFOS.getZoomLevel(),
		deviceOrientation: isLandscape() ? 'Device is in Landscape orientation' : 'Device is in Portrait orientation',
		isTouchscreen: isTouchScreen() ? 'Device is a touch device' : 'Device is not a touch device',
		bluetoothEnbaled : await getBluetoothEnabled() ? 'Bluetooth accessable' : 'Bluetooth not accessable',
	}

	return filterData(infos)
}

//infos which are used for drawing settings
export const getDrawVariables = async() => {
	let infos = {
		deviceMemory: getDeviceMemeory(),
		cpu: getCPU(),
		fonts : getFonts().length,
		plugins: NAV_INFOS.getPlugins()?.length,
		browserVersion: Number((await getBrowserVersion()).split('.')[0]),
		screenResolution: getScreenResolution(),
		zoomLevel: NAV_INFOS.getZoomLevel()
	}
	return filterData(infos)
}


export const getSystemInfos = async() => {
	return  {
		connectionType: getConnectionType(),
		downlinkMax: getDownlinkSpeed(),
		vendor: NAV_INFOS.getVendor(),
		language: getLanguage(),
		languages: getLanguages(),
		platform: await getPlatform(),
		deviceMemory: getDeviceMemeory(),
		cpu : getCPU(),
		fonts : getFonts().length,
		installedFonts: getFonts(),
		plugins: NAV_INFOS.getPlugins(),
		keyboardLayout: await getKeyboardLayout(),
		browser: getBrowser(),
		browserVersion: await getBrowserVersion(),
		timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
		zoomLevel: NAV_INFOS.getZoomLevel(),
		deviceOrientation: isLandscape() ? 'Your device is in Landscape orientation' : 'Your device is in Portrait orientation'  ,
		touchscreen: isTouchScreen() ? 'Your device is a touch device' : 'Your device is not a touch device' , 
		bluetooth: await getBluetoothEnabled() ? 'Your Bluetooth is available' : 'Your Bluetooth is not available',
		PDFViewerEnabled: NAV_INFOS.getPdfViewerEnabled(),
		cookiesEnabled: NAV_INFOS.getCookisEnabled(),
		screenResolution: getScreenResolution(),
		browserPermissions: await getPermissions(),
	}
}




export const getSystemInfoStrings = (obj) => {
	let infos = {
		connectionType: `You use a ${obj.connectionType} internet connection with a download speed of approx. ${obj.downlinkMax} megabits per second`,
		vendor:`Your use ${obj.browser} version ${obj.browserVersion} from ${obj.vendor.split(' ')[0]} as Browser`,
		language: obj.languages === undefined || obj.languages == obj.language ? `You prefer to browse the web in ${obj.language}`:`You prefer to browse the web in ${obj.language} and you also uses ${obj.languages} sometimes` ,
		platform: obj.platform.version ? `Your device runs on a ${obj.platform.platform} Operating System with version ${obj.platform.version}` :`Your device runs on a ${obj.platform} Operating System` ,
		keyboardLayout: `You use the ${obj.keyboardLayout} Keyboardlayout for typing`,
		timezone:`You are based in the ${obj.timezone} Timezone`,
		country: `You are based in ${obj.country} in the region of ${obj.regionName}`,
		city: `More precisely you are based in the city of ${obj.city} within the Zipcode area ${obj.zip}`,
		longitude: `At a latitude of ${obj.lat} and a longitude of ${obj.lon}`,
		as: `You get your Internet from ${obj.as}`,
		deviceMemory: `Your device has a memory of at least ${obj.deviceMemory} GB of RAM and you have ${obj.cpu} cores available at your CPU`,
		zoomLevel: `You use your browser at a ${obj.zoomLevel} % Zoomlevel`,
		batteryLevel: obj.batteryCharging ? `Your device has a Batterylevel of ${obj.batteryLevel} and is currently chargin with a remaining chargin time of ${obj.batteryChargingTime} minutes`:`Your device has a Batterylevel of ${obj.batteryLevel} and is currently not chargin with a remaining dischargin time of ${obj.batteryDischargingTimes} minutes` ,	
		deviceOrientation: obj.deviceOrientation,
		touchscreen: obj.touchscreen,
		bluetooth: obj.bluetooth,
		screenResolution: `Your screen has a resolution of ${obj.screenResolution.width} px widht, ${obj.screenResolution.height} px height and a depth of ${obj.screenResolution.depth} px`,
		fonts : obj.fonts > 3 ? `You have ${obj.fonts} fonts installed. For example ${obj.installedFonts[[Math.floor(Math.random()*obj.fonts)]]}, ${obj.installedFonts[Math.floor(Math.random()*obj.fonts)]}, ${obj.installedFonts[Math.floor(Math.random()*obj.fonts)]}, ${obj.installedFonts[[Math.floor(Math.random()*obj.fonts)]]}`: `You have ${obj.fonts} fonts installed, for example ${obj.installedFonts}`,
		pointer:`You used a ${obj.pointer} to click on the Button at the Homepage`,
		PDFViewerEnabled: obj.PDFViewerEnabled ? "PDF viewer is enabled in your browser" :  "PDF viewer is not enabled in your browser",
		browserPermissions: `Your Browser granted permission to the follwing features: ${obj.browserPermissions}`,
		cookiesEnabled: obj.cookiesEnabled ? "Cookies are enabled in your browser" :  "Cookies are not enabled in your browser",
		plugins: `The Plugins installed in your Browser are ${obj.plugins}`,
	}
	return filterStrings(infos)
}




export const getFingerprintSystemInfos = async() => {
	let infos = {
		connectionType: getConnectionType(),
		vendor: NAV_INFOS.getVendor(),
		language: getLanguage(),
		languages: getLanguages(),
		platform: await getPlatform(),
		deviceMemory: getDeviceMemeory(),
		cpu : getCPU(),
		installedFonts : getFonts(),
		plugins: NAV_INFOS.getPlugins(),
		keyboardLayout: await getKeyboardLayout(),
		browser: getBrowser(),
		browserVersion: await getBrowserVersion(),
		timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
		touchscreen: isTouchScreen() ,
		bluetooth : await getBluetoothEnabled() ,
		PDFViewerEnabled: NAV_INFOS.getPdfViewerEnabled() ,
		cookiesEnabled: NAV_INFOS.getCookisEnabled() ,
		screenResolution: getScreenResolution(),	
	}

	return filterData(infos)
}
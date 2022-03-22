import { isFirefox } from '../infoSources/browserInfos'

const osOptions = [
	{key:'iOS', value:/(iPhone|iPad|iPod)/i},
	{key:'Mac OS', value:/(Mac OS|Mac OS X|MacPPC|MacIntel|Mac_PowerPC|Macintosh)/i},
	{key:'Windows 95', value:/(Windows 95|Win95|Windows_95)/i},
	{key:'Windows 98', value:/(Windows 98|Win98)/i},
	{key:'Windows 2000', value:/(Windows NT 5.0|Windows 2000)/i},
	{key:'Windows 7', value:/(Windows 7|Windows NT 6.1)/i},
	{key:'Windows 8', value:/(Windows 8|Windows NT 6.2|Windows 8.1|Windows NT 6.3)/i},
	{key:'Windows Vista', value:/Windows NT 6.0/i},
	{key:'Windows 10', value:/(Windows 10.0|Windows NT 10.0)/i},
	{key:'Windows XP', value:/(Windows NT 5.1|Windows XP)/i},
	{key:'Windows ME', value:/Win 9x 4.90|Windows ME/i},
	{key:'Windows NT4.0', value:/(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/i},
	{key:'Windows CE', value:/Windows CE/i},
	{key:'Windows 3.11', value:/Win16/i},
	{key:'Chrome OS', value:/CrOS/i},
	{key:'Android', value:/Android/i},
	{key:'Linux', value:/(Linux|X11(?!.*CrOS|.*Unix))/i},
	{key:'Unix', value:/(X11|Unix(?!.*Linux))/i},
];


export const getOSandVersion = () => {
	let ua = navigator.userAgent 
	let os
	let version 

	for(let index in osOptions){
		if(osOptions[index].value.test(ua)){
			os = osOptions[index].key
			break
		}
	}

	if(isFirefox()){
		version = ua.split(';')[1].split(' ').pop()
		return {platform: os, version: version}
	}
	
	if(/Windows/.test(os)){
		let o = os.split([' '])[0]
		let v  = os.split(' ')[1]
		return {platform: o, version: v}
	}

	if(/[^Linux|Unix]/i.test(os)){
		version = ua.split(')')[0]?.split(' ').pop()
		return {platform: os, version: version}
	}
	return {platform: os, version: ''}
}

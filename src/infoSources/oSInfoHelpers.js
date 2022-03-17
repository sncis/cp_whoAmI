import { isFirefox } from './browserInfos'

export const getOS = () => {
	let ua = navigator.userAgent
	let os = undefined

	if(ua.indexOf("Win") !== -1) os = "Windows";
	else if (ua.indexOf("Mac") !== -1) os = "MacOS";
	else if (ua.indexOf("X11") !== -1 && ua.indexOf("Linux") === -1) os = "Unix";
	else if (ua.indexOf("Linux") !== -1) os = "Linux";
	return os
}

export const getOSVersion = () => {
	if(navigator.appVersion){
		return navigator.appVersion.split(')')[0]?.split([' '])[0]
	}
	if(isFirefox()){
		return navigator.userAgent.split(';')[1]?.split(" ").slice(-1)[0] || 0
	}

	if(getOS() === 'Linux'){
		return navigator.userAgent.split('Linux')[1]?.split(";")[0].trim()
	}
	return navigator.userAgent.split(')')[0]?.split(" ").slice(-1)[0] || 0
}

var osOptions = [
	{key:'Windows 10', value:/(Windows 10.0|Windows NT 10.0)/},
	{key:'Windows 8.1', value:/(Windows 8.1|Windows NT 6.3)/},
	{key:'Windows 8', value:/(Windows 8|Windows NT 6.2)/},
	{key:'Windows 7', value:/(Windows 7|Windows NT 6.1)/},
	{key:'Windows Vista', value:/Windows NT 6.0/},
	{key:'Windows Server 2003', value:/Windows NT 5.2/},
	{key:'Windows XP', value:/(Windows NT 5.1|Windows XP)/},
	{key:'Windows 2000', value:/(Windows NT 5.0|Windows 2000)/},
	{key:'Windows ME', value:/(Win 9x 4.90|Windows ME)/},
	{key:'Windows 98', value:/(Windows 98|Win98)/},
	{key:'Windows 95', value:/(Windows 95|Win95|Windows_95)/},
	{key:'Windows NT 4.0', value:/(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
	{key:'Windows CE', value:/Windows CE/},
	{key:'Windows 3.11', value:/Win16/},
	{key:'Android', value:/Android/},
	{key:'Chrome OS', value:/CrOS/},
	{key:'Linux', value:/(Linux|X11(?!.*CrOS|.*Unix))/},
	{key:'iOS', value:/(iPhone|iPad|iPod)/},
	{key:'Mac OS X', value:/Mac OS X/},
	{key:'Mac OS', value:/(Mac OS|MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
	{key:'Unix', value:/(X11|Unix(?!.*Linux))/},
];


export const getOSandVersion = () => {
	let ua = navigator.userAgent
	// let ua= "Mozilla/5.0 (Windows NT 5.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.121 Safari/537.36"
	// let ua ="Mozilla/5.0 (X11; U; Unix; en-US) AppleWebKit/537.15 (KHTML, like Gecko) Chrome/24.0.1295.0 Safari/537.15 Surf/0.6"
	// let ua = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36'
	let os
	for(let index in osOptions){
		// console.log(index)
		// console.log(osOptions[index].r.test(ua))

		if(osOptions[index].value.test(ua)){
			os = osOptions[index].key
			// console.log("os")
			// console.log(os)
			break
		}
	}
	// return os
	if(/Windows/.test(os)){
		return os 
	}
	if(ua.match(new RegExp(/Android|Mac OS|Mac OS X|MacPPC|MacIntel|Mac_PowerPC|Macintosh/))){
		let v = /(?:Android|Mac OS|Mac OS X|MacPPC|MacIntel|Mac_PowerPC|Macintosh) ([\.\_\d]+)/.exec(ua)[1]
		console.log(`${os} ${v}`)
		return `${os} ${v}`
	}
	return os	
}

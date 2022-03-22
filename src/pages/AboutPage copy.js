import '../style.css'
import { v4 as uuidv4 } from 'uuid';

import React , { useEffect, useState}from 'react'
import hi from '../img/hi.png'
import { deletData, getAllFingerPrints } from '../utils/fingerPrintActions'
import { useDataStateCtx, useDataDispatchCtx } from '../store/dataContext'
import { useNavigate } from 'react-router-dom'
import NavigationComp from '../components/NavigationComp'
import { RESET_STORE } from '../store/constants'

import { getSysInfosInfos, getSysInfoStringsInfos } from '../infoSources/systemInfos'
import { useBatteryStatusEffect } from '../effects/batteryEffect'
import { isChrome, isSafariDesktop, isFirefox , isSafariMobile} from '../infoSources/browserInfos'

const AboutPage = () => {
	const {fingerprint, pointer,timeToClickButton, ipInfos } = useDataStateCtx()
	const dispatch = useDataDispatchCtx()
	const [deleteInfos, setDeleteInfo] = useState(false)
	const [firstEntries, setFirstEntries]=useState([])
	const [secondEntries, setSecondEntries]=useState([])
	const navigate = useNavigate()
	const { batteryLevel,charging,chargingTime,dischargingTime} = useBatteryStatusEffect()
	const [others, setOthers] = useState(null)

	const[browsers, setBrowser] = useState([])

	useEffect(() => {
		const makeDelete = async() => {
			if(deleteInfos){
				const deletionCount = await deletData(fingerprint)
				console.log(`${deletionCount} entries has been deleted`)
				dispatch({
					type: RESET_STORE
				})
				navigate('/')
			}
		}
		makeDelete()
	
	},[deleteInfos, fingerprint, navigate, dispatch])

	useEffect(() => {
		const getAll = async() => {
			const all = await getAllFingerPrints()
			const others = all ? all.filter((f) => f !== fingerprint) : 'all'
			setOthers(others)
		}
		getAll()
		
	},[fingerprint])

	useEffect(() => {
		let isMounted = true;  

		const getSysInfos = async() => {
			// let sysInfos = await getSystemInfos()		
			// let inf = { ...sysInfos,...ipInfos, 'Pointer': pointer, 'Battery Level': batteryLevel, 'Battery is charging': charging?.toString(), 'Battery charging time': chargingTime, 'Battery discharging time': dischargingTime }
			let sysInfos = await getSysInfosInfos()
			let inf = { ...sysInfos,...ipInfos, pointer: pointer, batteryLevel: batteryLevel, batteryCharging: charging, batteryChargingTime: chargingTime, batteryDischargingTime: dischargingTime }

			let infosIn = getSysInfoStringsInfos(inf)
			// console.log("infosIn**************!!!!!!!!")
			// console.log(infosIn)

			// const fiteredInfos = filterData(inf)
			// let entries = batteryLevel !== undefined ? Object.entries(inf) : Object.entries(sysInfos)
			const entries = Object.entries(infosIn)
			let middle = entries.length / 2
			let length = entries.length

			if(isMounted){
				setFirstEntries(Object.entries(infosIn).slice(0,middle))
				setSecondEntries(Object.entries(infosIn).slice(middle, length - 1))
			}
		}
		getSysInfos()	
		return () => { isMounted = false }
	},[batteryLevel,charging,chargingTime,dischargingTime, pointer,ipInfos])

	useEffect(() => {
		if(isChrome()) {
			setBrowser(['Safari', 'Firefox'])
		}
		else if(isSafariDesktop() || isSafariMobile()) {
			setBrowser(['Chrome', 'Firefox'])
		}

		else if(isFirefox()) {
			setBrowser(['Chrome', 'Firefox'])
		}
		else{
			setBrowser(['Chrome', 'Firefox'])
		}

	},[])


	return(
		<div>
			<NavigationComp />
			<h2 data-testid='aboutWrapper'>Hi there! <img src={hi} alt="hi there" id='hiIcon'></img></h2>
			<section>
				<h4> Your Fingerprint ID is: {fingerprint}</h4>
				{others && <p>and you are unique among <span style={{fontWeight: 700}}>{others.length}</span> visitors</p>}			
				{ pointer && <p> It took you <span style={{fontWeight: 700}}>{timeToClickButton}</span> seconds to click on the button at the Homepage with your <span style={{fontWeight: 700}}>{pointer}</span></p>}
				<p id="infoText">Are you wondering what that data was that just popped up? The data you saw on the previous page is information that any website can collect about you. No cookies, 
				trackers or other hidden technology, are used to retrieve this information. Depending on the browser, more or less information may be collected and used to identify and profile you. 
				You can check this out by opening this website in another browser like {browsers[0]} or {browsers[1]}, where you will see a slightly different image representing you. Depending on the browser, 
				the color scheme and information you see will be different and you will have a unique fingerprint.
				<br></br>
				Browser fingerprinting is a technique that collects information from your browser and your device and stitched together, they form a unique combination called a "fingerprint". 
				This fingerprint can be tracked across multiple browser sessions, and websites don't need cookies or other techniques to identify you and link the session and what you do on their website to you. 
				While some privacy-conscious users disable cookies, anonymize their IP address, use VPNs or browser plugins to prevent tracking, browser fingerprinting is more difficult to circumvent and mostly invisible to the user.
				<br></br>
				Even though the information may seem trivial to you, in combination with other information you have disclosed on the Internet, it can tell a lot about you and make it pretty useful for business. 
				The purpose of this website is to show users what information can be collected and to create awareness about this topic. Based on the information collected, an abstract "portrait" is drawn to illustrate 
				that your device/browser can be seen as a mirror of yourself. Even if the website doesn't know your name and address, by collecting your browser and device settings and preferences 
				it can find out a lot about you and your personality. 
			</p>
			</section>
			<section id='infoSection'>
				<p>the information we collected from you are:</p>
	
				<div className="row">
					<div className='column'>
						<table>
							<thead>
							<tr key={uuidv4()}>
								{/* <th>Info</th> */}
								<th>Value</th>
							</tr>

							</thead>
							<tbody>
							{firstEntries && firstEntries.map((info) => 
							<tr key={uuidv4()}>
								{/* <td>{info[0]}</td> */}
								<td>{info[1]}</td>
							</tr>
							)}
							</tbody>
						</table>
					</div>

					<div className='column'>
						<table>
							<thead>
							<tr key={uuidv4()}>
								{/* <th>Info</th> */}
								<th>Value</th>
							</tr>
							</thead>
							<tbody>
							{secondEntries && secondEntries.map((info) => 
							<tr key={uuidv4()}>
								{/* <td>{info[0]}</td> */}
								<td>{info[1]}</td>
							</tr>
							)}
							</tbody>
						</table>
					</div>

				</div>
			</section>

			<button id="deleteBtn" onClick={() => setDeleteInfo(true)}>delete my Data</button>  
		</div>
	)
}

export default AboutPage
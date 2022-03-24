import '../style.css'
import '../About.css'

import { v4 as uuidv4 } from 'uuid';

import React , { useEffect, useState}from 'react'
import hi from '../img/hi.png'
import { deletData, getAllFingerPrints } from '../utils/fingerPrintActions'
import { useDataStateCtx, useDataDispatchCtx } from '../store/dataContext'
import { useNavigate } from 'react-router-dom'
import NavigationComp from '../components/NavigationComp'
import { RESET_STORE } from '../store/constants'

import { getSystemInfos, getSystemInfoStrings } from '../infoSources/systemInfos'
import { useBatteryStatusEffect } from '../effects/batteryEffect'
import { isChrome, isSafariDesktop, isFirefox , isSafariMobile} from '../infoSources/browserInfos'
import { getBrowser } from '../infoSources/browserInfos'

const AboutPage = () => {
	const {fingerprint, pointer,timeToClickButton, ipInfos } = useDataStateCtx()
	const dispatch = useDataDispatchCtx()
	const [deleteInfos, setDeleteInfo] = useState(false)
	
	const [entries, setEntries]=useState([])

	const navigate = useNavigate()
	const {batteryLevel,charging,chargingTime,dischargingTime} = useBatteryStatusEffect()
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
			let sysInfos = await getSystemInfos()
			let inf = { ...sysInfos,...ipInfos, pointer: pointer, batteryLevel: batteryLevel, batteryCharging: charging, batteryChargingTime: chargingTime, batteryDischargingTime: dischargingTime }
		
			let infosIn = getSystemInfoStrings(inf)
			const entries = Object.entries(infosIn)
		
			if(isMounted){
				setEntries(Object.entries(infosIn))
			}
		}
		getSysInfos()	
		return () => { isMounted = false }
	},[batteryLevel,charging,chargingTime,dischargingTime, pointer,ipInfos])

	// useEffect(() => {
	// 	if(isChrome()) {
	// 		setBrowser(['Safari', 'Firefox', 'Chrome'])
	// 	}
	// 	if(isSafariDesktop() || isSafariMobile()) {
	// 		setBrowser(['Chrome', 'Firefox', 'Safari'])
	// 	}

	// 	if(isFirefox()) {
	// 		setBrowser(['Chrome', 'Safari', 'Firefox'])
	// 	}
	// 	else{
	// 		setBrowser(['Safari', 'Firefox', 'Chrome'])
	// 	}
	// },[])

	useEffect(() => {
		let b = getBrowser()
		switch(b){
			case 'Chrome':
				setBrowser(['Safari', 'Firefox', 'Chrome'])
				break;
			case 'Safari':
			case "Safari Mobile":
				setBrowser(['Chrome', 'Firefox', 'Safari'])
				break;
			case 'Firefox':
				setBrowser(['Chrome', 'Safari', 'Firefox'])
				break;
			default:
				setBrowser(['Safari', 'Firefox', 'Chrome'])
				break;
		}	
	},[])


	return(
		<div>
			<NavigationComp />
			<div id='header-section'>
			<h2 data-testid='aboutWrapper'>Hi there! <img src={hi} alt="hi there" id='hiIcon'></img></h2>
				<h4> Your Fingerprint ID is: {fingerprint}</h4>
				{others && <p>You are unique among <span className='info-span'>{others.length}</span> visitors,</p>}			
				{ pointer && <p> and it took you <span className='info-span'>{timeToClickButton}</span> seconds to click on the button at the Homepage with your <span style={{fontWeight: 700}}>{pointer}</span></p>}
				
			</div>
		
				
				<section id='text-container'>
				 <p className='info-header'>Are you wondering what that data was that just popped up?</p> 
				
				 <p id="info-text">
					 The data you saw on the previous page is information that any website can collect about you. No cookies, 
				trackers or other hidden technology, are used 
				to retrieve this information. Depending on the browser, more or less information may be collected and used to identify and profile you. 
				You can check this out by opening this website in another browser like {browsers[0]} or {browsers[1]}, where you will see a slightly different image representing you. 
				Depending on the browser, the color scheme and information you see will be different and you will have a unique fingerprint.
				<br></br>
				<br></br>

				Browser fingerprinting is a technique that collects information from your browser and your device and stitched together, they form a unique combination called a "fingerprint". 
				This fingerprint can be tracked across multiple browser sessions, and websites don't need cookies or other techniques to identify you and link the session and what you do on their website to you. 
				While some privacy-conscious users disable cookies, anonymize their IP address, use VPNs or browser plugins to prevent tracking, browser fingerprinting is more difficult to circumvent and mostly invisible to the user.
				<br></br>
				<br></br>

				Even though the information may seem trivial to you, in combination with other information you have disclosed on the Internet, it can tell a lot about you and make it pretty useful for business. 
				The purpose of this website is to show users what information can be collected and to create awareness about this topic. Based on the information collected, an abstract "portrait" is drawn to illustrate 
				that your device/browser can be seen as a mirror of yourself. Even if the website doesn't know your name and address, by collecting your browser and device settings and preferences 
				it can find out a lot about you and your personality. 
			</p>

			</section>
			<section id='info-section'>
				<p>Let's see what we know about you</p>
	
				<div className="info-container">
					<div className='column'>
						<table>
							<tbody>
							{entries && entries.map((info) => 
							<tr key={uuidv4()}>
								<td>{info[1]}</td>
							</tr>
							)}
							</tbody>
						</table>
					</div>
				</div>
			</section>
			<p id='delete-info'>If you wish, you can of course delete your data. But it would be very nice if you would leave it to us for research purposes. 
				Don't worry, the data is completely anonymous and cannot identify you. We store them only in raw format like: 'Browser': '{browsers[2]}'.</p>
			<button id="deleteBtn" onClick={() => setDeleteInfo(true)}>delete my Data</button>  
		</div>
	)
}

export default AboutPage
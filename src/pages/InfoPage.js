import '../style.css'
import React , { useEffect, useState}from 'react'
import hi from '../img/hi.png'
import { deletData } from '../store/actions/fingerPrintActions'
import { useDataStateCtx } from '../store/dataContext'
import { useNavigate } from 'react-router-dom'
import NavigationComp from '../components/NavigationComp'


const InfoPage = () => {

	const [deleteInfos, setDeleteInfo] = useState(false)
	const {fingerprint, displayInfos} = useDataStateCtx()
	const state = useDataStateCtx()

	const [firstEntries, setFirstEntries]=useState([])
	const [secondEntries, setSecondEntries]=useState([])

	const navigate = useNavigate()


	useEffect(() => {
		if(deleteInfos){
			const deletionCount = deletData(fingerprint)
			console.log(`${deletionCount} entries has been deleted`)
			navigate('/')
		}
	},[deleteInfos, fingerprint, navigate])

	useEffect(()=> {
		console.log("state in info page")
		console.log(fingerprint, displayInfos)
		if(displayInfos){
			let entries = Object.entries(displayInfos)
			let middle = entries.length / 2
			let length = entries.length


			setFirstEntries(Object.entries(displayInfos).slice(0,middle))
			setSecondEntries(Object.entries(displayInfos).slice(middle, length - 1))
		}
		
	},[fingerprint, displayInfos])


	return(
		<div>
			<NavigationComp />
			<h2>Hi there! <img src={hi} alt="hi there" id='hiIcon'></img></h2>
			<section>
				<h4> Your unique ID is: {fingerprint}</h4>
				<p> and it took you <span style={{fontWeight: 700}}>{state.timeToClickButton}</span> seconds to click on the button at the Homepage</p>
				<p id="infoText">the whole project is about islustrationg waht information commpanies and website providers 
						can collect about you only by the fact that you visit their website. The information shown here are readably by everyone on the web 
						and can be used to identifiy and track you all woer the web without using cookies or other form forom analytics.<br></br>
						The information alone maybe doesn't seam to cause some privacy invasion, but combined with other data nad also already alown companies can derive 
	 					usefull information. <br></br>
						The puropose of this website is to illustrate and educate people about privacy isues on the web.<br></br>
						Of course, we are aware that it is hard to protect one self against such unvisible and hidden techniques, but at least you cna be aware of:) 
				</p>
			</section>
			<section id='infoSection'>
				<p>the information we collected from you are:</p>
	
				<div className="row">
					<div className='column'>
						<table>
							<thead>
							<tr key={new Date().getTime() + Math.round(Math.random() * 100)}>
								<th>Info</th>
								<th>Value</th>
							</tr>

							</thead>
							<tbody>
							{firstEntries && firstEntries.map((info, index) => 
							<tr key={index + Math.random() * 100 + new Date().getTime() } className={index + Math.round(Math.random() * 100)}>
								<td>{info[0]}</td>
								<td>{info[1]}</td>
							</tr>
							)}
							</tbody>
						</table>
					</div>

					<div className='column'>
						<table>
							<thead>
							<tr key={Math.random() * 100}>
								<th>Info</th>
								<th>Value</th>
							</tr>
							</thead>
							<tbody>
							{secondEntries && secondEntries.map((info,index) => 
							<tr className={index + Math.random() * 100}>
								<td>{info[0]}</td>
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

export default InfoPage
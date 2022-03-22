const languages = [
	{key:'English', value:/en-US|en-gb|en/},
	{key:'German', value:/de|/},
	{key:'French', value:/fr/},
	{key:'Spanish', value:/es/},
	{key:'Turkish', value:/tr/},
	{key:'Swedish', value:/sv/},
	{key:'Russian', value:/ru/},
	{key:'Portuguese', value:/pt/},
	{key:'Norwegian', value:/no|nb|nn/},
	{key:'Japanese', value:/ja/},
	{key:'Italian', value:/it/},
	{key:'Hungarian', value:/hu/},
	{key:'Greek', value:/el/},
	{key:'Dutch', value:/nl/},
	{key:'Chinese', value:/zh|zh-Hans|zh-Hant/},
	{key:'Arabic', value:/ar/},
	{key:'Czech', value:/cs/},
	{key:'Finnish', value:/fi/},
	{key:'Kannada', value:/kn/},
];


export const getLanguage = () => {
	const lang = navigator.language
	let language
	for(let index in languages){
		if(languages[index].value.test(lang)){
			language = languages[index].key
			break
		}
	}
	return language
}

export const getLanguages = () => {
	const lang = navigator.languages
	let language = []
	lang.forEach( l => {
		for(let index in languages){
			if(languages[index].value.test(l)){
				language.push(languages[index].key)
				break
			}
		}
	})
	let langs = new Set(language)
	return langs.size >=1 ? Array.from(langs) : undefined
	
	// return language.length >=1 ? new Set(language) : undefined
}




export const filterFonts = (fonts) => {
	return fonts.reduce((result, element, index) => {
		if(document.fonts.check(`12px ${element}`)){
			result.push(element)
		}
		return result
	},[])
}

export const getFonts = () => {
	let fonts = ['ARNO PRO','Agency FB','Arabic Typesetting','Arial Unicode MS',"Arial", "Arial Black", "Arial Narrow", "Arial Rounded MT Bold",'AvantGarde Bk BT',
	'BankGothic Md BT','Batang','Bitstream Vera Sans Mono',"Bookman Old Style", "Bradley Hand ITC", "Bodoni MT",
	'Calibri','Century','Century Gothic','Clarendon', "Casual", "Comic Sans MS", "Consolas", "Copperplate Gothic Bold", "Courier", "Courier New",
	'EUROSTILE',"English Text MT", 
	"Felix Titling", "Futura",'Franklin Gothic','Futura Bk BT','Futura Md BT',
  'GOTHAM',"Garamond", "Geneva", "Georgia", "Gentium", 'Gill Sans',
  'HELV','Haettenschweiler', "Helvetica", 'Helvetica Neue','Humanst521 BT',
  "Impact", "Jokerman", "King", "Kootenay",
	"Latha", "Liberation Serif",'Leelawadee','Letter Gothic','Levenim MT','Lucida Bright','Lucida Sans',"Lucida Console","Lucida Grande",
  'Menlo',"Magneto", "Mistral", "Modena", "MV Boli",'MS Mincho','MS Outlook','MS Reference Specialty','MS UI Gothic','MT Extra','MYRIAD PRO','Marlett','Meiryo UI','Microsoft Uighur','Minion Pro','Monotype Corsiva',
  "OCR A Extended", "Onyx", 
	"Palatino Linotype", "Papyrus","Parchment", "Pericles", "Playbill",'PMingLiU','Pristina',
  'SCRIPTINA',
  'Segoe UI Light',"Segoe Print", "Shruti",'Serifa','SimHei','Small Fonts','Staccato222 BT',
  'TRAJAN PRO',"Tahoma", "TeX", "Times", "Times New Roman", "Trebuchet MS",
  'Univers CE',
  "Verdana", "Verona",'Vrinda',
  'ZWAdobeF'];

	// let fonts = ["Arial", "Arial Black", "Arial Narrow", 
	// "Arial Rounded MT Bold", "Book Antiqua", "Bookman Old Style", 
	// "Bradley Hand ITC", "Bodoni MT", "Calibri", "Century", "Century Gothic", 
	// "Casual", "Comic Sans MS", "Consolas", "Copperplate Gothic Bold", 
	// "Courier", "Courier New", "English Text MT", "Felix Titling", 
	// "Futura", "Garamond", "Geneva", "Georgia", "Gentium", 
	// "Haettenschweiler", "Helvetica", 
	// "Impact", "Jokerman", "King", "Kootenay", "Latha", 
	// "Liberation Serif", "Lucida Console", "Lalit", "Lucida Grande", 
	// "Magneto", "Mistral", "Modena", "Monotype Corsiva", "MV Boli", 
	// "OCR A Extended", "Onyx", "Palatino Linotype", "Papyrus", 
	// "Parchment", "Pericles", "Playbill", "Segoe Print", "Shruti", 
	// "Tahoma", "TeX", "Times", "Times New Roman", "Trebuchet MS", 
	// "Verdana", "Verona"]
	return filterFonts(fonts)
}

	


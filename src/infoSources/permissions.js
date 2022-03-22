
const checkPermission = async(permission) => {
	return navigator.permissions.query({name:permission}).then((result) => {
			if(result.state === 'granted'){
				return true
			}
		}).catch(error => {
			return false
		})

}

export const getPermissions = async() => {
	const permissionsArray = []
	
	const permissions = [
		'geolocation', 'notifications','accelerometer','accessibility-events','ambient-light-sensor', 'background-sync',
		'camera','clipboard-read','clipboard-write','gyroscope', 'magnetometer','microphone','midi','payment-handler','persistent-storage']
	
		if(navigator.permissions && navigator.permissions.query){
			for(let p of permissions){
				let checked = await checkPermission(p)
				if(checked){
					permissionsArray.push(p)
				}
			}	
	
		}

		return permissionsArray.length >=1 ? permissionsArray : undefined
}
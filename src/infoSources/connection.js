export const getConnectionType = ()=> {
	return navigator.connection?.effectiveType
}

export const getDownlinkSpeed = () => {
	return navigator.connection?.downlink
}

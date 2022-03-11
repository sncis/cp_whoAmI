export const getBluetoothEnabled = () => {
	return  navigator.bluetooth?.getAvailability().then(available => {
    if (available) return true
    return false
  });
}
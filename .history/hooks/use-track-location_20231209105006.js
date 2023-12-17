import { useState } from "react"

const useTrackLocation =() => {
    const [locationErrorMsg, setLocationErrorMsg] = useState('');
    const [latLong, setLatLong] = useState('');
    const [isFindingLocaton, setIsFindingLocation] = useState(false);
    const success = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setLatLong(`${latitude},${longitude}`);
        setLocationErrorMsg('');
    };

    const error = () => {
        setLocationErrorMsg("Unable to retrieve your location");

    }

    const handleTrackLocation = () => {
        setIsFindingLocation(true);

        if (!navigator.geolocation) {
            setLocationErrorMsg ;
            setIsFindingLocation
          } else {
            // status.textContent = "Locating…";
            navigator.geolocation.getCurrentPosition(success, error);
          }
    }
    return {
        latLong,
        locationErrorMsg,
        handleTrackLocation

    }
}

export default useTrackLocation;
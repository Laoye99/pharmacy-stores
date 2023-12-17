import { useState } from "react"

const useTrackLocation =() => {
    const [locationErrorMsg, setLocationErrorMsg] = useState('');
    // const [latLong, setLatLong] = useState('');
    const [isFindingLocation, setIsFindingLocation] = useState(false);
    const success = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // setLatLong(`${latitude},${longitude}`);
        dispatch({
            type: ACTIONSET_LAT_LONG
        })
        setLocationErrorMsg('');
        setIsFindingLocation(false);
    };

    const error = () => {
        setIsFindingLocation(false);
        setLocationErrorMsg("Unable to retrieve your location");

    }

    const handleTrackLocation = () => {
        setIsFindingLocation(true);

        if (!navigator.geolocation) {
            setLocationErrorMsg ;
            setIsFindingLocation(false);
          } else {
            // status.textContent = "Locating…";
            navigator.geolocation.getCurrentPosition(success, error);
          }
    }
    return {
        // latLong,
        locationErrorMsg,
        handleTrackLocation,
        isFindingLocation

    }
}

export default useTrackLocation;
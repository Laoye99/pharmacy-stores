import { useState } from "react";
import { ACTION_TYPES } from "@/pages/_app";

const useTrackLocation =() => {
    const [locationErrorMsg, setLocationErrorMsg] = useState('');
    // const [latLong, setLatLong] = useState('');
    const [isFindingLocation, setIsFindingLocation] = useState(false);
    const success = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // setLatLong(`${latitude},${longitude}`);
        dispatch({
            type: ACTION_TYPES.SET_LAT_LONG,
            payload: { latLong: `$`}
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
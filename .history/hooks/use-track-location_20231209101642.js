import { useState } from "react"

const useTrackLocation =() => {
    const [locationErrorMsg, setLocationErrorMsg] = useState('');

    const success = () => {


    }

    const error = () => {


    }

    const handleTrackLocation = () => {
        if (!navigator.geolocation) {
            setLocationErrorMsg = "Geolocation is not supported by your browser";
          } else {
            // status.textContent = "Locating…";
            navigator.geolocation.getCurrentPosition(success, error);
          }
    }
    return {


    }
}

export default useTrackLocation;
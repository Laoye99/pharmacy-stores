const getUrlForCoffeeStores = (latLong, query, limit) => {
   return  
}


export const fetchCoffeeStores = async () => {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: process.env.
          FOURSQUARE_API_KEY,
        },
      };
      
      const response = await fetch(
        , options);
        const data = await response.json();
        return data.results;
        // .catch(err => console.error(err));
}
const getUrlForCoffeeStores = (latLong, query, limit) => {
   return  'https://api.foursquare.com/v3/places/search?query=${query}&ll=&${query}limit=6'
};


export const fetchCoffeeStores = async () => {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: process.env.
          FOURSQUARE_API_KEY,
        },
      };
      
      const response = await fetch(getUrlForCoffeeStores( ${query},'coffee'),options);
        const data = await response.json();
        return data.results;
        // .catch(err => console.error(err));
}
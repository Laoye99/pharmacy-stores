const getUrlForCoffeeStores = (latLong, query, limit) => {
   return  'https://api.foursquare.com/v3/places/search?query=$&ll=6.549210428174546%2C3.3716615277994073&limit=6'
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
      
      const response = await fetch(getUrlForCoffeeStores(),options);
        const data = await response.json();
        return data.results;
        // .catch(err => console.error(err));
}
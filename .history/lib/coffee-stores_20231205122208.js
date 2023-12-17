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
        'https://api.foursquare.com/v3/places/search?query=coffee&ll=6.549210428174546%2C3.3716615277994073&limit=6', options);
        const data = await response.json();
        return
        // .catch(err => console.error(err));
}
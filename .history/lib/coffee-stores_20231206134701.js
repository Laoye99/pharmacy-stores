import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

const getUrlForCoffeeStores = (latLong, query, limit) => {
   return  `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&sort=POPULARITY&limit=${limit}`;
};
const getListOfCoffeeStorePhotos = async () => {
    const photos= await unsplash.search.getPhotos({
        query: 'coffee shop',
        page: 1,
        perPage: 1,
      });
      const unsplashResults = photos.response.results;

      return unsplashResults.map(
        (result) => result.urls['small']
      );
}


export const fetchCoffeeStores = async () => {
    const photos = await getListOfCoffeeStorePhotos();
         const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: process.env.
          FOURSQUARE_API_KEY,
        },
      };
      
      const response = await fetch(getUrlForCoffeeStores( '6.549210428174546%2C3.3716615277994073','coffee', 6),options);
        const data = await response.json();
        return data.results.map((result, idx) => {
            return {
               id: result.fsq_id,
               formatted_address: result.location.formatted_address,
               locality:result.location.locality.length > 0 ?
                imgUrl: photos[idx],
            };
        });
        // .catch(err => console.error(err));
};
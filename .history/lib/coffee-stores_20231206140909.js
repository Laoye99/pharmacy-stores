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
        page: 6,
        perPage: 6,
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
            const locality =  result.location.locality;
            return {
               id: result.fsq_id,
               formatted_address: result.location.formatted_address,
               name: result.name,
               locality,
                imgUrl: photos.length > 0 ? [idx],
            };
        });
        // .catch(err => console.error(err));
};
import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

const getUrlForPharmacyStores = (latLong, query, limit) => {
   return  `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&sort=POPULARITY&limit=${limit}`;
};
const getListOfPharmacyStorePhotos = async () => {
    const photos= await unsplash.search.getPhotos({
        query: 'pharmacy store',
        page: 6,
        perPage: 6,
      });
      const unsplashResults = photos.response.results;

      return unsplashResults.map(
        (result) => result.urls['small']
      );
}


export const fetchPharmacyStores = async (la) => {
    const photos = await getListOfPharmacyStorePhotos();
         const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: process.env.
          FOURSQUARE_API_KEY,
        },
      };
      
      const response = await fetch(getUrlForPharmacyStores( latLong,'pharmacy%20store', 6),options);
        const data = await response.json();
        return data.results.map((result, idx) => {
            const locality =  result.location.locality;
            return {
               id: result.fsq_id,
               formatted_address: result.location.formatted_address,
               name: result.name,
               locality,
                imgUrl: photos.length > 0 ? photos[idx] : null,
            };
        });
        // .catch(err => console.error(err));
};
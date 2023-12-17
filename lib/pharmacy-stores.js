import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

const getUrlForPharmacyStores = (latLong, query, limit) => {
   return  `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&sort=POPULARITY&limit=${limit}`;
};
const getListOfPharmacyStorePhotos = async () => {
    const photos= await unsplash.search.getPhotos({
        query: 'pharmacy store',
        perPage: 30,
      });
      const unsplashResults = photos.response.results;

      return unsplashResults.map(
        (result) => result.urls['small']
      );
}


export const fetchPharmacyStores = async (
  latLong = '6.549210428174546%2C3.3716615277994073',
  limit = 6
  ) => {
    const photos = await getListOfPharmacyStorePhotos();
         const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
        },
      };
      
      const response = await fetch(getUrlForPharmacyStores( latLong,'pharmacy', limit),options);
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
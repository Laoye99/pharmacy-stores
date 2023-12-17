const Airtable = require('airtable');
const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY})
.base(process.env.AIRTABLE_BASE_KEY);

const table = base('pharmacy-stores');

console.log({ table });

const createPharmacyStore = (req,res) => {

    const findPharmacyStoreRecords = await 
    res.json({ message: 'Hi there'});
};

export default createPharmacyStore;

const Airtable = require('airtable');
const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY})
.base(process.env.AIRTABLE_BASE_KEY);

const table = base('pharmacy-stores');

console.log({ table });

const createPharmacyStore = async (req,res) => {

    if

    const findPharmacyStoreRecords = await table.select({
        filterByFormula: `id="0"`
    }).firstPage();

    if(findPharmacyStoreRecords)

    res.json({ message: 'Hi there'});
};

export default createPharmacyStore;
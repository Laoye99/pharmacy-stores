const Airtable = require('airtable');
const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY})
.base(process.env.AIRTABLE_BASE_KEY);

const table = base('pharmacy-stores');

console.log({ table });

const createPharmacyStore = async (req,res) => {

    if(req.method === 'POST'){

    const findPharmacyStoreRecords = await table.select({
        filterByFormula: `id="0"`,
    }).firstPage();

    if(findPharmacyStoreRecords.length !== 0){
        res.json(findPharmacyStoreRecords);
    } else{
        res.json
    }
    }

    res.json({ message: 'create a record'});
};

export default createPharmacyStore;

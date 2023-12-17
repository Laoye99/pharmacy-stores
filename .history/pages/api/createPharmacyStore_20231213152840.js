const Airtable = require('airtable');
const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY})
.base(process.env.AIRTABLE_BASE_KEY);

const table = base('pharmacy-stores');

console.log({ table });

const createPharmacyStore = async (req,res) => {

    if(req.method === 'POST'){

    try{
    const findPharmacyStoreRecords = await table.select({
        filterByFormula: `id="0"`,
    }).firstPage();

    if(findPharmacyStoreRecords.length !== 0){
        const records = findPharmacyStoreRecords.map((record) =>{
            return{
                ...record.fields,
            };
        });
        res.json(records);
    } else{
        res.json({ message: "create a record"});
    }
    } catch(err) {
        console.error('Error finding store', err);
        res.json
    }
};
};

export default createPharmacyStore;

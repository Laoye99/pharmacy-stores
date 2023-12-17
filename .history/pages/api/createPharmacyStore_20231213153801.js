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
        table.create([
            {
                fields: {
                    id: "1",
                    name: "My fav pharmacy store",
                    formatted_address: 'my address',
                    locality: 'some area',
                    voting: 200,
                    imgUrl: 'http://myimage'

                }

        }])

        res.json({ message: "create a record"});
    }
    } catch(err) {
        console.error('Error finding store', err);
        res.status(500);
        res.json({message: 'Error finding store', err});
    }
};
};

export default createPharmacyStore;

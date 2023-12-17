const Airtable = require('airtable');
const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY})
.base(process.env.AIRTABLE_BASE_KEY);

const table = base('pharmacy-stores');

console.log({ table });

const createPharmacyStore = async (req,res) => {

    if(req.method === 'POST'){

        const {Id, name, formatted_address, locality, }

    try{
    const findPharmacyStoreRecords = await table.select({
        filterByFormula: `id="1"`,
    }).firstPage();

    if(findPharmacyStoreRecords.length !== 0){
        const records = findPharmacyStoreRecords.map((record) =>{
            return{
                ...record.fields,
            };
        });
        res.json(records);
    } else{
        const createRecords = await table.create([
            {
                fields: {
                    Id: "1",
                    name: "My fav pharmacy store",
                    formatted_address: 'my address',
                    locality: 'some area',
                    voting: 200,
                    imgUrl: 'http://myimage.com',

                },
        },
    ]);
    const records = createRecords.map((record) =>{
        return{
            ...record.fields,
        };
    });
        res.json({records});
    }
    } catch(err) {
        console.error('Error finding store', err);
        res.status(500);
        res.json({message: 'Error finding store', err});
    }
};
};

export default createPharmacyStore;

const Airtable = require('airtable');
const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY})
.base(process.env.AIRTABLE_BASE_KEY);

const table = base('pharmacy-stores');

console.log({ table });

const createPharmacyStore = async (req,res) => {

    if(req.method === 'POST'){

        const {Id, name, formatted_address, locality, voting, imgUrl } = req.body;


    try{
    const findPharmacyStoreRecords = await table.select({
        filterByFormula: `id=${id}`,
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
                    Id,
                    name,
                    formatted_addresss,
                    locality,
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

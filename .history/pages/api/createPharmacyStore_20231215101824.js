const Airtable = require('airtable');
const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY})
.base(process.env.AIRTABLE_BASE_KEY);

const table = base('pharmacy-stores');

console.log({ table });

const createPharmacyStore = async (req,res) => {

    if(req.method === 'POST'){

        const {Id, name, formatted_address, locality, voting, imgUrl } = req.body;


    try{
        if (id)
    const findPharmacyStoreRecords = await table.select({
        filterByFormula: `Id=${Id}`,
    }).firstPage();

    if(findPharmacyStoreRecords.length !== 0){
        const records = findPharmacyStoreRecords.map((record) =>{
            return{
                ...record.fields,
            };
        });
        res.json(records);
    } else{

        if (Id && name){
        const createRecords = await table.create([
            {
                fields: {
                    Id,
                    name,
                    formatted_address,
                    locality,
                    voting,
                    imgUrl,

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
    else{
        res.status(400);
        res.json({ message: "Id or name is missing" });
    }
}
    } catch(err) {
        console.error('Error finding store', err);
        res.status(500);
        res.json({message: 'Error finding store', err});
    }
};
};

export default createPharmacyStore;

const Airtable = require('airtable');
const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY})
.base(process.env.AIRTABLE_BASE_KEY);

const table = base('pharmacy-stores');

console.log({ table });

const createPharmacyStore = async (req,res) => {

    if(req.method === 'POST'){

        const {Id, name, formatted_address, locality, voting, imgUrl } = req.body;


    try{
        if (Id) {
            
        }
    
    } catch(err) {
        console.error('Error finding store', err);
        res.status(500);
        res.json({message: 'Error finding store', err});
    }
};


};

export default createPharmacyStore;

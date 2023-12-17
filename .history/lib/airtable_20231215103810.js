const Airtable = require('airtable');
const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY})
.base(process.env.AIRTABLE_BASE_KEY);

const table = base('pharmacy-stores');

const records = findPharmacyStoreRecords.map((record) =>{
    return{
        ...record.fields,
    };
});
const Airtable = require('airtable');
const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY})
.base(process.env.AIRTABLE_BASE_KEY);

const table = base('pharmacy-stores');

const getMinifiedRecord = (record) => {
    return{
        ...record.fields,
    };
}

const getMinifiedRecords = (records) => {
    return records.map((record) =>{
        return getMinifiedRecord(record);
    });
};

const findRecordByFilter = (id) => {
    const findPharmacyStoreRecords = await table.select({
        filterByFormula: `id="${id}"`,
    }).firstPage();

    if(findPharmacyStoreRecords.length !== 0){
 return getMinifiedRecords(findPharmacyStoreRecords);
    }
    return 
}

export { table, getMinifiedRecords };

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

const findRecordByFilter = () => {}

export { table, getMinifiedRecords };

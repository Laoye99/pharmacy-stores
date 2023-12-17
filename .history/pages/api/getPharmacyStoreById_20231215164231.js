import { table, getMinifiedRecords, findRecordByFilter } from "@/lib/airtable";


const getPharmacyStoresById = async (req, res) => {
    const { id } = req.query;

    try{
        if (id){
            const findPharmacyStoreRecords = await table.select({
                filterByFormula: `id="${id}"`,
            }).firstPage();
        
            if(findPharmacyStoreRecords.length !== 0){
                const records = getMinifiedRecords(findPharmacyStoreRecords);
                res.json(records);
            }
            else {
            res.json({ message: `id could not be found`});
            }
        } else {
            res.status(400);
            res.json({ message: "id is missing" });
        }
    } catch (error) {
        res.status(500);
        res.json({message: 'Something went wrong', error});
    }
};

export default getPharmacyStoresById;

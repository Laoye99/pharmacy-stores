import { findRecordByFilter } from "@/lib/airtable";


const favouritePharmacyStoreById = async(req, res) => {
    if(req.method === 'PUT') { 

        try {
        const { id } = req.body;
            if (id) {
                const records = await findRecordByFilter(id);

        if(records.length !== 0){
            const record = records[0];

            const calculateVoting = parseInt(record.votng) + 1;
            console.log{{}}
            res.json(records);
        } else{
            res.json({ message: "Pharmacy-store id doesn't exist", id });
        }
            } else {
                res.status(500);
                res.json({ message: "Id is missing"});
            }
        
} catch(error){
    res.status(500);
    res.json({ message: "Error upvoting pharmacy store", error});
}
    };
};

export default favouritePharmacyStoreById;
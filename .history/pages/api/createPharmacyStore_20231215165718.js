import { table, getMinifiedRecords } from "@/lib/airtable";

const createPharmacyStore = async (req,res) => {

    if(req.method === 'POST'){

        const {id, name, formatted_address, locality, voting, imgUrl } = req.body;


    try{
        if (id) {
            const records = await findRecordByFilter(id);

            if(records.length !== 0){
                res.json(records);
            }
                res.json(records);
            } else  const records = getMinifiedRecords(findPharmacyStoreRecords);
              {
        
                if (name){
                const createRecords = await table.create([
                    {
                        fields: {
                            id,
                            name,
                            formatted_address,
                            locality,
                            voting,
                            imgUrl,
        
                        },
                },
            ]);
        
            const records = getMinifiedRecords(createRecords);
                res.json({records});
            }
            else{
                res.status(400);
                res.json({ message: "id or name is missing" });
            }
        } 
        }  
        else{
            res.status(400);
            res.json({ message: "id is missing" });
        }
    
    } catch(err) {
        console.error('Error creating or finding a store', err);
        res.status(500);
        res.json({message: 'Error creating or finding a store', err});
    }
};


};

export default createPharmacyStore;

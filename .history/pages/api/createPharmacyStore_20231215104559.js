import { getMinifiedRecords } from "@/lib/airtable";

const createPharmacyStore = async (req,res) => {

    if(req.method === 'POST'){

        const {Id, name, formatted_address, locality, voting, imgUrl } = req.body;


    try{
        if (Id) {
            const findPharmacyStoreRecords = await table.select({
                filterByFormula: `Id=${Id}`,
            }).firstPage();
        
            if(findPharmacyStoreRecords.length !== 0){
                const records = getMinifiedRecords(f)
                res.json(records);
            } else{
        
                if (name){
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
        }  
        else{
            res.status(400);
            res.json({ message: "Id or name is missing" });
        
        }
    
    } catch(err) {
        console.error('Error creating or finding a store', err);
        res.status(500);
        res.json({message: 'Error creating or finding a store', err});
    }
};


};

export default createPharmacyStore;

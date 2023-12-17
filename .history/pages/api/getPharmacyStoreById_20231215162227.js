const getPharmacyStoresById = (req, res) => {
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

            res.json({ message: `id is created ${id}`});
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

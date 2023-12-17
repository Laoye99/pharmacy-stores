const favouritePharmacyStoreById = (req, res) => {
    if(req.method === 'PUT') { 

        try {
        const { id } = req.body;
            if
        const records = await findRecordByFilter(id);

        if(records.length !== 0){
            res.json(records);
        } else{
            res.json({ message: "Pharmacy-store id doesn't exist", id });
        }
} catch(error){
    res.status(500);
    res.json({ message: "Error upvoting pharmacy store", error});
}
    };
};

export default favouritePharmacyStoreById;
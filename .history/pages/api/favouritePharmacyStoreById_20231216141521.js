const favouritePharmacyStoreById = (req, res) => {
    if(req.method === 'PUT') { 

        try {
        const { id } = req.body;
        
res.json({ message: "this works", id });
} catch(error){
    res.status(500);
    res.json({ message: "Error upvoting pharmacy store", error});
}
    };
};

export default favouritePharmacyStoreById;
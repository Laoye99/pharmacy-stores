const favouritePharmacyStoreById = (req, res) => {
    if(req.method === 'PUT') { 

        try
        const { id } = req.body;
res.json({ message: "this works", id });
}
};

export default favouritePharmacyStoreById;
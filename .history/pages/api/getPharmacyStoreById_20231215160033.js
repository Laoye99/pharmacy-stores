const getPharmacyStoresById = (req, res) => {
    const { id } = req.query;

    try{
        if ()
        res.json({ message: `id is created ${id}`});
    } catch (error) {
        res.status(500);
        res.json({message: 'Something went wrong', error});
    }
};

export default getPharmacyStoresById;

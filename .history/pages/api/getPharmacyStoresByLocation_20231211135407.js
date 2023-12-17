const { fetchPharmacyStores } = require("@/lib/pharmacy-stores");

const getPharmacyStoresByLocation = async(req, res) => {
    try {
        const {latLong, limit} = req.query;
        const response = await fetchPharmacyStores(latLong, limit);
        res.status(200);
        res.json(response);
    } catch (err) {
        console.error("")
    }
}
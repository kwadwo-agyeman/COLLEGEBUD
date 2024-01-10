const users = require('../models/cbUsers');
const handleGetActivityDetails = async (req, res) => {
    const username = req.headers.username;
    try {
        const foundUser = await users.findOne({ username }).exec();
        if (!foundUser) return res.sendStatus(404);//return user not found

        const cardArr = foundUser.cardArr;
        const cardDetails = foundUser.cardDetails;
        const title = foundUser.title;
        const formData = foundUser.formData;
        const description = foundUser.description;
        const modalStates = foundUser.modalStates;

        //send Activity Details from database
        res.status(200).json({ cardArr, cardDetails, title, description, formData, modalStates });
        console.log("success")
        return;
    } catch (err) {
        console.error(`Error:${err}`);
        return res.status(500).json({ "message": "Internal Server Error!" });
    }

}

module.exports = { handleGetActivityDetails }
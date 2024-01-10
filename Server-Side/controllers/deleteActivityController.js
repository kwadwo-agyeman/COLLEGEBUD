const users = require('../models/cbUsers');

const handleDeleteActivity = async (req, res) => {
    const index = req.headers.index;
    const username = req.headers.username;

    try {
        const foundUser = await users.findOne({ username }).exec();
        if (!foundUser) return res.sendStatus(403);

        console.log('Before filtering:', foundUser.cardArr, foundUser.cardDetails, foundUser.title, foundUser.description);

        const updatedCardArr = foundUser.cardArr.filter((_, i) => i !== parseInt(index, 10));
        const updatedCardDetails = foundUser.cardDetails.filter((_, i) => i !== parseInt(index, 10));
        const updatedTitle = foundUser.title.filter((_, i) => i !== parseInt(index, 10));
        const updatedDescription = foundUser.description.filter((_, i) => i !== parseInt(index, 10));
        const updateFormData = foundUser.formData.filter((_, i) => i !== parseInt(index, 10));

        console.log('After filtering:', updatedCardArr, updatedCardDetails, updatedDescription, updatedTitle);

        res.status(200).json({
            updatedCardArr,
            updatedCardDetails,
            updatedDescription,
            updatedTitle,
            updateFormData
        });

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { handleDeleteActivity };

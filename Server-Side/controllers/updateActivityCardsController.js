const users = require('../models/cbUsers');

const handleActivityCards = async (req, res) => {
    const {
        cardArr,
        cardDetails,
        title,
        formData,
        description,
        modalStates
    } = req.body;
    
    console.log('Received data:', cardArr, cardDetails, title, formData, description, modalStates);

    const username = req.headers.username;
    console.log(username)

    try {
        const foundUser = await users.findOne({ username }).exec();
        if (!foundUser) {
            console.log('User not found:', username);
            return res.sendStatus(404); // User not found
        }

        // Update the user's document
        const result = await users.updateOne({ username: foundUser.username }, {
            $set: { cardArr, cardDetails, title, description, formData, modalStates }
        });

        console.log('Update result:', result);

        if (result.modifiedCount > 0) {
            // Update successful
            return res.sendStatus(200);
        } else {
            // No documents were modified, indicating no change was made
            console.log('No documents modified');
            return res.sendStatus(204);
        }
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { handleActivityCards };

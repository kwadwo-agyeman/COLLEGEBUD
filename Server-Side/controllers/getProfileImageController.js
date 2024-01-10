const users = require('../models/cbUsers');
const fsPromises = require('fs').promises;

const handleGetProfile = async (req, res) => {
    const username = req.headers.username;
    console.log(username)
    try {
        const foundUser = await users.findOne({ username }).exec();
        if (!foundUser) return res.sendStatus(400);

        const filePath = foundUser.profilePath; // Adjust the path based on your setup

        // Read the file and send it in the response
        const fileData = await fsPromises.readFile(filePath);
        const dataUrl = `data:image/jpeg;base64,${fileData.toString('base64')}`;
        return res.json({ dataUrl })
    } catch (error) {
        console.log('Error fetching file:', error);
        res.status(404).send('File not found');
    }
};

module.exports = { handleGetProfile };

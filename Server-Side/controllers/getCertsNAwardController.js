const fsPromises = require('fs').promises;
const users = require('../models/cbUsers');
const path = require('path');

const handleGetCertsAndAwards = async (req, res) => {
    try {
        const username = req.headers.username

        const foundUser = await users.findOne({ username });
        if (!foundUser) return res.sendStatus(400);
        const certPaths = foundUser.certsAndAwards;
        console.log(certPaths);

        // Use Promise.all to wait for all promises in the array to resolve
        const certsArray = await Promise.all(certPaths.map(async (filePath) => {
            try {
                const fileData = await fsPromises.readFile(filePath);
                const dataUrl = `data:image/jpeg;base64,${fileData.toString('base64')}`;
                return dataUrl;
            } catch (err) {
                console.error(err);
                return null;
            }
        }));

        return res.status(200).json({ certsArray });

    } catch (err) {
        console.error(`Error ${err}`);
    }
}

module.exports = { handleGetCertsAndAwards };

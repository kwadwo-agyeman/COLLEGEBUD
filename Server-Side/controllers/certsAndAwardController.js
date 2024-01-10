const users = require('../models/cbUsers');
const fsPromises = require('fs').promises;
const fs = require('fs');
const path = require('path');

const saveCertsAndAward = async (files, user) => {
    const directoryPath = path.join(__dirname, '..', 'certAndAwards', user);

    try {
        // Create parent directories if they don't exist
        await fsPromises.mkdir(directoryPath, { recursive: true });
    } catch (err) {
        console.error('Error creating directory:', err);
        throw err; // Rethrow the error to handle it at the higher level
    }

    // Remove existing files in the directory
    try {
        const existingFiles = await fsPromises.readdir(directoryPath);
        await Promise.all(existingFiles.map(file => fsPromises.unlink(path.join(directoryPath, file))));
    } catch (removeError) {
        console.error('Error removing existing files:', removeError);
    }

    // Save the new files and update the schema
    const certsPaths = Object.keys(files).map(async (key) => {
        const fileName = files[key][0].originalname;
        const filePath = path.join(directoryPath, fileName);

        try {
            await fsPromises.writeFile(filePath, files[key][0].buffer);
            console.log('File saved at:', filePath);
            return filePath; // Return the file path
        } catch (writeError) {
            console.error('Error writing file:', writeError);
            return null; // Return null if there's an error
        }
    });

    try {
        // Update the user's schema with the new file paths
        const foundUser = await users.findOne({ username: user });
        if (foundUser) {
            foundUser.certsAndAwards = (await Promise.all(certsPaths)).filter(Boolean);
            await foundUser.save();
        }
    } catch (updateError) {
        console.error('Error updating user schema:', updateError);
    }

};

const handleCertsAndAwards = async (req, res) => {
    try {
        const username = req.headers.username;
        const files = req.files;
        await saveCertsAndAward(files, username);
        console.log(username, req.files);
    } catch (err) {
        console.error(err);
        // Handle the error and send a response to the client if needed
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { handleCertsAndAwards };

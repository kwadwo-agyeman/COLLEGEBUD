const fsPromises = require('fs').promises;
const fs = require('fs');
const path = require('path');
const users = require('../models/cbUsers');

const saveFile = async (file, username) => {
    const directoryPath = path.join(__dirname, '..', 'file');

    try {
        // Check if the directory exists
        await fsPromises.access(directoryPath, fs.constants.F_OK);
    } catch (err) {
        // Directory doesn't exist, create it
        await fsPromises.mkdir(directoryPath);
    }

    // Find existing file for the user with the specified pattern
    const existingFiles = await fsPromises.readdir(directoryPath);
    const userFiles = existingFiles.filter((fileName) => fileName.startsWith(`${username}_`));

    // Remove existing user files
    await Promise.all(userFiles.map(async (file) => {
        const filePath = path.join(directoryPath, file);
        await fsPromises.unlink(filePath);
    }));

    // Save the new file
    const fileName = `${username}_${Date.now()}_${file.originalname}`;
    const filePath = path.join(directoryPath, fileName);
    await fsPromises.writeFile(filePath, file.buffer);

    return filePath;
};

const handleFileUpload = async (req, res) => {
    const username = req.headers.username;
    try {
        const filePath = await saveFile(req.file, req.headers.username);
        console.log(`File saved at: ${filePath}`);

        const foundUser = await users.findOne({ username });
        if (!foundUser) return res.sendStatus(403);
        
        // Update the user's profilePath to the new file
        await users.updateOne({ username: foundUser.username }, { $set: { profilePath: filePath } });

        // Send a response
        res.send('File uploaded successfully!');
    } catch (error) {
        console.error('Error saving file:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { handleFileUpload };

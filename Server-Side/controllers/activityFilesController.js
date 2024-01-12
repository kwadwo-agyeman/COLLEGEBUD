const users = require('../models/cbUsers');
const fsPromises = require('fs').promises;
const fs = require('fs')
const path = require('path');
// const { all } = require('../routes/registerUser');

const saveActivityFiles = async (files, username, index, number) => {

    const directoryPath = path.join(__dirname, '..', 'activityFiles', username, `Activity_${parseInt(index, 10) + 1}`);
    if (!fs.existsSync(directoryPath)) {
        await fsPromises.mkdir(directoryPath, { recursive: true })
    }

    try {
        const readDirectory = await fsPromises.readdir(directoryPath);
        await Promise.all(readDirectory.filter(async (file) => {
            await fsPromises.unlink(path.join(directoryPath, file));//delete current directory
        }))
    } catch (err) {
        console.error(`Error removing files from directory:${err}`)
    }
    //store files locally 
    const activityPaths =
        Object.keys(files).map(async (key) => {
            const fileName = `${files[key][0].originalname}`;
            const filePath = path.join(directoryPath, fileName);

            try {
                await fsPromises.writeFile(filePath, files[key][0].buffer);
                return filePath;
            } catch (writeError) {
                console.error(`Error writing File:${writeError}`);
                return null
            }
        })

    try {
        //save file paths to database
        const foundUser = await users.findOne({ username }).exec();
        if (foundUser) {
            if (foundUser.selectedActivityFiles.length < 0) {
                const selectedActivityFiles = await Promise.all(number.map(async () => []));
                await users.updateOne({ username: foundUser.username }, { $set: { selectedActivityFiles } })
            }
            foundUser.selectedActivityFiles[parseInt(index, 10)] = (await Promise.all(activityPaths)).filter(Boolean);
            await foundUser.save();
            console.log(foundUser.selectedActivityFiles)
        }
    } catch (updateError) {
        console.error(`Error from Saving:${updateError}`)
    }

}

const handleActivityFiles = async (req, res) => {
    try {
        const files = await req.files;
        const username = req.headers.username;
        const index = req.headers.index;

        const foundUser = await users.findOne({ username }).exec();
        if (!foundUser) return res.sendStatus(403);
        const number = foundUser.cardArr;
        await saveActivityFiles(files, username, index, number)

        console.log(files, username, index, number);
        res.sendStatus(200);
        return;
    } catch (err) {
        console.error(`Error:${err}`);
        res.sendStatus(500);
        return; 
    }
}

module.exports = { handleActivityFiles };
const users = require('../models/cbUsers');
const fsPromises = require('fs').promises;

const getActivityFiles = async (req, res) => {
    const username = req.headers.username;
    try {
        const foundUser = await users.findOne({ username }).exec();
        // console.log(`Result: ${foundUser,username}`)
        if (!foundUser) return res.sendStatus(400);

        const result = foundUser.selectedActivityFiles;
        const activityArr = await Promise.all(result.map(async (fileArr) => {
            return Promise.all(fileArr.map(async (filePath) => {
                try {
                    const readFile = await fsPromises.readFile(filePath);
                    const dataUrl = `data:image/jpeg;base64,${readFile.toString('base64')}`;
                    return dataUrl;
                } catch (readError) {
                    console.log(`Error reading file.${readError}`);
                    return null;
                }
            }));
        }));

        // console.log(`Activities: ${activityArr}`);
        return res.status(200).json(activityArr);
    } catch (err) {
        console.error(err);
        return res.sendStatus(400);
    }
};

module.exports = { getActivityFiles };

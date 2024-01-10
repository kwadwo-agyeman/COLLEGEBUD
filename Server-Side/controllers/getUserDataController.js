const users = require('../models/cbUsers');

const handleGetUserData = async (req, res) => {
    // const { username } = req.params;
    // const username = 'ColeWrld'
    const username = req.headers['username']
    console.log(username);


    try {
        // Check if username is not provided or is an empty string
        if (!username || username.trim() === "") {
            return res.status(400).json({ message: 'Username is required' });
        }

        const foundUser = await users.findOne({ username }).exec();
        if (!foundUser) {
            return res.status(400).json({ "message": "Failed to get Data" })
        }
        const personalData = {
            firstname: foundUser.firstname,
            // middlename: foundUser.middlename,
            lastname: foundUser.lastname,
            address: foundUser.address,
            country: foundUser.country
        }
        const bio = {
            bio: foundUser.Bio
        }

        const edu = {
            highschool: foundUser.highschool,
            address: foundUser.highschoolLoc,
            year: foundUser.dateOfComplete
        }
        return res.status(200).json([personalData, bio, edu])

    } catch (err) {
        res.status(500).json({ "message": "Failed to fetch data" })
        console.error(`Error:${err}`)
    }
}

module.exports = { handleGetUserData }
const users = require('../models/cbUsers');

const handleProfUpdate = async (req, res) => {
    const { user, Bio, profileImg, highschool, highschoolLoc, dateOfComplete,firstname, lastname, address, country } = req.body;
    try {
        const foundUser = await users.findOne({ username: user });
        // console.log(foundUser)
        if (!foundUser){
            return res.status(400).json({"message":"User not found"});
        }
        // Use $push to add elements to the certsAndAwards array
        await users.updateMany({ username: foundUser.username }, {
            $set: {
                highschool, highschoolLoc, dateOfComplete, Bio, profileImg, firstname, lastname, address, country
            }
        });

        res.status(200).json({ "message": "Success" });
        return;

    } catch (err) {
        console.error('Error:', err.message);
        return res.status(400).json({ "message": "Failure" })
    }

}

module.exports = { handleProfUpdate }
const users = require('../models/cbUsers');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleAuthorization = async (req, res) => {
    const { username, password } = req.body;
    console.log(username);
    console.log(password);
    if (!username || !password){
        return res.status(400).json({"message":"Username or Password Required"})
    }
    try {
        const foundUser = await users.findOne({ username: username }).exec();

        if (!foundUser) return res.sendStatus(403);

        const matchPwds = await bcrypt.compare(password, foundUser.password);

        if (!matchPwds) {
            return res.status(401).json({ "message": "Login Not Successful" });
        }

        // Move the cookie setting and response sending here
        const roles = Object.values(foundUser.roles);
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { "expiresIn": "5min" }
        );
        const refreshToken = jwt.sign(
            { username: foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { "expiresIn": "1d" }
        );

        await users.updateOne({username: foundUser.username},{$set: {refreshToken}})

        res.cookie('jwt', refreshToken, { sameSite: 'none', secure: true, httpOnly: true, maxAge: 24 * 60 * 60 * 10000 });
        res.status(200).json({ "message": "Login Successful", roles, accessToken });
        return;
    } catch (err) {
        console.error(`Error:${err}`);
        res.sendStatus(401);
    }
};

module.exports = { handleAuthorization };

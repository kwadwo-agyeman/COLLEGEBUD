const users = require('../models/cbUsers');
const bcrypt = require('bcrypt')
const handleRegister = async (req, res) => {
    const {user,pwd,firstname,lastname,email,address,highschool,dob } = req.body;
    console.log(user);
    console.log(pwd);

    if (!user || !pwd) {
        return res.status(400).json({ message: "Username and Password  required" });
    }

    const duplicate = await users.findOne({ username: user });

    if (duplicate) {
        return res.status(409).json({ "message": "Username already exists.Please choose a different username" })
    };
    try {
        const hashedPwd = await bcrypt.hash(pwd, 10);
        const result = await users.create({
            username: user,
            password: hashedPwd,
            firstname: firstname,
            lastname: lastname,
            email: email,
            highschool: highschool,
            address: address,
            dob:dob
        })
        console.log(result)
        return res.status(200).json({ "message": `User ${user} Successfully Created!` });
    } catch (err) {
        console.error(`error:${err}`);
        return res.status(500).json({ "message": "Internal Server Error" });
    }
}

module.exports = { handleRegister }
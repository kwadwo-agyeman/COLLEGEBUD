const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const certsSchema = new Schema({
//     filePath: String
// })

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true

    },
    middlename:String,
    lastname: {
        type: String,
        required: true

    },
    email: {
        type: String,
        required: true

    },
    highschool: {
        type: String,
        required: true

    },
    highschoolLoc:{
        type:String
    },
    dateOfComplete:{
        type:String
    },
    address: {
        type: String,
        required: true

    },
    country:{
        type: String,
    },
    dob: {
        type: String,
        required: true

    },
    username: {
        type: String,
        required: true
    },
    roles: {
        User: {
            type: Number,
            default: 1002
        },
        Editor: Number,
        Admin: Number
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: String,
    Bio:String,
    profilePath: String,
    certsAndAwards: Array,
    cardArr:Array,
    cardDetails:Array,
    title:Array,
    formData:Array,
    description:Array,
    modalStates:Array
});

module.exports = mongoose.model("cbUsers", userSchema);
const {upload} = require('./multerFile')
const activityUploads = upload.fields([
    {name:'Activity_1',maxCount:1},
    {name:'Activity_2',maxCount:1},
    {name:'Activity_3',maxCount:1},
    {name:'Activity_4',maxCount:1}
]);

module.exports = {activityUploads}

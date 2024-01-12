const {upload} = require('./multerFile')
const certUploads = upload.fields([
    {name:'CertAwards_1',maxCount:1},
    {name:'CertAwards_2',maxCount:1},
    {name:'CertAwards_3',maxCount:1},
    {name:'CertAwards_4',maxCount:1}
]);

module.exports = {certUploads}

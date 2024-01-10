const { handleLogEvents } = require('./logEvents');

const errLogger = (err, req, res, next) => {
    handleLogEvents(`Error: ${err}`, 'errLog.txt');
    res.status(500).send(err.message);
    next()
};

module.exports = {errLogger};

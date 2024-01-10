const {format} = require('date-fns');
const {v4: uuid} = require('uuid');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path')

const handleLogEvents = async (data,logName) => {
    const formattedDate = format(new Date(), 'yyyy/MM/dd HH:mm:ss' );
    const logItem  = `${uuid()}\t${formattedDate}\t${data}\n`;
    try{
        if(!fs.existsSync(path.join(__dirname,'..','logs'))){
            await fsPromises.mkdir(path.join(__dirname,'..','logs'))
        };
        await fsPromises.appendFile(path.join(__dirname,'..','logs',logName),logItem)

    }catch(err){
        console.err(`Error:${err}`)
    }
}

const logger = (req,res,next)=>{
    handleLogEvents(`${req.method}\t${req.headers.origin}\t${req.url}`,'reqLog.txt'),
    console.log(`${req.method} ${req.path}`);
    next()
}

module.exports = {logger,handleLogEvents}
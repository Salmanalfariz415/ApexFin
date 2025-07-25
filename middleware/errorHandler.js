const code = require('../constants.js');

const errorHandler = (err,req,res,next)=>{
const statusCode =res.statusCode?res.statusCode : 500;
    switch(statusCode){
        case code.VALIDATION_ERROR:
        res.json({
                title:"Invalid input",
                message:err.message,
                stackTrace :err.stack,
        });
        break;
        case code.UNAUTHORIZED:
        res.json({
                title:"Unauthorized access",
                message:err.message,
                stackTrace :err.stack,
        });
        break;
        case code.FORBIDDEN:
        res.json({
                title:"Payment required to continue",
                message:err.message,
                stackTrace :err.stack,
        });
        break;
        case code.NOT_FOUND:
        res.json({
                title:"Resource not found",
                message:err.message,
                stackTrace :err.stack,
        });
        break;
    }
    next();
}
module.exports=errorHandler;
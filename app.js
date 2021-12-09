import express,{json, urlencoded, raw} from "express";
import cors from "cors";


import "./utils/db";
import User from "./modules/user";
import {ErrorMessage} from "./utils/error";

const app = express();


//INITIALIZE MIDDLEWARES
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(raw());
app.use(cors());


if(process.env.NODE_ENV === "development"){
    app.use((req, res ,next)=>{
        console.log("=====================START=======================");

        const requestObject = {
            ENDPOINT: `${req.get("HOST")}${req.originalUrl}`,
            METHOD: req.method,
            AUTH_TOKEN: req.headers.authorization,
            BODY: req.body,
            QUERY: req.query,
            PARAMS: req.params,
        }

        console.log(requestObject);
        console.log("======================END=========================\n\n");
        next();
    });
}


//INITIALIZE ROUTE MIDDLEWARE
app.use("/api", User);

app.use((err, req, res,next)=>{
    if(!err){
        return next();
    }
    console.info("executing middleware");   
    //res.status(err.httpStatusCode || 500).json({success:false, "message":err});
    res.status(err.httpStatusCode || 500).json(ErrorMessage("Oops! Something went Wrong"));
});

app.use((req,res)=>{
    res.status(400).json({
        success:false,
        message: `Requested route [ ${req.get("HOST")}${req.originalUrl} ] not found`,
    });
});


//RUN SERVER ON PORT 8000
try{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`App is running on port ${process.env.PORT || 8000}`);
    });
}catch(err){
    console.error(error);
}

import mongoose from "mongoose";

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGO_DB_URL, {
    useNewUrlParser:true,
    useUnifiedTopology: true,
});

mongoose.connection
        .once("open", ()=>{
            console.info("==============Mongo DB Started============");
        })
        .on("error", (err)=>{
            throw err;
        });
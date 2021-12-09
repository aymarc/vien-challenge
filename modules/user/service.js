import User from "./model";
import {ExistError, AuthenticationError} from "../../utils/error";
import * as jwt from "jsonwebtoken";
import { delRedis, setRedis, getRedis } from "../../utils/redis";

export const create = async (body)=>{
    try{
        let user = await User.findOne({email:body.email});
        if(user){
            throw new ExistError("You already have an account, kindly login.");
        }

        user = await User.create(body);

        const token = user.generateToken();

        return{
            success:true,
            message: "User registered successfully",
            token
        }

    }catch(error){
        console.error(error);
        next(error);
    }
}


export const login = async ({email, password})=>{
    try{
        let user = await User.findOne({email});

        if(!user){
            throw new AuthenticationError("incorrect email or password");
        }

        if(!user.hasPasswordMatched(password)){
            throw new AuthenticationError("incorrect email or password");
        }

        const token = user.generateToken();
        await setRedis("token",token);
        return{
            success:true,
            token
        }
    }catch(error){
        console.error(error);
        next(error);
    }
}

export const logout = async (headers, res)=>{
    try{
        const sessionToken = await getRedis("token");
        if(sessionToken === headers.token){
            console.log("they match");
          await delRedis("token");
        }
        // session.destroy(err => {
        //     if (err) {
        //         return console.error(err);
        //     }    
        //     return;
        // });
        res.end();

    }catch(error){
        console.error(error);
        next(error);
    }
}
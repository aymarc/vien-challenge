import User from "./model";
import {ExistError, AuthenticationError, NotFoundError} from "../../utils/error";
import * as jwt from "jsonwebtoken";
import { delRedis, setRedis, getRedis } from "../../utils/redis";

export const profile = async ({user})=>{
    try{
        const userExist = await User.findOne({_id:user.id});
        if(!userExist){
            throw new NotFoundError("Opps! We Could not find your profile. Kindly contact support");
        }
        console.log(userExist);
        return{
            success:true,
            id: userExist._id,
            name:userExist.name,
            email: userExist.email
        }
    }catch(error){
        console.error(error)
    }
}

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
          await delRedis("token");
        }
        
        res.end();

    }catch(error){
        console.error(error);
        next(error);
    }
}
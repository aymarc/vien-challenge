import User from "./model";
import {ExistError, AuthenticationError} from "../../utils/error";
import * as jwt from "jsonwebtoken";

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
        throw error;
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

        return{
            success:true,
            token
        }
    }catch(error){
        console.error(error);
        throw error;
    }
}
import User from "./model";
import {ExistError} from "../../utils/error";
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
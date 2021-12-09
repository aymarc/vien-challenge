import * as service from "./service";

export const create = async (req, res, next) =>{
    try{
        res.status(201).json(
             await service.create(req.body)
        );
    }catch(error){
        next(error);
    }
}


export const login = async (req, res, next) =>{
    try{
        res.status(200).json(
            await service.login(req.body)
        );
    }catch(error){
        next(error);
    }
}


export const logout = async(req, res, next) =>{
    try{
        await service.logout(req.headers,res)
    }catch(error){

    }
}
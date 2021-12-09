import * as service from "./service";

export const profile = async(req, res, next) =>{
    try{
        res.status(200).json(await service.profile(req.headers));
    }catch(error){
        console.error(error);
        next(error);
    }
}


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
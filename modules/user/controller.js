import * as service from "./service";

export const create = async (req, res, next) =>{

    try{
        res.status(201).json(
             await service.create(req.body, req.headers)
        )
    }catch(error){
        next(error);
    }
}

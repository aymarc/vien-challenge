import Joi from "joi";

export const create =  Joi.object({

    name:Joi.string().optional(),
   
    email: Joi.string().email().required(),
    
    password: Joi.string().required(),

})
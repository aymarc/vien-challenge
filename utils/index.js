import {ErrorMessage, ValidationError, AccessDenied, AuthenticationError} from "./error";
import * as jwt from "jsonwebtoken";


export function bodyValidator(schemaName){
    // console.log("Break point", schemaName);
    if (!schemaName){
      console.error("No schema suplied to validator");
      throw new ErrorMessage("No schema suplied to validator");
    }

    return async (req, res, next) => {
        try {
         // console.log("was here", schemaName);
       
              const { error} =  schemaName.validate(req.body);
              if (error) { 
                throw new ValidationError(error.details[0].message);
              } 
         
           next();
        } catch (err) {
          console.error("catch error ", err);
          next(err);
        }
    }
}     

export function paramValidator(schemaName){
  if (!schemaName){
    console.error("No schema suplied to validator");
    throw new ErrorMessage("No schema suplied to validator");
  }

  return async (req, res, next) => {
      try {
            const { error} = await schemaName.validate(req.params);
            if (error) { 
              throw new ValidationError(error.details[0].message);
            } 
       
        next();
      } catch (err) {
        console.error("catch error ", err);
        next(err);
      }
  }
}     


export function queryValidator(schemaName){
  if (!schemaName){
    console.error("No schema suplied to validator");
    throw new ErrorMessage("No schema suplied to validator");
  }

  return async (req, res, next) => {
      try {
            const { error} = schemaName.validate(req.query);
            if (error) { 
              throw new ValidationError(error.details[0].message);
            } 
       
        next();
      } catch (err) {
        console.error("catch error ", err);
        next(err);
      }
  }
}     


export const auth = (req, res, next) => {
    //sconsole.log(req.headers)
  
    try {
      let authHeader = req.body.token || req.query.token || req.headers.authorization;
      let token = "";
      if (!authHeader) {
        console.error("\n\n*****start****\n"," Authentication failed: No access token supplied.");
        throw new AccessDenied("Kindly Login to proceed.");
      }
  
      if(typeof authHeader !== undefined){
        token = authHeader.split(' ')[1];
      }
      ///console.log(token);
  
      const decoded = jwt.verify(token, env.TOKEN_KEY);
      req.headers.user = decoded;
    } catch (err) {
      console.error("\n\n*****start****\n", "Authentication failed: You may have sent an invalid token.'", "\n\n logs \n", err, "\n\n*****end****\n");
      throw new AuthenticationError("Session expired. Kindly login again.")
    }
    return next();
  };
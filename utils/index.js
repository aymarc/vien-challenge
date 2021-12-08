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

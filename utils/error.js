

export const ValidationError = function(message=""){
    this.name = "NOT_VALID";
    this.message = message;
    this.httpStatusCode = "400";
} 

export const AuthenticationError = function(message=""){
    this.name = "NOT_AUTHORIZED";
    this.message = message;
    this.httpStatusCode = "401";
}

export const NotFoundError = function(message=""){
    this.name = "NOT_FOUND";
    this.message = message;
    this.httpStatusCode = "404";
} 

export const AccessDenied = function(message=""){
    this.name = "NOT_ALLOWED";
    this.message = message;
    this.httpStatusCode = "403";
} 

export const ExistError = function(message=""){
    this.name = "ENTRY_ALREADY_EXIST";
    this.message = message;
    this.httpStatusCode = "400";
} 

export const ErrorMessage = function(message="Oops! something Went wrong"){
    return {
        error: "INTERNAL_SERVER_ERROR",
        message: message,
    }
} 
  
ValidationError.prototype = Object.create(Error.prototype);

NotFoundError.prototype = Object.create(Error.prototype);

AccessDenied.prototype = Object.create(Error.prototype);

//ErrorMessage.prototype = Object.create(Error.prototype);

ExistError.prototype = Object.create(Error.prototype);

AuthenticationError.prototype = Object.create(Error.prototype);
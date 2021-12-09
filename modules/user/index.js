'use strict';
import {Router} from "express";
import * as validation from "./validation";
import * as controller from "./controller";
import { auth, bodyValidator } from "../../utils";


const route = Router();

route.post("/register", 
    bodyValidator(validation.create),
    controller.create
)
route.post("/login", 
    bodyValidator(validation.login),
    controller.login
)

export default route;
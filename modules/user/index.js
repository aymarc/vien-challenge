'use strict';
import {Router} from "express";
import * as validation from "./validation";
import * as controller from "./controller";
import { auth, bodyValidator } from "../../utils";


const route = Router();

route.get("/profile", 
    auth,
    controller.profile
)


route.post("/register", 
    bodyValidator(validation.create),
    controller.create
)

route.post("/login", 
    bodyValidator(validation.login),
    controller.login
)

route.post("/logout", 
    auth,
    controller.logout
)


export default route;
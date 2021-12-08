import mongoose from "mongoose";
import { hashSync, compareSync } from "bcryptjs";
import * as jwt from "jsonwebtoken";

const schema = new mongoose.schema(
    {
        name:{
            type:String,
            required: true,
        },

        email:{
            type: String,
            required:true,
        },

        password:{
            type:String,
            required:true,
        }
    },
    {timestamp:true}
);

schema.pre("save", function (next) {
    if (this.isModified("password")) this.password = hashSync(this.password);
    next();
  });

schema.methods = {
    hasPasswordMatched: function (password) {
      if (compareSync(password, this.password)) return true;
      return false;
    },
    generateToken: function () {
      return  jwt.sign({
        data: {
          _id: this._id,
          name: this.name,
        },
        secreteKey: process.env.APP_KEY,
        duration: "5h",
      });
    },
  };
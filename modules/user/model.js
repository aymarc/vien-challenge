import mongoose from "mongoose";
import { hashSync, compareSync } from "bcryptjs";
import * as jwt from "jsonwebtoken";

const schema = new mongoose.Schema(
    {
        name:{
            type:String,
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
      return  jwt.sign(
        {
          id: this._id,
          name: this.name,
        },
        process.env.APP_KEY,
        { expiresIn: "2h"}
      );
    },
  };

  export default mongoose.model("users", schema);
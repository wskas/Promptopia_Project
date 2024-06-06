import { Schema , model, models } from 'mongoose';

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exist!'],
        required: [true, 'Email is required'],
    },
    username: {
        type: String,
        required: [true, "username is required"],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"],
    },
    image: {
        type: String, 
    }
});

//the "models" object is provided by the Mongoose liabray and stores all the registered models
// If a model named "User" already exists in the "models" object, it assigns that existing model to the "User" variable
// This prevents redefining the model and ensures that the existing model is reused
// If a model names "User" does not exist in the "models" object, the "model" function from Mongoose is called to create a new model

//This route is called every single time a connection is established\

//look into models.User. If not there, create a new model
const User = models.User || model("User", UserSchema);

export default User;
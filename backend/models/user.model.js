import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const secretKey = process.env.JWT_SECRET_KEY

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: [50, 'Name cannot exceed 50 characters']

    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    }
}, { timestamps: true })


UserSchema.pre('save', async function () {

    if (!this.isModified('password')) return;

    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt);

});


UserSchema.methods.generateToken = function () {
    return jwt.sign({ id: this._id }, secretKey);
}


UserSchema.methods.comparePassword = async function (userPassword) {
    return await bcrypt.compare(userPassword, this.password);
};


export default mongoose.model("User", UserSchema);
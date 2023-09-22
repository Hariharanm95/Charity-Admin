const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const auserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

//static signup method
auserSchema.statics.signup = async function (email, password){

    //validation
    if( !email || !password ){
        throw Error("All field must be filled")
    }

    if(!validator.isEmail(email)){
        throw Error ("Invalid Email Address");
    }

    if(!validator.isStrongPassword(password)){
        throw Error ('Weak Password');
    }

    const exists = await this.findOne({email})

    if(exists){
        throw Error("User already Exists")
    }

    //salt - extra layer of security - eg. mypasswordj87w38ns9dn - add extra value
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    
    const user = await this.create({email, password: hash})
    return user
}

//static login method
auserSchema.statics.login =  async function (email, password){
    if (!email || !password ){
        throw Error("All fields are mandatory!")
    }

    const user = await this.findOne({email})

    if(!user){
        throw Error("Incorrect Email")
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error('Wrong Password')    
    }

    return user

}

module.exports = mongoose.model('Auser', auserSchema)
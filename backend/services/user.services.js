const UserModel = require('../model/user.model')
const jwt = require('jsonwebtoken');

class UserService{
    static async registerUser(userImage,firstName,lastName,email, password){
        try{
            const createUser = new UserModel({userImage,firstName,lastName,email, password});
            return await createUser.save();
        }
        catch(err){
            throw err;
        }
    }

    static async checkuser(email){
        try{
            return await UserModel.findOne({email}) ;

        }
        catch(error){
            throw error; 
        }
    }

    static async userDetails(email){
        try{
            const userDetails = await UserModel.find({email});
            return userDetails
        }
        catch(error){
            throw error
        }
    }

    static async generateToken(tokenData, secretKey, jwt_expire){
        return jwt.sign(tokenData,secretKey,{expiresIn: jwt_expire});
    }
}

module.exports = UserService;
const UserModel = require('../model/user.model')
const { S3Client, PutObjectCommand, GetObjectCommand, ListObjectsV2Command, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
require('dotenv').config();
const jwt = require('jsonwebtoken');

class UserService {
    static async registerUser(userImage, firstName, lastName, email, password) {
        try {
            const createUser = new UserModel({ userImage, firstName, lastName, email, password });
            return await createUser.save();
        }
        catch (err) {
            throw err;
        }
    }

    static async uploadUserPhoto(email, type) {

        const s3Client = new S3Client({
            region: "ap-south-1",
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
            }
        });

        const photoKey = `uploads/${email}.jpg`;

        const command = new PutObjectCommand({
            Bucket: "roadsafeusers",
            Key: photoKey,
            ContentType: type,
        });

        const url = await getSignedUrl(s3Client, command);

        return [url, photoKey];

    }

    static async checkuser(email) {
        try {
            return await UserModel.findOne({ email });

        }
        catch (error) {
            throw error;
        }
    }

    static async userDetails(email) {
        try {
            const userDetails = await UserModel.findOne({ email });

            const userImageKey = userDetails.userImage;
            console.log(userImageKey);

            if (userImageKey.length > 0){
            console.log("checkpoint 1");

            const s3Client = new S3Client({
                region: "ap-south-1",
                credentials: {
                    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                },
            });
            console.log("checkpoint 2");

            const command = new GetObjectCommand({
                Bucket: "roadsafeusers",
                Key: userImageKey,
            });
            console.log("checkpoint 3");

            const photoUrl = await getSignedUrl(s3Client, command);
            console.log("checkpoint 4");

            return [userDetails, photoUrl]}

            else{
                console.log("checkpoint 1");
                const photoUrl = "";
                console.log("checkpoint 2");
                return [userDetails, photoUrl]
            }
        }
        catch (error) {
            throw error
        }
    }

    static async generateToken(tokenData, secretKey, jwt_expire) {
        return jwt.sign(tokenData, secretKey, { expiresIn: jwt_expire });
    }
}

module.exports = UserService;
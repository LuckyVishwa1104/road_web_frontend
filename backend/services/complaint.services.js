const ComplaintModel = require("../model/complaint.model");
const { S3Client, PutObjectCommand, GetObjectCommand, ListObjectsV2Command, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
require('dotenv').config();

class ComplaintServices {

  static async raiseComplaint(userId, email, image, location, category, description) {
    const raiseComplaint = new ComplaintModel({ userId, email, image, location, category, description });
    return await raiseComplaint.save();
  }

  static async getComplaintdetails(email = "") {
    // Configure the S3 client
    const s3Client = new S3Client({
      region: "ap-south-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  
    // Build the query object based on whether email is provided
    const query = email ? { email } : {};
  
    // Fetch complaint details based on the query
    const Complaintdetails = await ComplaintModel.find(query);
  
    // Iterate over each complaint detail and generate the object URL
    const complaintDetailsWithUrl = await Promise.all(
      Complaintdetails.map(async (item) => {
        // Generate the signed URL for the image
        const command = new GetObjectCommand({
          Bucket: "roadsafecomplaints",
          Key: item.image,
        });
        const photoUrl = await getSignedUrl(s3Client, command);
  
        // Return the complaint detail with the object URL
        return {
          ...item.toObject(),
          objectUrl: photoUrl,
        };
      })
    );
  
    // Return the modified complaint details with object URLs
    return complaintDetailsWithUrl;
  }
  
  

  static async getComplaintCount(email) {
    let allComplaintCount = await ComplaintModel.find({ email }).countDocuments();
    let completedCount = await ComplaintModel.find().countDocuments({ email: email, status: "Completed" });
    let inprocessCount = await ComplaintModel.find().countDocuments({ email: email, status: "Inprocess" });
    return [allComplaintCount, completedCount, inprocessCount];

  }

  // below is useless 
  static async getComplaintdetailsAll() {
    const Complaintdetails = await ComplaintModel.find({});
    return Complaintdetails;
  }

  static async getAllComplaintCount() {
    let getAllComplaintCount = await ComplaintModel.find({}).countDocuments();
    let allCompletedCount = await ComplaintModel.find({ status: "Completed" }).countDocuments();
    let allInprogressCount = await ComplaintModel.find({ status: "Inprocess" }).countDocuments();

    return [getAllComplaintCount, allCompletedCount, allInprogressCount];
  }

  static async deleteComplaint(id) {
    const deleted = await ComplaintModel.findOneAndDelete({ _id: id });
    return deleted;
  }

  static async updateComplaintDetails(id, status) {
    const updateDetail = await ComplaintModel.findByIdAndUpdate(
      id,
      { $set: { status: status } },
      { new: true }
    );
    return updateDetail;
  }

  static async searchDetails(filter) {
    const searchDetail = await ComplaintModel.find({
      $or: [
        { email: { "$regex": filter, "$options": "i" } },
        { location: { "$regex": filter, "$options": "i" } },
        { "category.0": { "$regex": filter, "$options": "i" } },
        { description: { "$regex": filter, "$options": "i" } }
      ]
    });
    return searchDetail;
  }

  static async uploadPhoto(email, type) {

    const s3Client = new S3Client({
      region: "ap-south-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
      }
    });

    const min = 1000000000;
    const max = 9999999999;
    const randomNumber = Math.floor(min + Math.random() * (max - min + 1));
    const randomString = randomNumber.toString();

    const photoKey = `uploads/${email + randomString}.jpg`;

    const command = new PutObjectCommand({
      Bucket: "roadsafecomplaints",
      Key: photoKey,
      ContentType: type,
    });

    const url = await getSignedUrl(s3Client, command);

    return [url, photoKey];

  }
}

module.exports = ComplaintServices;

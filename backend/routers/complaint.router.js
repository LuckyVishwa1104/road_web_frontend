const router = require('express').Router();

const ComplaintController = require("../controller/complaint.controller");

router.post('/complaintDetails',ComplaintController.raiseComplaint);

router.post('/getComplaintDetails',ComplaintController.getComplaintDetails);

router.post('/deleteComplaint',ComplaintController.deleteComplaint);

// below is useless router
router.get('/getComplaintDetailAll',ComplaintController.getComplaintDetailsAll);

router.post('/updateStatus',ComplaintController.updateComplaintDetails);

router.post('/bulk',ComplaintController.searchDetails);

// below is useless router
router.get('/getAllComplaintCount',ComplaintController.getAllComplaintCount);

router.post('/uploadPhoto',ComplaintController.uploadPhoto);

module.exports = router;
const express = require("express");
const authmiddileware = require("../middilewares/authmiddleware")
const { createProject, getAllProjects, singleProject, getStatus, Updateproject, Deleteproject, getIndividualproject } = require("../controllers/projectController");
const router = express.Router();

router.get('/projects', getAllProjects);
router.get('/project/status', getStatus)
router.get('/project/single/:id', singleProject);
router.get('/project/user/Individual', authmiddileware, getIndividualproject);
router.get('/project/update/:id', Updateproject)
router.put('/project/update/:id', Updateproject)
router.post('/project/create', createProject);
router.delete('/project/delete/:id', Deleteproject)

module.exports = router
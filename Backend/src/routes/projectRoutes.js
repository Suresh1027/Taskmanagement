const express = require("express");
const authmiddileware = require("../middilewares/authmiddleware")
const { createProject, getAllProjects, singleProject, getStatus, Updateproject, Deleteproject, getIndividualproject } = require("../controllers/projectController");
const router = express.Router();

router.get("/projects", getAllProjects);
router.post("/projects", createProject);
router.get('/status', getStatus)
router.get("/singleProject/:id", singleProject);
router.put("/updateproject/:id", Updateproject)
router.get("/updateproject/:id", Updateproject)
router.delete("/deleteproject/:id", Deleteproject)
router.get('/getIndividualproject', authmiddileware, getIndividualproject);

module.exports = router
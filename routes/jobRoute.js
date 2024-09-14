import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import {
  createJobController,
  deleteJobController,
  getAllJobsController,
  jobStatsController,
  updateJobController,
} from "../controllers/jobController.js";
const router = express.Router();
// routes
// create JOB
router.post("/create-job", userAuth, createJobController);
// GET JOBS
router.get("/get-job", userAuth, getAllJobsController);
//UPDATE JOBS ||  PATCH
router.patch("/update-job/:id", userAuth, updateJobController);
//DELETE JOBS ||  DELETE
router.delete("/delete-job/:id", userAuth, deleteJobController);
//   JOBS stats filter || Get
router.get("/job-stats", userAuth, jobStatsController);
export default router;

const express = require('express');
const router = express.Router();
const jobsController = require('../controllers/jobsController');
const authMiddleware = require('../middleware/authMiddleware');

// All routes below are protected

// Create Job
router.post('/', authMiddleware, jobsController.createJob);

// Get All Jobs
router.get('/', authMiddleware, jobsController.getJobs);

// Update Job
router.put('/:id', authMiddleware, jobsController.updateJob);

// Delete Job
router.delete('/:id', authMiddleware, jobsController.deleteJob);

module.exports = router;
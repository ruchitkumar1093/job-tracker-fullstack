const pool = require('../config/db');

// CREATE JOB
exports.createJob = async (req, res) => {
    try {
        const { title, company, status, location, notes, applied_date } = req.body;

        if (!title || !company) {
            return res.status(400).json({ message: "Title and Company are required" });
        }

        await pool.query(
            `INSERT INTO jobs (title, company, status, location, notes, applied_date, user_id)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                title,
                company,
                status || 'Applied',
                location || null,
                notes || null,
                applied_date || null,
                req.user.id
            ]
        );

        res.status(201).json({ message: "Job created successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// GET ALL JOBS (only for logged-in user)
exports.getJobs = async (req, res) => {
    try {
        const [jobs] = await pool.query(
            'SELECT * FROM jobs WHERE user_id = ? ORDER BY id DESC',
            [req.user.id]
        );

        res.json(jobs);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// UPDATE JOB
exports.updateJob = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, company, status, location, notes, applied_date } = req.body;

        await pool.query(
            `UPDATE jobs 
             SET title=?, company=?, status=?, location=?, notes=?, applied_date=?
             WHERE id=? AND user_id=?`,
            [
                title,
                company,
                status,
                location,
                notes,
                applied_date,
                id,
                req.user.id
            ]
        );

        res.json({ message: "Job updated successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// DELETE JOB
exports.deleteJob = async (req, res) => {
    try {
        const { id } = req.params;

        await pool.query(
            'DELETE FROM jobs WHERE id=? AND user_id=?',
            [id, req.user.id]
        );

        res.json({ message: "Job deleted successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
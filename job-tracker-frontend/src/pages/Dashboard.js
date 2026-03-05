import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const API = "https://job-tracker-backend-6yxc.onrender.com/api/jobs";

    const [jobs, setJobs] = useState([]);
    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");

    useEffect(() => {
        fetchJobs();
// eslint-disable-next-line
    }, []);

    const fetchJobs = async () => {
        try {
            const res = await axios.get(API, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setJobs(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddJob = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                API,
                { title, company },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setTitle("");
            setCompany("");

            fetchJobs();

        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API}/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            fetchJobs();

        } catch (error) {
            console.error(error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="container">

            <div className="card">

                <h2>Job Tracker Dashboard</h2>

                <h3>Add Job</h3>

                <form onSubmit={handleAddJob}>

                    <input
                        type="text"
                        placeholder="Job Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />

                    <input
                        type="text"
                        placeholder="Company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        required
                    />

                    <button type="submit">
                        Add Job
                    </button>

                </form>

                <h3>Your Jobs</h3>

                {jobs.length === 0 ? (
                    <p>No jobs found.</p>
                ) : (
                    <div style={{ marginTop: "10px" }}>

                        {jobs.map((job) => (

                            <div
                                key={job.id}
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    background: "#f5f7ff",
                                    padding: "10px 15px",
                                    borderRadius: "8px",
                                    marginBottom: "10px"
                                }}
                            >

                                <span>
                                    <strong>{job.title}</strong> — {job.company}
                                </span>

                                <button
                                    style={{
                                        width: "90px",
                                        padding: "6px"
                                    }}
                                    onClick={() => handleDelete(job.id)}
                                >
                                    Delete
                                </button>

                            </div>

                        ))}

                    </div>
                )}

                {/* Logout button moved to bottom */}

                <button
                    onClick={handleLogout}
                    style={{ marginTop: "20px" }}
                >
                    Logout
                </button>

            </div>

        </div>
    );
}

export default Dashboard;
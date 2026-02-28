import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate("/");
        } else {
            fetchJobs();
        }
    }, []);

    const fetchJobs = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/jobs",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setJobs(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div style={{ padding: "40px" }}>
            <h2 style={{ color: "white" }}>Dashboard</h2>
            <button onClick={handleLogout} style={{ width: "150px" }}>
                Logout
            </button>

            <div style={{ marginTop: "30px" }}>
                {jobs.length === 0 ? (
                    <p style={{ color: "white" }}>No jobs found.</p>
                ) : (
                    jobs.map((job) => (
                        <div
                            key={job.id}
                            style={{
                                background: "white",
                                padding: "15px",
                                borderRadius: "8px",
                                marginBottom: "15px",
                                boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
                            }}
                        >
                            <strong>{job.title}</strong>
                            <p>{job.company}</p>
                            <span>{job.status}</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Dashboard;
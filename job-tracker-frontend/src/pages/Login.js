import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (loading) return; // prevent double clicks

        setLoading(true);

        try {
            const response = await axios.post(
                "https://job-tracker-backend-6yxc.onrender.com/api/auth/login",
                { email, password }
            );

            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");

        } catch (error) {
            alert(error.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="card">
                <h2>Job Tracker Login</h2>

                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? "Logging in... Please wait ⏳" : "Login"}
                    </button>
                </form>

                <div className="link">
                    Don't have an account? <Link to="/register">Register</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
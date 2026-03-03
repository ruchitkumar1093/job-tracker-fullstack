import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();

        if (loading) return; // prevent double click

        setLoading(true);

        try {
            await axios.post(
                "https://job-tracker-backend-6yxc.onrender.com/api/auth/register",
                { name, email, password }
            );

            alert("Registration Successful 🎉");
            navigate("/");
        } catch (error) {
            alert("Error registering user");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Register</h2>

                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? "Registering... Please wait ⏳" : "Register"}
                    </button>
                </form>

                <p>
                    Already have an account?{" "}
                    <span onClick={() => navigate("/")}>Login</span>
                </p>
            </div>
        </div>
    );
}

export default Register;
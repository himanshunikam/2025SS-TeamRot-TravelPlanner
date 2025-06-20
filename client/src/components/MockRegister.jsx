import React from 'react'

// Simple mock component that mimics Register without external dependencies
const MockRegister = () => {
    const [formData, setFormData] = React.useState({
        username: '',
        password: ''
    });
    const [message, setMessage] = React.useState('');

    const { username, password } = formData;

    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

    const onSubmit = async e => {
        e.preventDefault();

        // Simple mock logic
        if (username && password) {
            // Simulate checking if user exists
            if (username === 'existinguser') {
                setMessage('Failed to register, User already exists');
            } else if (password.length < 6) {
                setMessage('Password must be at least 6 characters');
            } else {
                setMessage('Registered successfully');
            }
        }
    };

    return (
        <div className="auth-form">
            <a href="/login">Login</a>
            <h2>Register</h2>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={username}
                    onChange={onChange}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    required
                />
                <button type="submit">Register</button>
            </form>
            <p className="message">{message}</p>
        </div>
    );
};

export default MockRegister;
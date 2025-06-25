import React from 'react';

// MockLogin component simulates a login without a backend
const MockLogin = ({ setLoggedInUser }) => {
    // State for form inputs
    const [formData, setFormData] = React.useState({
        username: '',
        password: ''
    });
    // Message shown to the user (success/error)
    const [message, setMessage] = React.useState('');

    const { username, password } = formData;

    // Update formData on input change
    const onChange = e =>
        setFormData({
            ...formData,
            [e.target.name]: e.target.value  // sets username or password dynamically
        });

    // Handle form submission
    const onSubmit = async e => {
        e.preventDefault();  // prevent page reload

        // Simple mock logic: only 'testuser' with 'testpass' succeeds
        if (username === 'testuser' && password === 'testpass') {
            // Store a dummy token
            localStorage.setItem('token', 'fake-token');
            // Lift username state to parent
            setLoggedInUser(username);
            setMessage('Logged in successfully');
        } else {
            // Show failure message
            setMessage('Failed to login - wrong credentials');
        }
    };

    return (
        <div className="auth-form">
            <h2>Login</h2>
            {/* Link to registration page */}
            <a href="/register">Register</a>

            <form onSubmit={onSubmit}>
                {/* Username input */}
                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={username}
                    onChange={onChange}
                    required
                />

                {/* Password input */}
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    required
                />

                {/* Submit button */}
                <button type="submit">Login</button>
            </form>

            {/* Feedback message */}
            <p className="message">{message}</p>
        </div>
    );
};

export default MockLogin;

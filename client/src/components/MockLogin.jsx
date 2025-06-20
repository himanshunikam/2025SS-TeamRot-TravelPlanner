import React from 'react'

const MockLogin = ({ setLoggedInUser }) => {
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
        if (username === 'testuser' && password === 'testpass') {
            localStorage.setItem('token', 'fake-token');
            setLoggedInUser(username);
            setMessage('Logged in successfully');
        } else {
            setMessage('Failed to login - wrong credentials');
        }
    };

    return (
        <div className="auth-form">
            <h2>Login</h2>
            <a href="/register">Register</a>
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
                <button type="submit">Login</button>
            </form>
            <p className="message">{message}</p>
        </div>
    );
};

export default MockLogin;
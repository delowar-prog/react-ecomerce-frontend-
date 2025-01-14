import { useState } from "react";
import api from "../../api/axiosInstance";

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const response = await api.post('/login', formData);
            const token = response.data.token;
            localStorage.setItem('token', token);
            api.defaults.headers.Authorization = `Bearer ${token}`;
            setLoading(false);
            window.location.href = '/';
        } catch (err) {
            setError('Invalid credentials. Please try again.');
        }
    }
    return (
        <div>
            <div className="w-1/2 mx-auto my-5">
                <h2>Login</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                             className="my-2 border w-1/2"
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                             className="my-2 border w-1/2"
                        />
                    </div>
                    <button className="bg-gray-500 cursor-pointer rounded text-white p-1" type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login
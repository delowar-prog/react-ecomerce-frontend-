import { useState } from "react"
import api from "../../api/axiosInstance";

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

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
        console.log(formData);
        try {
            await api.post('/register', formData);
            window.location.href = '/login';
        } catch (err) {
            setError('Registration failed. Please try again.');
        }
    }
    return (
        <div>
            <div className="w-1/2 mx-auto my-5">
            <h2>Register</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit} className="w-full">
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="my-2 border w-1/2"
                    />
                </div>
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
                <button className="bg-gray-500 cursor-pointer rounded text-white p-1" type="submit">Register</button>
            </form></div>
        </div>
    )
}

export default Register
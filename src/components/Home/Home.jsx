import { useEffect, useState } from "react";
import api from "../../api/axiosInstance";

const Home = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get('/user');
                setUser(response.data?.name);
            } catch (err) {
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
        };
        fetchUser();
    }, []);

    const handleLogout = async () => {
        await api.post('/logout');
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    return (
        <div>
            <h2>Dashboard</h2>
            {user && <p>Welcome, {user}</p>}
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Home
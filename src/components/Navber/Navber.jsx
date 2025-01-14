import { NavLink } from "react-router-dom"

const Navber = () => {
    return (
        <nav className="bg-gray-500 p-5">
            <ul className="flex gap-5 m-5">
                <li className="text-white"><NavLink to={'/'}>Home</NavLink></li>
                <li className="text-white"><NavLink to={'/register'}>Register</NavLink></li>
                <li className="text-white"><NavLink to={'/login'}>Login</NavLink></li>
            </ul>
        </nav>
    )
}

export default Navber
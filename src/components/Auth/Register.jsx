import { useContext, useState } from "react"
import api from "../../api/axiosInstance";
import apiCall from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import AuthContext from "@/context/AuthProvider";
import { useForm } from "react-hook-form";

const Register = () => {
    const {register,handleSubmit,formState:{errors}} = useForm();
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();
    const onSubmit = async(data) => {
      try{
        const response = await apiCall('post','/register',data);
        console.log('register Successful:',response.user);
        navigate('/login');
      }
      catch(error){
        console.error('Register Failed:', error.response?.data || error.message);
        alert(error.response?.data?.message || 'An error occurred during login.');
        }
        
        console.log(data);
    }

  return (
    <div className="min-h-screen  flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} >
        <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              {...register("name", {
                required: "name is required",
              })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              {...register("email", {
                required: "Email is required",
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
               name="password"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              {...register("password", {
                required: "Password is required",
              })}
             
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
          >
            Register
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-4 text-sm text-center text-gray-600">
           have an account?{" "}
          <a
            href="/login"
            className="text-blue-500 hover:underline focus:outline-none"
          >
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}

export default Register
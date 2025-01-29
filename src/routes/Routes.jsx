import {createBrowserRouter} from "react-router-dom";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import Home from "../components/Home/Home";
import Layout from "../components/Layouts/Layout";
import ProductDetails from "@/components/ProductDetails/ProductDetails";

const router = createBrowserRouter([
    {
      path: "/",
      element:<Layout></Layout>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
          path:'/login',
          element:<Login></Login>
        },
        {
          path:'/register',
          element:<Register></Register>
        },
        
      ]
    },
  ]);

export default router
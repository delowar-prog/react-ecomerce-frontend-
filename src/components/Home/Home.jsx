import { useContext, useEffect, useState } from "react";
import api from "../../api/axiosInstance";
import { AuthContext } from "../../context/AuthProvider";
import HomeCarousel from "./HomeCarousel";
import { AppSidebar } from "./AppSidebar";
import ProductCart from "./ProductCart";
import BlockFeat from "./BlockFeat";
import Paralax from "./Paralax";
import Searchbar from "../Searchbar/Searchbar";

const Home = () => {
    const [user, setUser] = useState(null);
    const {showIn} = useContext(AuthContext);
    return (
        <div>
            {
                showIn? 
                <Searchbar/>
                :
                ""
            }
           <HomeCarousel />
           <ProductCart/>
           <BlockFeat/>
           <Paralax/>
        </div>
    )
}

export default Home
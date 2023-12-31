import { Navigate, Outlet } from "react-router-dom";

//constants
import PAGES from "../constants/pages";

export default function PrivateRoutes(props){
    const {token} = props;

    return(
        token ? <Outlet/> : <Navigate to={PAGES.LOGIN}/>
    )
}
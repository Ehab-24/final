import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function HomeLayout() {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
            <ToastContainer position="bottom-right" />
        </>
    )
}


export default HomeLayout;


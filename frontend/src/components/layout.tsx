import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";
import LenisScroll from "./lenis";

const Layout = () => {
    return (
        <>
            <Navbar />
            <LenisScroll />

            <main className="px-4 py-4 md:px-16 lg:px-24 xl:px-32">
                <Outlet />
            </main>

            <Footer />
        </>
    );
};

export default Layout;

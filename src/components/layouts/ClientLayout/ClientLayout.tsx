import { Outlet } from "react-router";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const ClientLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="grow w-[80%] mx-auto py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default ClientLayout;

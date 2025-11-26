import { Outlet } from "react-router";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

import ErrorBoundaryContainer from "../../ErrorBoundaryContainer/ErrorBoundaryContainer";
import { Suspense } from "react";
import Loader from "../../Loader/Loader";

const ClientLayout = () => {
  return (
    <div className="min-h-screen flex flex-col ">
      <Navbar />
      <main className="grow">
        <ErrorBoundaryContainer>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </ErrorBoundaryContainer>
      </main>
      <Footer />
    </div>
  );
};

export default ClientLayout;

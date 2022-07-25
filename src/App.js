import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import "react-loading-skeleton/dist/skeleton.css";
import { ToastContainer } from "react-toastify";

import ROUTES from "./routes";
import {
    Login,
    Home,
    Register,
    CompanyDetail,
    CompanyDetailAnonim,
    Admin,
    Plan,
} from "./pages";
import Layout from "./layout";

function App() {
    return (
        <div>
            <ToastContainer autoClose={1000} />
            <BrowserRouter>
                <Routes>
                    <Route path={ROUTES.HOME} element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route element={<Admin />} path={ROUTES.ADMIN} />
                        <Route element={<Register />} path={ROUTES.REGISTER} />
                        <Route element={<Login />} path={ROUTES.LOGIN} />
                        <Route element={<Plan />} path={ROUTES.PLAN} />
                        <Route
                            element={<CompanyDetail />}
                            path={`${ROUTES.COMPANY_DETAIL}/:id`}
                        />
                        <Route
                            element={<CompanyDetailAnonim />}
                            path={`${ROUTES.COMPANY_DETAIL_ANONIM}/:id`}
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

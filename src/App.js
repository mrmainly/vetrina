import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./App.css";

import ROUTES from "./routes";
import { Login, Home, Register, CompanyDetail } from "./pages";
import Layout from "./layout";

function App() {
    return (
        <div>
            {/* <ToastContainer autoClose={1000} /> */}
            <BrowserRouter>
                <Routes>
                    <Route path={ROUTES.HOME} element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route element={<Register />} path={ROUTES.REGISTER} />
                        <Route element={<Login />} path={ROUTES.LOGIN} />
                        <Route
                            element={<CompanyDetail />}
                            path={`${ROUTES.COMPANY_DETAIL}/:id`}
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

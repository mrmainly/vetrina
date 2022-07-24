import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Box, Container } from "@mui/material";

const Layout = () => {
    return (
        <div style={{ overflow: "hidden" }}>
            <Box sx={{ background: "#F7F9F7", minHeight: "100vh" }}>
                <Container sx={{ paddingTop: 10, paddingBottom: 10 }}>
                    <Outlet />
                </Container>
            </Box>
        </div>
    );
};

export default Layout;

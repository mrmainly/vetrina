import React from "react";

import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import ROUTES from "../../routes";

const Root = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    alignItems: "start",
    // alignItems: 'center',
    // justifyContent: 'center',
    padding: 10,
    background: "#FFFFFF",
    margin: "0 auto",

    width: "90%",
    "&:hover": {
        boxShadow: "0px 0px 20px rgba(0,0,0,0.8)",
    },
    transition: "all 1s ease",
    height: 350,
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
        width: "92%",
    },
}));

const Tag = styled(Box)(({ theme }) => ({
    background: "green",
    width: "max-content",
    paddingTop: 3,
    paddingBottom: 3,
    paddingRight: 5,
    paddingLeft: 5,
    borderRadius: 5,
    color: "white",
}));

const ImgItem = styled(Box)(({ theme }) => ({
    width: "100%",
    height: 170,
    boxShadow: "1px 1px 11px -3px rgba(34, 60, 80, 0.2)",
    cursor: "pointer",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
}));

const CompanyCard = ({ logo, id, name, phone, tags }) => {
    const navigate = useNavigate();

    return (
        <Root>
            <ImgItem
                sx={{
                    backgroundImage: `url(${logo})`,
                }}
                onClick={() => {
                    navigate(`${ROUTES.COMPANY_DETAIL}/${id}`);
                }}
            ></ImgItem>
            <Typography
                variant="h6"
                sx={{
                    mt: 2,
                    color: "#202020",
                    fontWeight: "bold",
                    overflow: "hidden",
                }}
            >
                {name}
            </Typography>
            <Typography
                variant="body2"
                sx={{
                    color: "#2F80ED",
                    height: 40,
                    overflow: "hidden",
                }}
            >
                {phone}
            </Typography>
            <Box sx={{ mt: "-10px" }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                    Теги
                </Typography>
                {tags.map((item, index) => (
                    <Tag key={index}>{item.name}</Tag>
                ))}
            </Box>
        </Root>
    );
};

export default CompanyCard;
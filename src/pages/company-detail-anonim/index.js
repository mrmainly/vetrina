import React from "react";

import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Box, Typography, Grid, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useGetMarketsIdAnomimQuery } from "../../service/CompanyService";
import {
    ProductCard,
    CatalogCardDetailSkeleton,
    ProductModal,
} from "../../components";
import ROUTES from "../../routes";

const ItemImg = styled(Box)(({ theme }) => ({
    background: "white",
    padding: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    minHeight: 520,
    [theme.breakpoints.down("sm")]: {
        minHeight: 200,
    },
}));

const Item = styled(Box)(({ theme }) => ({
    background: "white",
    padding: 20,
    minHeight: 520,
    [theme.breakpoints.down("md")]: {
        minHeight: "max-content",
    },
}));

const GridContainer = styled(Grid)(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
        display: "flex",
        flexDirection: "column-reverse",
    },
}));

const CompanyDetailAnonim = () => {
    const params = useParams();
    const navigate = useNavigate();

    const location = useLocation();
    const data = location.state;

    const {
        data: products,
        isFetching: isProductFetching,
        error: productError,
    } = useGetMarketsIdAnomimQuery({ id: params.id });

    console.log(data);

    return (
        <Box>
            {isProductFetching ? (
                <Box>
                    <CatalogCardDetailSkeleton />
                </Box>
            ) : productError ? (
                "Error"
            ) : (
                <Box>
                    <GridContainer container spacing={1}>
                        <Grid item lg={6} xl={6} md={6} sm={12} xs={12}>
                            <Item>
                                <IconButton
                                    onClick={() => navigate(ROUTES.HOME)}
                                >
                                    <ArrowBackIcon />
                                </IconButton>
                                <Typography variant="h5" sx={{ mt: 3 }}>
                                    {data?.name}
                                </Typography>
                                <Typography variant="h6" sx={{ mt: 3 }}>
                                    Номер телефона:&nbsp;
                                    {data?.phone}
                                </Typography>
                                <Box
                                    sx={{
                                        mt: 3,
                                        maxHeight: 230,
                                        overflow: "hidden",
                                    }}
                                >
                                    <Typography variant="h6">
                                        Описание:
                                    </Typography>{" "}
                                    <Typography variant="h6">
                                        {data?.description}
                                    </Typography>
                                </Box>
                                <Typography variant="h6" sx={{ mt: 3 }}>
                                    Теги
                                </Typography>
                                <Box sx={{ display: "flex", flexWrap: "wrpa" }}>
                                    {data.tags.length ? (
                                        data?.tags.map((item, index) => (
                                            <Box
                                                key={index}
                                                sx={{
                                                    mt: 2,
                                                    bgcolor: "green",
                                                    p: 0.5,
                                                    color: "white",
                                                    borderRadius: 2,
                                                    ml: index === 0 ? 0 : 1,
                                                }}
                                            >
                                                <Typography variant="h6">
                                                    {item.name}
                                                </Typography>
                                            </Box>
                                        ))
                                    ) : (
                                        <Box
                                            sx={{
                                                mt: 2,
                                                bgcolor: "green",
                                                p: 0.5,
                                                color: "white",
                                                borderRadius: 2,
                                            }}
                                        >
                                            <Typography variant="h6">
                                                Нету тега
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>
                            </Item>
                        </Grid>
                        <Grid item lg={6} xl={6} md={6} sm={12} xs={12}>
                            <ItemImg
                                sx={{
                                    backgroundImage: `url(${data?.logo})`,
                                }}
                            ></ItemImg>
                        </Grid>
                    </GridContainer>
                    <Box
                        sx={{
                            background: "white",
                            minHeight: 100,
                            mt: 1,
                            padding: 2,
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Grid container spacing={1}>
                            {products.results.length ? (
                                products.results.map((item, index) => (
                                    <Grid
                                        item
                                        key={index}
                                        lg={3}
                                        xl={3}
                                        md={4}
                                        sm={6}
                                        xs={12}
                                    >
                                        <ProductCard {...item} />
                                    </Grid>
                                ))
                            ) : (
                                <Grid item xs={12}>
                                    <Typography variant="h4">
                                        Нет товаров
                                    </Typography>
                                </Grid>
                            )}
                        </Grid>
                    </Box>
                    <ProductModal />
                </Box>
            )}
        </Box>
    );
};

{
    /* <Box>
                    <Typography variant="h5">{data?.name}</Typography>
                    <img />
                    <Typography variant="h6" style={{ marginTop: 20 }}>
                        {data?.description}
                    </Typography>
                    <Typography variant="h6" style={{ marginTop: 20 }}>
                        Номер телефона: <span>{data?.phone}</span>
                    </Typography>
                </Box> */
}

export default CompanyDetailAnonim;

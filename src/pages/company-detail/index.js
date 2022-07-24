import React from "react";

import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Grid, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import {
    useGetMarketsIdQuery,
    useGetMarketsItemsQuery,
} from "../../service/CompanyService";
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
}));

const GridContainer = styled(Grid)(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
        display: "flex",
        flexDirection: "column-reverse",
    },
}));

const CompanyDetail = () => {
    const params = useParams();
    const navigate = useNavigate();

    const { data, isFetching, error } = useGetMarketsIdQuery({ id: params.id });
    const {
        data: products,
        isFetching: isProductFetching,
        error: productError,
    } = useGetMarketsItemsQuery({ id: params.id });

    console.log(products);

    return (
        <Box>
            {isFetching ? (
                <Box>
                    <CatalogCardDetailSkeleton />
                </Box>
            ) : error ? (
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
                                <Typography variant="h6" sx={{ mt: 3 }}>
                                    {data?.description}
                                </Typography>
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
                            minHeight: 600,
                            mt: 1,
                            padding: 2,
                        }}
                    >
                        {isProductFetching ? (
                            "Products Loading"
                        ) : productError ? (
                            "Products Error"
                        ) : (
                            <Grid container spacing={1}>
                                {products.results.map((item, index) => (
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
                                ))}
                            </Grid>
                        )}
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

export default CompanyDetail;

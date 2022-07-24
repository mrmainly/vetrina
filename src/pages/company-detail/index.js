import React, { useState } from "react";

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
    ProductFormModal,
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

const AddCard = styled(Box)(({ theme }) => ({
    background: "#F7F9F7",
    width: "90%",
    height: 400,
    padding: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
        width: "100%",
    },
}));

const CompanyDetail = () => {
    const [open, setOpen] = useState(false);

    const params = useParams();
    const navigate = useNavigate();

    const { data, isFetching, error } = useGetMarketsIdQuery({ id: params.id });
    const {
        data: products,
        isFetching: isProductFetching,
        error: productError,
    } = useGetMarketsItemsQuery({ id: params.id });

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
                    <ProductFormModal
                        open={open}
                        setOpen={setOpen}
                        id={params.id}
                    />
                    <GridContainer container spacing={1}>
                        <Grid item lg={6} xl={6} md={6} sm={12} xs={12}>
                            <Item>
                                <IconButton
                                    onClick={() => navigate(ROUTES.ADMIN)}
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
                                <Grid item lg={3} xl={3} md={4} sm={6} xs={12}>
                                    <AddCard>
                                        <IconButton
                                            style={{ width: 100, height: 100 }}
                                            onClick={() => setOpen(true)}
                                        >
                                            <img
                                                src={
                                                    "/img/pngtree-vector-add-icon-png-image_998225.svg"
                                                }
                                                style={{ width: "90%" }}
                                            />
                                        </IconButton>
                                    </AddCard>
                                </Grid>
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

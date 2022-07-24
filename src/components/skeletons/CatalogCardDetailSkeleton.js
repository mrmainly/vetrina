import React from "react";
import Skeleton from "react-loading-skeleton";
import { Grid, Box } from "@mui/material";
import { styled } from "@mui/system";

const CatalogCardDetailSkeleton = () => {
    return (
        <div style={{ width: "100%" }}>
            <Grid container spacing={1}>
                <Grid item lg={6} xl={6} md={6} sm={12} xs={12}>
                    <Skeleton style={{ height: 590 }} />
                </Grid>
                <Grid item lg={6} xl={6} md={6} sm={12} xs={12}>
                    <Skeleton style={{ height: 590 }} />
                </Grid>
            </Grid>
            <Skeleton style={{ height: 900, marginTop: 30 }} />
        </div>
    );
};

export default CatalogCardDetailSkeleton;

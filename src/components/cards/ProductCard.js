import React from "react";

import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useDispatch } from "react-redux";
import { productModalSlice } from "../../slices/ProductModalSlice";

import ROUTES from "../../routes";

const Root = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    alignItems: "start",
    // alignItems: 'center',
    // justifyContent: 'center',
    padding: 10,
    background: "#F7F9F7",
    margin: "0 auto",
    width: "90%",
    height: 400,
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
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    cursor: "pointer",
}));

const ProductCard = ({
    price,
    attributes,
    name,
    market,
    amount,
    description,
}) => {
    const { openAndAdded } = productModalSlice.actions;
    const dispatch = useDispatch();

    return (
        <Root>
            <ImgItem
                sx={{
                    backgroundImage: `url(/img/2832.jpg)`,
                }}
                onClick={() => {
                    dispatch(
                        openAndAdded({
                            price: price,
                            name: name,
                            market: market,
                            description: description,
                            attributes: attributes,
                        })
                    );
                }}
            ></ImgItem>
            <Typography
                variant="body1"
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
                variant="body1"
                sx={{
                    color: "#202020",
                    fontWeight: "bold",
                    overflow: "hidden",
                }}
            >
                {description}
            </Typography>
            <Typography
                variant="h6"
                sx={{
                    height: 40,
                    overflow: "hidden",
                    fontWeight: 600,
                }}
            >
                {price}₽
            </Typography>
            <Box sx={{ mt: "-10px", width: "100%" }}>
                <Typography variant="body1" sx={{ mt: 1 }}>
                    атрибуты
                </Typography>
                {attributes.length
                    ? attributes.map((item, index) => (
                          <Box
                              sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                              }}
                              key={index}
                          >
                              <Box sx={{ width: 140 }}>
                                  <Typography
                                      variant="body2"
                                      sx={{ color: "gray" }}
                                  >
                                      {item.name}
                                  </Typography>
                              </Box>

                              <Typography variant="body2">
                                  {item.value}
                              </Typography>
                          </Box>
                      ))
                    : "Нету атрибутов"}
            </Box>
        </Root>
    );
};

export default ProductCard;

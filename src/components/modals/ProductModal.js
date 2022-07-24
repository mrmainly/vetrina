import React from "react";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Typography,
    Box,
    Slide,
    Popover,
} from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";

import { useDispatch } from "react-redux/es/exports";

import { productModalSlice } from "../../slices/ProductModalSlice";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

const ModalContent = styled(DialogContent)(({ theme }) => ({
    width: 500,
    display: "flex",
    flexDirection: "column",

    [theme.breakpoints.down("sm")]: {
        width: 300,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle
            {...other}
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

export default function ProductModal() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [description, setDescription] = React.useState("");
    const { open, data } = useSelector((state) => state.productModalSlice);
    const { close } = productModalSlice.actions;

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const dispatch = useDispatch();
    // console.log(data);

    const openPopover = Boolean(anchorEl);

    return (
        <div>
            <BootstrapDialog
                aria-labelledby="customized-dialog-title"
                open={open}
                onClose={() => dispatch(close())}
                TransitionComponent={Transition}
            >
                <BootstrapDialogTitle id="customized-dialog-title">
                    {data ? data?.name : ""}
                </BootstrapDialogTitle>
                {data ? (
                    <ModalContent dividers>
                        <Typography sx={{ fontSize: 18 }}>
                            Описание:
                            <span style={{ fontWeight: 600 }}>
                                {" "}
                                {data?.description}
                            </span>
                        </Typography>
                        <Typography sx={{ fontSize: 18, mt: 2 }}>
                            Цена:
                            <span style={{ fontWeight: 600 }}>
                                {" "}
                                {data?.price}₽
                            </span>
                        </Typography>
                        <Box sx={{ fontSize: 18, mt: 2 }}>
                            Атрибуты:
                            <Box sx={{ mt: 1 }}>
                                {data?.attributes?.length
                                    ? data.attributes.map((item, index) => (
                                          <Box
                                              sx={{
                                                  display: "flex",
                                                  justifyContent:
                                                      "space-between",
                                              }}
                                              key={index}
                                          >
                                              <Box>
                                                  {item.description ? (
                                                      <Box
                                                          sx={{
                                                              display: "flex",
                                                          }}
                                                      >
                                                          <Typography
                                                              variant="body2"
                                                              sx={{
                                                                  color: "gray",
                                                              }}
                                                          >
                                                              {item.name}
                                                          </Typography>
                                                          <HelpIcon
                                                              onMouseEnter={(
                                                                  e
                                                              ) => {
                                                                  handlePopoverOpen(
                                                                      e
                                                                  );
                                                                  setDescription(
                                                                      item.description
                                                                  );
                                                              }}
                                                              onMouseLeave={
                                                                  handlePopoverClose
                                                              }
                                                              sx={{ ml: 1 }}
                                                          />
                                                      </Box>
                                                  ) : (
                                                      <Typography
                                                          variant="body2"
                                                          sx={{ color: "gray" }}
                                                      >
                                                          {item.name}
                                                      </Typography>
                                                  )}
                                              </Box>

                                              <Typography variant="body2">
                                                  {item.value}
                                              </Typography>
                                          </Box>
                                      ))
                                    : "Нету атрибутов"}
                            </Box>
                        </Box>
                    </ModalContent>
                ) : (
                    ""
                )}
                <Popover
                    id="mouse-over-popover"
                    sx={{
                        pointerEvents: "none",
                    }}
                    open={openPopover}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                >
                    <Typography sx={{ p: 1 }}>{description}</Typography>
                </Popover>
            </BootstrapDialog>
        </div>
    );
}

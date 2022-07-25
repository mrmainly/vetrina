import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Box,
    Slide,
    TextField,
    Button,
    ButtonGroup,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import { useForm } from "react-hook-form";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { useCreateProductMeMutation } from "../../service/CompanyService";

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

const Form = styled("form")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
}));

const Input = styled(TextField)(({ theme }) => ({
    background: "white",
    marginTop: 10,
}));

const CustomButton = styled(Button)(({ theme }) => ({
    backgroundColor: "green",
    color: "white",
    borderTopLeftRadius: 0,
    borderEndStartRadius: 0,
    "&:hover": {
        color: "green",
        borderColor: "green",
    },
}));

const CustomTextField = styled(TextField)(({ theme }) => ({
    width: "100%",
    background: "white",
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderTopRightRadius: 0,
            borderEndEndRadius: 0,
        },
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

export default function ProductFormModal({ open, setOpen, id }) {
    const [tags, setTags] = useState([
        { value: "", id: 0, description: "", name: "" },
    ]);
    let [idCounter, setIdCounter] = useState(0);

    const [createProduct] = useCreateProductMeMutation();

    const { register, handleSubmit } = useForm({
        mode: "onBlur",
    });

    const addInput = async (e) => {
        setIdCounter((idCounter += 1));
        let newInput = tags.concat({
            value: "",
            id: idCounter,
        });
        setTags(newInput);
    };

    const handleText = (id) => (e) => {
        let tag = [...tags];
        tag[id].value = e.target.value;
        setTags(tag);
    };

    const handleDescription = (id) => (e) => {
        let tag = [...tags];
        tag[id].description = e.target.value;
        setTags(tag);
    };

    const handleName = (id) => (e) => {
        let tag = [...tags];
        tag[id].name = e.target.value;
        setTags(tag);
    };

    const handleDelete = (i) => {
        setIdCounter(idCounter - 1);
        setTags(tags.filter((tag) => tag.id !== i));
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = (data) => {
        createProduct({
            id,
            ...data,
            attributes: tags.map((item) => {
                return {
                    name: item.name,
                    value: item.value,
                    description: item.description,
                };
            }),
        }).then((res) => {
            if (res.data) {
                handleClose();
            }
        });
    };

    return (
        <div>
            <BootstrapDialog
                aria-labelledby="customized-dialog-title"
                open={open}
                onClose={() => handleClose()}
                TransitionComponent={Transition}
            >
                <BootstrapDialogTitle id="customized-dialog-title">
                    Создание товара
                </BootstrapDialogTitle>
                <ModalContent dividers>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            label="Название"
                            {...register("name")}
                            required
                        />
                        <Input
                            label="Описание"
                            {...register("description")}
                            required
                        />
                        <Input label="Цена" {...register("price")} required />
                        <Input
                            label="amount"
                            {...register("amount")}
                            required
                        />
                        {tags.map((item, index) => (
                            <Box key={index}>
                                <ButtonGroup
                                    style={{ width: "100%", marginTop: 10 }}
                                >
                                    <CustomTextField
                                        label="Название атрибута"
                                        value={item.name}
                                        onChange={handleName(item.id)}
                                    />
                                    <CustomButton
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        <RemoveCircleIcon />
                                    </CustomButton>
                                </ButtonGroup>
                                <CustomTextField
                                    label="Значение"
                                    style={{ marginTop: 10 }}
                                    value={item.value}
                                    onChange={handleText(item.id)}
                                />
                                <CustomTextField
                                    size="small"
                                    label="Описание(не обезательно)"
                                    style={{ marginTop: 10 }}
                                    value={item.description}
                                    onChange={handleDescription(item.id)}
                                />
                            </Box>
                        ))}

                        <Button
                            sx={{ mt: 2 }}
                            variant="contained"
                            type="submit"
                        >
                            Создать
                        </Button>
                        <Button
                            sx={{ mt: 2 }}
                            variant="contained"
                            onClick={() => addInput()}
                        >
                            Добавить атрибут
                        </Button>
                    </Form>
                </ModalContent>
            </BootstrapDialog>
        </div>
    );
}

import React, { useState } from "react";

import {
    Box,
    Grid,
    Pagination,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    TextField,
    ButtonGroup,
    Button,
    IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import cookie from "js-cookie";

import {
    useGetMarketsMeQuery,
    useCreateMarketsMeMutation,
} from "../../service/CompanyService";
import { useGetTagsListQuery } from "../../service/TagsService";
import {
    CompanyCard,
    SkeletonVersion,
    CompanyFormModal,
} from "../../components";
import ROUTES from "../../routes";

const Img = styled("img")(({ theme }) => ({
    width: 500,
    height: 80,
    margin: "0 auto",
    [theme.breakpoints.down("md")]: {
        width: 250,
    },
}));

const SelectDesktop = styled(FormControl)(({ theme }) => ({
    width: 250,
    background: "white",
    [theme.breakpoints.down("md")]: {
        marginBottom: 20,
    },
    [theme.breakpoints.down("sm")]: {
        width: "100%",
    },
}));

const AddCard = styled(Box)(({ theme }) => ({
    background: "#FFFFFF",
    width: "90%",
    height: 350,
    padding: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
        width: "100%",
    },
}));

const Space = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    marginTop: 50,
    [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "start",
    },
}));

const CusTextField = styled(TextField)(({ theme }) => ({
    marginLeft: 20,
    background: "white",
    width: 200,
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderTopRightRadius: 0,
            borderEndEndRadius: 0,
        },
    },
    [theme.breakpoints.down("md")]: {
        marginLeft: 0,
    },
    [theme.breakpoints.down("sm")]: {
        width: "100%",
    },
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

const ButtonAdmin = styled(Button)(({ theme }) => ({
    backgroundColor: "green",
    color: "white",
    height: 40,
    marginLeft: 20,
    "&:hover": {
        color: "green",
        background: "#F7F9F7",
    },
    [theme.breakpoints.down("md")]: {
        marginTop: 20,
        marginLeft: 0,
    },
    [theme.breakpoints.down("sm")]: {
        width: "100%",
    },
}));

const ButtonGroupCus = styled(ButtonGroup)(({ theme }) => ({
    [theme.breakpoints.down("sm")]: {
        width: "100%",
    },
}));

const Admin = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [sort, setSort] = useState("");
    const [filterName, setFilterName] = useState("");
    const [postFilterName, setPostFilterName] = useState("");
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    const { data, error, isFetching, isLoading } = useGetMarketsMeQuery({
        sort,
        filterName: postFilterName,
        currentPage,
    });
    const {
        data: tagsList,
        error: tagsError,
        isLoading: tagsLoading,
    } = useGetTagsListQuery();

    let countNumber = Math.ceil(data?.count / 20);
    const skeletonData = 8;

    console.log(data);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <CompanyFormModal
                open={open}
                setOpen={setOpen}
                tagsList={tagsList}
            />
            <Img src="/img/1111.svg" />
            <Space>
                <SelectDesktop size="small">
                    <InputLabel id="demo-simple-select-label">Теги</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Теги"
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                    >
                        {tagsLoading ? (
                            ""
                        ) : tagsError ? (
                            <MenuItem>нЕту тегов</MenuItem>
                        ) : (
                            tagsList.results.map((item, index) => (
                                <MenuItem value={item.id} key={index}>
                                    {item.name}
                                </MenuItem>
                            ))
                        )}
                    </Select>
                </SelectDesktop>
                <ButtonGroupCus>
                    <CusTextField
                        label="Поиск по названию"
                        size="small"
                        value={filterName}
                        onChange={(e) => setFilterName(e.target.value)}
                    />
                    <CustomButton
                        onClick={() => {
                            setPostFilterName(filterName);
                        }}
                    >
                        <SearchIcon />
                    </CustomButton>
                </ButtonGroupCus>
                <ButtonAdmin
                    variant="contained"
                    onClick={() => {
                        cookie.remove("jwttoken");
                        navigate(ROUTES.HOME);
                    }}
                >
                    Выйти из админки
                </ButtonAdmin>
            </Space>
            <Grid sx={{ mt: 5, width: "100%" }} container spacing={2}>
                {isLoading
                    ? Array(skeletonData)
                          .fill(0)
                          .map((item, index) => (
                              <Grid
                                  item
                                  lg={3}
                                  xl={3}
                                  md={4}
                                  sm={4}
                                  xs={12}
                                  key={index}
                              >
                                  <SkeletonVersion />
                              </Grid>
                          ))
                    : data?.results.map((item, index) => (
                          <Grid
                              item
                              lg={3}
                              xl={3}
                              md={4}
                              sm={6}
                              xs={12}
                              key={index}
                          >
                              <CompanyCard {...item} type={"admin"} />
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
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "start",
                    width: "100%",
                    marginTop: 5,
                }}
            >
                <Pagination
                    count={countNumber}
                    page={currentPage}
                    onChange={(event, value) => {
                        setCurrentPage(value);
                    }}
                />
            </Box>
        </Box>
    );
};

export default Admin;

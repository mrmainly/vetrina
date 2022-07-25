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
} from "@mui/material";
import { styled } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import cookie from "js-cookie";

import { useGetMarketsQuery } from "../../service/CompanyService";
import { useGetTagsListQuery } from "../../service/TagsService";
import { CompanyCard, SkeletonVersion } from "../../components";
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

const SelectDesktop2 = styled(FormControl)(({ theme }) => ({
    width: 250,
    background: "white",
    marginLeft: 20,
    [theme.breakpoints.down("md")]: {
        marginBottom: 20,
        marginLeft: 0,
    },
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

const BoxPagination = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 50,
    [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
    },
}));

const ButtonLink = styled(Button)(({ theme }) => ({
    [theme.breakpoints.down("sm")]: {
        marginTop: 30,
    },
}));

const Home = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [sort, setSort] = useState("");
    const [filterName, setFilterName] = useState("");
    const [postFilterName, setPostFilterName] = useState("");

    const navigate = useNavigate();
    const jwttoken = cookie.get("jwttoken");

    const { data, error, isFetching } = useGetMarketsQuery({
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

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
            }}
        >
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
                <SelectDesktop2 size="small">
                    <InputLabel id="demo-simple-select-label">
                        Города
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Города"
                    >
                        <MenuItem value="1">Якутск</MenuItem>
                    </Select>
                </SelectDesktop2>
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
                        jwttoken
                            ? navigate(ROUTES.ADMIN)
                            : navigate(ROUTES.LOGIN);
                    }}
                >
                    Перейти в админку
                </ButtonAdmin>
            </Space>
            <Grid sx={{ mt: 5 }} container spacing={2}>
                {isFetching
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
                              <CompanyCard {...item} type="anonim" />
                          </Grid>
                      ))}
            </Grid>
            <BoxPagination>
                <Pagination
                    count={countNumber}
                    page={currentPage}
                    onChange={(event, value) => {
                        setCurrentPage(value);
                    }}
                />
                <ButtonLink
                    variant="contained"
                    onClick={() =>
                        window.location.assign(
                            "https://infograph.venngage.com/ps/KajxMrn5Bxo/vetrina-roadmap"
                        )
                    }
                >
                    Наш план
                </ButtonLink>
            </BoxPagination>
        </Box>
    );
};

export default Home;

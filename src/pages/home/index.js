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

import { useGetMarketsQuery } from "../../service/CompanyService";
import { useGetTagsListQuery } from "../../service/TagsService";
import { CompanyCard, SkeletonVersion } from "../../components";

const Img = styled("img")(({ theme }) => ({
    width: 500,
    height: 80,
    margin: "0 auto",
}));

const SelectDesktop = styled(FormControl)(({ theme }) => ({
    width: 250,
    background: "white",
}));

const Space = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    marginTop: 50,
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

const Home = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [sort, setSort] = useState("");
    const [filterName, setFilterName] = useState("");
    const [postFilterName, setPostFilterName] = useState("");

    const { data, error, isFetching } = useGetMarketsQuery({
        sort,
        filterName: postFilterName,
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
                        label="Сортировка"
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
                <ButtonGroup>
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
                </ButtonGroup>
            </Space>
            <Grid sx={{ mt: 5, width: "100%" }} container spacing={2}>
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
                              <CompanyCard {...item} />
                          </Grid>
                      ))}
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

export default Home;

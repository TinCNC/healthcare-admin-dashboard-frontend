import React, { useState, useEffect } from "react";
import { useTranslate, useList, GetListResponse } from "@refinedev/core";
import {
  Box,
  Grid,
  Divider,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Pagination,
  FormControl,
  Autocomplete,
  TextField,
  Chip,
} from "@mui/material";

import { List } from "components/crud/list-gridview";

import { IDoctor, IHospital } from "interfaces";

import { DoctorCard } from "../../components/doctor-card";

import { Search } from "@mui/icons-material";
import { useDataGrid } from "@refinedev/mui";

export const DoctorList: React.FC = () => {
  const t = useTranslate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [doctorListResponse, setDoctorListResponse] =
    useState<GetListResponse<IDoctor>>();

  // const [userNameSearch, setUserNameSearch] = useState<string>("");

  const [nameSearch, setNameSearch] = useState<string>("");

  // const [firstNameSearch, setFirstNameSearch] = useState<string>("");

  // const [lastNameSearch, setLastNameSearch] = useState<string>("");

  const [current, setCurrent] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(0);
  // const [pageCount, setPageCount] = useState<number>(
  //   Math.ceil((doctorListResponse?.total || 0) / pageSize)
  // );
  const [pageSize, setPageSize] = useState<number>(5);

  const [selectHospitals, setSelectHospitals] = useState<IHospital[]>([]);

  // const hospitalsListQueryResult = useList<IHospital>({
  //   resource: "hospitals",
  // });

  const { dataGridProps: testDataGrid } = useDataGrid<IDoctor>({
    resource: "doctors",
    // pagination: {
    //   current,
    //   pageSize,
    // },
  });

  const { refetch: refetchDoctors, data: testingData } = useList<IDoctor>({
    resource: "doctors",
    // pagination: {
    //   current,
    //   pageSize,
    // },
    queryOptions: {
      enabled: false,
      onSuccess: (data) => {
        setIsLoading(false);
        if (data.total > 0) {
          setDoctorListResponse(data);
          setPageCount(Math.ceil(data.total / pageSize));
        }
      },
    },

    // pagination: { current: 1, pageSize: 10 },
    // filters: [
    //   { field: "full_name", operator: "contains", value: nameSearch },
    //   // { field: "username", operator: "contains", value: userNameSearch },
    //   // { field: "first_name", operator: "contains", value: firstNameSearch },
    //   // { field: "last_name", operator: "contains", value: lastNameSearch },
    // ],
  });

  console.log(testDataGrid);

  useEffect(() => {
    setIsLoading(true);
    setDoctorListResponse(undefined);
    refetchDoctors();
  }, [
    refetchDoctors,
    nameSearch,
    // userNameSearch,
    // firstNameSearch,
    // lastNameSearch,
    current,
  ]);

  function handlePageChange(page: number) {
    setCurrent(page);
    // throw new Error("Function not implemented.");
  }

  return (
    <Stack gap={1}>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          marginBottom: "10px",
          display: "flex",
          alignItems: "center",
          // width: 960,
        }}
      >
        <IconButton disabled type="button" sx={{ p: "10px" }} aria-label="menu">
          <Search />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Name"
          value={nameSearch}
          onChange={(
            event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => {
            setNameSearch(event.target.value);
          }}
          inputProps={{ "aria-label": "search name" }}
        />
        <Divider
          sx={{
            color: "text.secondary",
            borderColor: "text.secondary",
          }}
          orientation="vertical"
          flexItem
        />
        {/* <FormControl sx={{ minWidth: 320 }}>
          <Autocomplete
            multiple
            // id=""
            options={
              hospitalsListQueryResult.data !== undefined
                ? hospitalsListQueryResult?.data?.data?.map((item) => item)
                : ([] as IHospital[])
            }
            getOptionLabel={(option) => (option as IHospital).name ?? option}
            value={selectHospitals}
            onChange={(_event, value) => {
              setSelectHospitals(value as IHospital[]);
            }}
            // defaultValue={[top100Films[13].title]}
            freeSolo
            renderTags={(value: readonly IHospital[], getTagProps) =>
              value.map((option: IHospital, index: number) => (
                <Chip
                  variant="outlined"
                  label={option.name}
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Departments"
                placeholder="Departments"
              />
            )}
          />
        </FormControl> */}
        {/* <Divider
          sx={{
            color: "text.secondary",
            borderColor: "text.secondary",
          }}
          orientation="vertical"
          flexItem
        />
        <FormControl sx={{ minWidth: 320 }}>
          <Autocomplete
            multiple
            // id=""
            options={
              hospitalsListQueryResult.data !== undefined
                ? hospitalsListQueryResult?.data?.data?.map((item) => item)
                : ([] as IHospital[])
            }
            getOptionLabel={(option) => (option as IHospital).name ?? option}
            value={selectHospitals}
            onChange={(_event, value) => {
              setSelectHospitals(value as IHospital[]);
            }}
            // defaultValue={[top100Films[13].title]}
            freeSolo
            renderTags={(value: readonly IHospital[], getTagProps) =>
              value.map((option: IHospital, index: number) => (
                <Chip
                  variant="outlined"
                  label={option.name}
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Hospitals"
                placeholder="Hospitals"
              />
            )}
          />
        </FormControl>
        <FormControl sx={{ minWidth: 320 }}>
          <Autocomplete
            multiple
            // id=""
            options={
              hospitalsListQueryResult.data !== undefined
                ? hospitalsListQueryResult?.data?.data?.map((item) => item)
                : ([] as IHospital[])
            }
            getOptionLabel={(option) => (option as IHospital).name ?? option}
            value={selectHospitals}
            onChange={(_event, value) => {
              setSelectHospitals(value as IHospital[]);
            }}
            // defaultValue={[top100Films[13].title]}
            freeSolo
            renderTags={(value: readonly IHospital[], getTagProps) =>
              value.map((option: IHospital, index: number) => (
                <Chip
                  variant="outlined"
                  label={option.name}
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Order by"
                placeholder="Order by"
              />
            )}
          />
        </FormControl> */}
        {/* <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search First Name"
          value={firstNameSearch}
          onChange={(
            event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => {
            setFirstNameSearch(event.target.value);
          }}
          inputProps={{ "aria-label": "search first name" }}
        />
        <Divider
          sx={{
            color: "text.secondary",
            borderColor: "text.secondary",
          }}
          orientation="vertical"
          flexItem
        />
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Last Name"
          value={lastNameSearch}
          onChange={(
            event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => {
            setLastNameSearch(event.target.value);
          }}
          inputProps={{ "aria-label": "search last name" }}
        />
        <Divider
          sx={{
            color: "text.secondary",
            borderColor: "text.secondary",
          }}
          orientation="vertical"
          flexItem
        /> */}
        {/* <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
        <DirectionsIcon />
      </IconButton> */}
        {/* <FormControl sx={{ minWidth: 320 }}>
          <InputLabel>Select Hospitals</InputLabel>
          <Select
            sx={{ ml: 1, flex: 1 }}
            multiple
            variant="standard"
            value={selectHospitals}
            onChange={(
              event: SelectChangeEvent<number[]>,
              child: React.ReactNode
            ) => {
              setSelectHospitals(event.target.value as number[]);
            }}
            // onChange={(
            //   event: SelectChangeEvent<number>,
            //   child: React.ReactNode
            // ) => {
            //   setSelectServices(event.target.value);
            // }}
            // label="Select Author"
          >
            {hospitalsListQueryResult.data !== undefined &&
              hospitalsListQueryResult.data.total > 0 &&
              hospitalsListQueryResult.data.data.map((row, index) => (
                <MenuItem key={row.id} value={row.id}>
                  {row.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl> */}
      </Paper>
      <List
        wrapperProps={{ sx: { minHeight: "calc(100vh - 230px)" } }}
        loading={isLoading}
        loadingMsg={t("doctors.loading")}
      >
        {doctorListResponse !== undefined && doctorListResponse.total > 0 ? (
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 3, sm: 6, md: 9, lg: 12 }}
          >
            {doctorListResponse.data.map((row, index) => (
              <Grid item xs={3} sm={3} md={3} lg={3} key={index}>
                <DoctorCard data={row}></DoctorCard>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              verticalAlign: "middle",
              height: "calc(100vh - (340px))",
            }}
          >
            No Doctors Found
          </Box>
        )}
      </List>
      <Pagination
        count={pageCount}
        page={current}
        onChange={(event: React.ChangeEvent<unknown>, page: number) => {
          handlePageChange(page);
        }}
        variant="outlined"
        shape="rounded"
        showFirstButton
        showLastButton
      />
    </Stack>
  );
};

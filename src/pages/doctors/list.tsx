import React, { useState, useEffect } from "react";
import {
  useTranslate,
  // useMany,
  useList,
  GetListResponse,
} from "@pankod/refine-core";
import {
  // useDataGrid,
  // DataGrid,
  // GridColumns,
  List,
  Box,
  // Stack,
  // EditButton,
  // DeleteButton,
  Grid,
  CircularProgress,
  Typography,
  Divider,
  FormControl,
  IconButton,
  InputBase,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
} from "@pankod/refine-mui";

import { IDoctor } from "interfaces";

import { TrainerCard } from "../../components/doctor-card";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
  icon,
} from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used
import { Search } from "@mui/icons-material";

export const DoctorList: React.FC = () => {
  const t = useTranslate();

  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const [doctorListResponse, setDoctorListResponse] =
    useState<GetListResponse<IDoctor>>();

  const [userNameSearch, setUserNameSearch] = useState<string>("");

  const [firstNameSearch, setFirstNameSearch] = useState<string>("");

  const [lastNameSearch, setLastNameSearch] = useState<string>("");

  // const { dataGridProps } = useDataGrid<ITrainer>();

  const { refetch: refetchDoctors } = useList<IDoctor>({
    resource: "doctors",
    config: {
      filters: [
        { field: "username", operator: "contains", value: userNameSearch },
        { field: "first_name", operator: "contains", value: firstNameSearch },
        { field: "last_name", operator: "contains", value: lastNameSearch },
      ],
      // pagination: { current: 1, pageSize: 10 },
    },
    queryOptions: {
      enabled: false,
      onSuccess: (data) => {
        setIsLoading(false);
        if (data.total > 0) {
          setDoctorListResponse(data);
        }
      },
    },
  });

  useEffect(() => {
    // console.log(selectServices);
    setIsLoading(true);
    setDoctorListResponse(undefined);
    refetchDoctors();
    // setTrainerListResponse(undefined);
    // if (selectCountries !== undefined && selectCountries.length !== 0)
    //   refetchTrainersWithCountries();
    // // if (selectServices !== undefined && selectServices.length !== 0)
    // //   refetchTrainersWithService();
    // else refetchTrainers();
  }, [
    refetchDoctors,
    // refetchTrainersWithCountries,
    userNameSearch,
    firstNameSearch,
    lastNameSearch,
    // selectServices,
    // selectCountries,
  ]);

  // console.log(trainerListQueryResult);

  // console.log(trainerListQueryResult.data);

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
          placeholder="Search Username"
          value={userNameSearch}
          onChange={(
            event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => {
            setUserNameSearch(event.target.value);
          }}
          inputProps={{ "aria-label": "search username" }}
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
        />

        {/* <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
        <DirectionsIcon />
      </IconButton> */}
        {/* <FormControl sx={{ minWidth: 320 }}>
          <InputLabel>Select Clinics</InputLabel>
          <Select
            sx={{ ml: 1, flex: 1 }}
            multiple
            variant="standard"
            value={selectClinics}
            onChange={(
              event: SelectChangeEvent<number[]>,
              child: React.ReactNode
            ) => {
              setSelectClinics(event.target.value as number[]);
            }}
            // onChange={(
            //   event: SelectChangeEvent<number>,
            //   child: React.ReactNode
            // ) => {
            //   setSelectServices(event.target.value);
            // }}
            // label="Select Author"
          >
            {clinicsListQueryResult.data !== undefined &&
              clinicsListQueryResult.data.total > 0 &&
              clinicsListQueryResult.data.data.map((row, index) => (
                <MenuItem key={row.id} value={row.id}>
                  {row.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl> */}
      </Paper>
      <List
        title={
          <React.Fragment>
            <FontAwesomeIcon icon={solid("user-doctor")} />
            &nbsp;{t("doctors.titles.list")}
          </React.Fragment>
        }
        wrapperProps={{ sx: { minHeight: "calc(100vh - 230px)" } }}
      >
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              height: "calc(100vh - (340px))",
            }}
          >
            <CircularProgress />
            <Typography>{t("doctors.loading")}</Typography>
          </Box>
        ) : doctorListResponse !== undefined && doctorListResponse.total > 0 ? (
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 3, sm: 6, md: 9, lg: 12 }}
          >
            {doctorListResponse.data.map((row, index) => (
              <Grid item xs={3} sm={3} md={3} lg={3} key={index}>
                <TrainerCard data={row}></TrainerCard>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "calc(100vh - 112px)",
            }}
          >
            No Doctors Found
          </Box>
        )}
      </List>
    </Stack>
  );
};

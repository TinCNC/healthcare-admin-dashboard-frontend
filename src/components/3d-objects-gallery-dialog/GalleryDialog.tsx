import React from "react";

import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

import {
  // TextField,
  MobileStepper,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  // DialogContentText,
  DialogTitle,
  // TextFieldProps,
  // useAutocomplete,
  // Autocomplete,
  // Show,
  Box,
  Typography,
  Button,
  useTheme,
} from "@pankod/refine-mui";

import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

// import dayjs, { Dayjs } from "dayjs";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// import { LoadingButton } from "@mui/lab";

import {
  IMedicalSpeciality,
  IOrganization,
  IProfessionalCertificates,
  ITechnician,
} from "interfaces";
// import { AddCircleOutlineOutlined, CancelOutlined } from "@mui/icons-material";

// import {
//   Controller,
//   UseModalFormReturnType,
// } from "@pankod/refine-react-hook-form";
import { useTranslate } from "@pankod/refine-core";

export type DataProps = {
  loading?: boolean;
  // data?: IProfessionalCertificates;
  // creatorsData?: IOrganization[];
  // validatorsData?: ITechnician[];
  // specialitiesData?: IMedicalSpeciality[];
  visible: boolean;
  close: () => void;
};

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: "San Francisco – Oakland Bay Bridge, United States",
    imgPath:
      "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    label: "Bird",
    imgPath:
      "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    label: "Bali, Indonesia",
    imgPath:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250",
  },
  {
    label: "Goč, Serbia",
    imgPath:
      "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60",
  },
];

export const GalleryDialog: React.FC<DataProps> = ({
  loading,
  // data,
  // creatorsData,
  // validatorsData,
  // specialitiesData,
  visible,
  close,
}) => {
  // const {
  //   refineCore: { onFinish, formLoading },
  //   saveButtonProps,
  //   register,
  //   control,
  //   handleSubmit,
  //   getValues,
  //   formState: { errors },
  // } = useForm<
  //   IProfessionalCertificates,
  //   HttpError,
  //   IProfessionalCertificates & {
  //     creator: IOrganization;
  //     validator: ITechnician;
  //   }
  // >({
  //   refineCoreProps: {
  //     action: "create",
  //     resource: "professional_certificates",
  //     redirect: false,
  //     //   onMutationSuccess: {

  //     //   }
  //     // You can define all properties provided by refine useForm
  //   },
  // });
  const t = useTranslate();

  // const { autocompleteProps: autocompleteCreatorProps } =
  //   useAutocomplete<IOrganization>({
  //     resource: "organizations",
  //     onSearch: (value) => [
  //       {
  //         field: "name",
  //         operator: "containss",
  //         value,
  //       },
  //     ],
  //   });

  // const { autocompleteProps: autocompleteValidatorProps } =
  //   useAutocomplete<ITechnician>({
  //     resource: "technicians",
  //     onSearch: (value) => [
  //       {
  //         field: "username",
  //         operator: "containss",
  //         value,
  //       },
  //     ],
  //   });

  // const { autocompleteProps: autocompleteSpecialityProps } =
  //   useAutocomplete<IMedicalSpeciality>({
  //     resource: "medical_specialities",
  //     pagination: { current: 1, pageSize: 10000 },
  //     onSearch: (value) => [
  //       {
  //         field: "name",
  //         operator: "containss",
  //         value,
  //       },
  //     ],
  //   });

  // const [issuedDate, setIssuedDate] = React.useState<Dayjs | null>(dayjs());

  // const [expiredAt, setExpiredAt] = React.useState<Dayjs | null>(dayjs());

  // const submitButtonClick = (e: React.BaseSyntheticEvent<object, any, any>) => {
  //   console.log(getValues());
  //   saveButtonProps.onClick(e);
  // };

  // const validator = validatorsData?.find((item) => item.id === data?.validator);

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <div>
      <Dialog open={visible} onClose={close}>
        <DialogTitle>{t("3d_objects.titles.show_gallery")}</DialogTitle>
        <DialogContent>
          <Box sx={{ maxWidth: 500, flexGrow: 1 }}>
            <Paper
              square
              elevation={0}
              sx={{
                display: "flex",
                alignItems: "center",
                height: 50,
                pl: 2,
                bgcolor: "background.default",
              }}
            >
              <Typography>{images[activeStep].label}</Typography>
            </Paper>
            <AutoPlaySwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={activeStep}
              onChangeIndex={handleStepChange}
              enableMouseEvents
            >
              {images.map((step, index) => (
                <div key={step.label}>
                  {Math.abs(activeStep - index) <= 2 ? (
                    <Box
                      component="img"
                      sx={{
                        height: 320,
                        display: "block",
                        maxWidth: 500,
                        overflow: "hidden",
                        width: "100%",
                      }}
                      src={step.imgPath}
                      alt={step.label}
                    />
                  ) : null}
                </div>
              ))}
            </AutoPlaySwipeableViews>
            <MobileStepper
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              nextButton={
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={activeStep === maxSteps - 1}
                >
                  Next
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                  Back
                </Button>
              }
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

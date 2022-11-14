import React from "react";

import {
  // TextField,
  Dialog,
  DialogActions,
  DialogContent,
  // DialogContentText,
  DialogTitle,
  // TextFieldProps,
  // useAutocomplete,
  // Autocomplete,
  // Show,
  Typography,
  Button,
} from "@pankod/refine-mui";

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
  data?: IProfessionalCertificates;
  creatorsData?: IOrganization[];
  validatorsData?: ITechnician[];
  specialitiesData?: IMedicalSpeciality[];
  visible: boolean;
  close: () => void;
};

export const CertificateDetailDialog: React.FC<DataProps> = ({
  loading,
  data,
  creatorsData,
  validatorsData,
  specialitiesData,
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

  const validator = validatorsData?.find((item) => item.id === data?.validator);

  return (
    <div>
      <Dialog open={visible} onClose={close}>
        <DialogTitle>{t("professional_certificates.titles.show")}</DialogTitle>
        <DialogContent sx={{ minWidth: "500px", minHeight: "440px" }}>
          {/* <Show resource="professional_certificates" recordItemId={data?.id}> */}
          <Typography variant="body1" fontWeight="bold">
            {t("professional_certificates.fields.name")}
          </Typography>
          <Typography variant="body2">{data?.name}</Typography>

          <Typography variant="body1" fontWeight="bold">
            {t("professional_certificates.fields.program")}
          </Typography>
          <Typography variant="body2">{data?.program}</Typography>

          <Typography variant="body1" fontWeight="bold">
            {t("professional_certificates.fields.level")}
          </Typography>
          <Typography variant="body2">{data?.level}</Typography>

          <Typography variant="body1" fontWeight="bold">
            {t("professional_certificates.fields.description")}
          </Typography>
          <Typography variant="body2">{data?.description}</Typography>

          <Typography variant="body1" fontWeight="bold">
            {t("professional_certificates.fields.type")}
          </Typography>
          <Typography variant="body2">{data?.type}</Typography>

          <Typography variant="body1" fontWeight="bold">
            {t("professional_certificates.fields.creator")}
          </Typography>
          <Typography variant="body2">
            {creatorsData?.find((item) => item.id === data?.creator)?.name}
          </Typography>

          <Typography variant="body1" fontWeight="bold">
            {t("professional_certificates.fields.validator")}
          </Typography>
          <Typography variant="body2">
            {validator?.first_name + " " + validator?.last_name}
          </Typography>

          <Typography variant="body1" fontWeight="bold">
            {t("professional_certificates.fields.speciality")}
          </Typography>
          <Typography variant="body2">
            {
              specialitiesData?.find((item) => item.id === data?.speciality)
                ?.name
            }
          </Typography>

          <Typography variant="body1" fontWeight="bold">
            {t("professional_certificates.fields.issued_date")}
          </Typography>
          <Typography variant="body2">{data?.issued_date}</Typography>

          <Typography variant="body1" fontWeight="bold">
            {t("professional_certificates.fields.expired_at")}
          </Typography>
          <Typography variant="body2">{data?.expired_at}</Typography>

          {/* </Show> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

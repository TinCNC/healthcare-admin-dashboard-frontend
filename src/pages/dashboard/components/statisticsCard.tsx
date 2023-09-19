import { YourDiseasesStatisticsChart } from "@/components/your-deseases-statistics-chart";
import {
  Paper,
  Typography,
  SvgIcon,
  FormControl,
  MenuItem,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useTranslate } from "@refinedev/core";
import { StyledSelect } from "@/components/styled-components";

export const StatisticsCard: React.FC = () => {
  const t = useTranslate();
  const feverIcon = (
    <svg viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.8763 6.6509L5.8763 6.5161C5.8764 3.45163 8.36031 0.96815 11.4251 0.968249C14.4902 0.968348 16.9736 3.45147 16.9735 6.51705C16.9735 7.7315 16.6932 8.63894 16.0781 9.86916C16.0375 9.95052 15.8254 10.3682 15.7689 10.4819C15.6601 10.7016 15.5799 10.8758 15.5135 11.0403C15.3592 11.4223 15.2847 11.7445 15.2847 12.0658C15.2847 12.733 15.4508 13.4185 15.7293 14.08C15.8276 14.3135 15.9329 14.5267 16.0376 14.7144C16.099 14.8243 16.1451 14.8994 16.1685 14.9344C16.3433 15.1967 16.224 15.5534 15.9264 15.6575L11.1013 17.346C10.8472 17.435 10.5695 17.2986 10.4842 17.0432L9.62927 14.4781L7.80421 14.4781C6.7391 14.478 5.87586 13.615 5.87589 12.5497L5.87595 10.8594L5.15367 10.8594C4.53424 10.8593 4.17371 10.2988 4.43635 9.7363L5.8763 6.6509ZM12.2953 5.5519C13.0947 5.55193 13.7429 4.90393 13.7429 4.10452C13.7429 3.57518 13.3607 3.00185 12.6274 2.30679C12.4412 2.13045 12.1496 2.13044 11.9635 2.30677C11.2301 3.00181 10.8479 3.57508 10.8479 4.10443C10.8479 4.90384 11.4959 5.55188 12.2953 5.5519ZM13.9839 8.92958C14.7833 8.92961 15.4314 8.2815 15.4314 7.48208C15.4314 6.95274 15.0494 6.37953 14.3159 5.68447C14.1298 5.50801 13.8382 5.508 13.6522 5.68445C12.9187 6.37949 12.5366 6.95265 12.5365 7.48199C12.5365 8.2814 13.1845 8.92956 13.9839 8.92958ZM0.956621 4.99876L0.956704 2.41536C0.95673 1.61595 1.60489 0.96795 2.4043 0.967975C3.20371 0.968001 3.8517 1.61604 3.85168 2.41545L3.85159 4.99885C4.15882 5.34685 4.33413 5.79748 4.33412 6.27545C4.33408 7.34138 3.46999 8.20541 2.40406 8.20538C1.33813 8.20534 0.474099 7.34125 0.474133 6.27532C0.474148 5.79736 0.649357 5.34673 0.956621 4.99876ZM1.9216 5.19652C1.92159 5.33373 1.86323 5.46452 1.76092 5.55605C1.55723 5.73833 1.43914 5.99671 1.43913 6.27536C1.43911 6.80836 1.87107 7.24035 2.40408 7.24037C2.93697 7.24039 3.36908 6.80843 3.36909 6.27542C3.3691 5.99678 3.25102 5.73839 3.04735 5.55609C2.94505 5.46454 2.88658 5.33375 2.88659 5.19655L2.88668 2.41542C2.88668 2.14902 2.67065 1.93297 2.40424 1.93296C2.13773 1.93295 1.92167 2.14899 1.92166 2.41539L1.9216 5.19652ZM11.9731 3.7438C12.0535 3.62319 12.161 3.48908 12.2953 3.34262C12.4298 3.4891 12.5372 3.62321 12.6177 3.74382C12.7303 3.91272 12.7779 4.03665 12.7779 4.10449C12.7779 4.371 12.5618 4.58705 12.2953 4.58704C12.0289 4.58703 11.8128 4.37098 11.8128 4.10446C11.8129 4.0366 11.8605 3.91268 11.9731 3.7438L11.9731 3.7438ZM13.6617 7.12118C13.7422 7.00057 13.8496 6.86647 13.984 6.72001C14.1183 6.86648 14.2259 7.0006 14.3062 7.1212C14.4189 7.29022 14.4665 7.41415 14.4665 7.48188C14.4665 7.74839 14.2504 7.96444 13.9839 7.96443C13.7174 7.96442 13.5015 7.74837 13.5015 7.48185C13.5015 7.4141 13.549 7.29018 13.6617 7.12118L13.6617 7.12118Z"
        fill="#56CCF2"
      />
    </svg>
  );

  const coughIcon = (
    <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.95466 17.0925L14.4545 17.0926C14.7581 17.0926 15.0045 16.8468 15.0045 16.5427L15.0046 13.2884C15.0051 13.2884 15.0272 12.9187 15.0503 12.7929C15.0767 12.6527 15.0877 12.5949 15.1817 12.3529C15.3951 11.8277 15.9705 10.412 16.2472 9.90331C16.6932 9.07505 17.2047 7.95804 17.2047 6.64305C17.2048 3.30734 14.4907 0.593174 11.1551 0.593066C7.81949 0.592959 5.10523 3.30704 5.10512 6.64266C5.10511 6.98148 5.1337 7.32021 5.18918 7.6535L4.07319 9.67733C3.97915 9.84784 3.98246 10.0552 4.0814 10.2224C4.18046 10.3896 4.36031 10.4925 4.555 10.4925L5.10498 10.4925L5.10496 11.0425C5.10495 11.2949 5.27706 11.5144 5.52186 11.5761L7.18823 11.993C7.2366 12.0051 7.30485 12.0931 7.30485 12.1426C7.30485 12.192 7.23659 12.2801 7.18883 12.2916C7.16845 12.2971 7.14869 12.3031 7.12941 12.3102L6.013 12.7271C5.7973 12.8074 5.65488 13.0132 5.65487 13.2425L5.65483 14.3424C5.65482 14.6465 5.90071 14.8924 6.2048 14.8924L8.40472 14.8925L8.40467 16.5424C8.40466 16.8465 8.65103 17.0924 8.95463 17.0924L8.95466 17.0925Z"
        fill="#FFA600"
      />
      <path
        d="M0.705471 10.4925C0.705461 10.7962 0.951716 11.0424 1.25543 11.0424C1.55915 11.0425 1.80542 10.7962 1.80543 10.4925C1.80544 10.1888 1.55919 9.9425 1.25547 9.94249C0.951751 9.94248 0.70548 10.1887 0.705471 10.4925Z"
        fill="#FFA600"
      />
      <path
        d="M2.35522 11.0424C2.35521 11.3461 2.60147 11.5924 2.90518 11.5924C3.2089 11.5924 3.45517 11.3461 3.45518 11.0424C3.45519 10.7387 3.20894 10.4924 2.90522 10.4924C2.6015 10.4924 2.35523 10.7387 2.35522 11.0424Z"
        fill="#FFA600"
      />
      <path
        d="M2.35481 13.2425C2.3548 13.5462 2.60105 13.7924 2.90477 13.7924C3.20849 13.7925 3.45476 13.5462 3.45477 13.2425C3.45478 12.9388 3.20853 12.6925 2.90481 12.6925C2.60109 12.6925 2.35482 12.9387 2.35481 13.2425Z"
        fill="#FFA600"
      />
      <path
        d="M4.00541 12.1425C4.0054 12.4462 4.25166 12.6925 4.55538 12.6925C4.85909 12.6925 5.10536 12.4462 5.10537 12.1425C5.10538 11.8388 4.85913 11.5925 4.55541 11.5925C4.25169 11.5925 4.00542 11.8388 4.00541 12.1425Z"
        fill="#FFA600"
      />
      <path
        d="M0.705471 12.1424C0.705461 12.4461 0.951716 12.6923 1.25543 12.6924C1.55915 12.6924 1.80542 12.4461 1.80543 12.1424C1.80544 11.8387 1.55919 11.5924 1.25547 11.5924C0.951751 11.5924 0.70548 11.8386 0.705471 12.1424Z"
        fill="#FFA600"
      />
      <path
        d="M0.705043 13.7923C0.705034 14.096 0.951288 14.3422 1.25501 14.3423C1.55873 14.3423 1.805 14.096 1.80501 13.7923C1.80502 13.4886 1.55876 13.2423 1.25504 13.2423C0.951324 13.2423 0.705053 13.4885 0.705043 13.7923Z"
        fill="#FFA600"
      />
    </svg>
  );

  const heartBurnIcon = (
    <svg viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.17592 8.31519L7.13492 8.31525C7.30681 8.31525 7.47858 8.14337 7.47859 7.97161L7.47866 5.77202C7.47869 4.70663 8.33793 3.81305 9.36905 3.81308C9.54094 3.81309 9.71271 3.6756 9.71271 3.46944L9.71277 1.71649C9.71278 1.51032 9.54089 1.37283 9.36913 1.37283L9.05987 1.37282C6.75709 1.37274 4.83249 3.29741 4.83241 5.66874L4.83234 7.9714C4.83233 8.14329 5.00422 8.31518 5.17598 8.31519L5.17592 8.31519Z"
        fill="#FF5630"
      />
      <path
        d="M5.1075 0.375986C5.10751 0.204095 4.97002 0.0323275 4.76386 0.0323208L2.94223 0.0322621C2.83915 0.0322587 2.73606 0.0666576 2.66738 0.13534C2.63297 0.204144 2.59857 0.272827 2.59856 0.375911L2.59847 3.2972C2.1173 3.70964 1.8423 4.36257 1.84228 5.05L1.84227 5.11868C2.42652 4.80945 3.18266 4.56877 4.07628 4.39702C4.17937 4.39702 4.28245 4.36262 4.35126 4.36263C4.52317 3.744 4.76375 3.19417 5.14184 2.7129L5.1418 0.375969L5.1075 0.375986Z"
        fill="#FF5630"
      />
      <path
        d="M2.7704 14.8452L2.77044 13.7797C2.77044 13.6766 2.80485 13.5735 2.90794 13.5047L3.62969 12.9548L3.21734 9.96467C3.18294 9.7585 3.32043 9.58662 3.49232 9.58663C3.66422 9.55223 3.87037 9.68973 3.87037 9.89589L4.31702 13.0578C4.35142 13.1953 4.28261 13.2984 4.17952 13.3671L3.45777 13.9516L3.45772 15.4295C4.31691 16.1168 5.24478 16.5293 6.06972 16.5294C6.24161 16.5294 6.37897 16.5294 6.51648 16.495C6.92893 16.4263 7.27262 16.2544 7.65069 16.0482L6.9977 14.536C6.9633 14.5016 6.9633 14.4329 6.9633 14.3985L6.96335 12.8862L5.86374 11.0647C5.76066 10.8928 5.82935 10.6867 5.96685 10.5836C6.13874 10.4805 6.3449 10.5492 6.448 10.6867L7.58213 12.5426C7.61653 12.6113 7.65081 12.6457 7.65081 12.7145L7.65076 14.261L8.20068 15.567C9.64417 14.2267 10.4348 11.6834 9.9537 9.24325C9.71317 7.90288 9.09457 6.80306 8.20098 6.0813L8.20092 7.97162C8.2009 8.52158 7.71973 9.00273 7.16977 9.00271L5.17637 9.00252C4.62641 9.00251 4.14527 8.52133 4.14529 7.97137L4.14536 5.66872C4.14537 5.46254 4.14537 5.25626 4.17978 5.08448L4.1455 5.08448C0.98358 5.70301 -0.391214 7.42139 0.124224 10.1709C0.433548 11.8549 1.49888 13.6078 2.77051 14.8451L2.7704 14.8452Z"
        fill="#FF5630"
      />
      <path
        d="M16.1739 10.309L15.4866 10.309L14.7305 7.38766C14.6961 7.21577 14.5587 7.11268 14.3869 7.11267C14.215 7.11267 14.0776 7.25015 14.0776 7.38764L13.3902 11.2713L12.9778 9.8278C12.9434 9.69031 12.8403 9.58722 12.7028 9.58721C12.5653 9.55281 12.4278 9.62161 12.3592 9.75909L11.6374 10.9275L10.9844 8.76233C10.95 8.62484 10.8125 8.52175 10.6752 8.52175C10.6065 8.52175 10.5377 8.52175 10.5033 8.55615C10.572 8.76232 10.6064 8.9342 10.6408 9.14039C10.7094 9.58715 10.7782 10.034 10.7782 10.4808L11.2249 11.8899C11.2593 12.0274 11.3624 12.1305 11.4999 12.1305C11.6374 12.1649 11.7749 12.0961 11.8435 11.9586L12.5309 10.7902L13.1494 12.9211C13.1838 13.0586 13.3213 13.1617 13.4931 13.1617L13.5275 13.1617C13.6994 13.1617 13.8368 13.0242 13.8368 12.8867L14.4899 9.10621L14.9366 10.756C14.971 10.8935 15.1085 11.0309 15.2803 11.031L16.1739 11.0309C16.3801 11.0309 16.5175 10.8934 16.5175 10.6872C16.5175 10.4465 16.3801 10.309 16.1739 10.309L16.1739 10.309Z"
        fill="#FF5630"
      />
    </svg>
  );

  const data = [
    {
      name: "Jan",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Feb",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Mar",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Apr",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "May",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Jun",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Jul",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
    {
      name: "Aug",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
    {
      name: "Sep",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
    {
      name: "Oct",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
    {
      name: "Nov",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
    {
      name: "Dec",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <Paper sx={{ padding: "1rem 2rem" }}>
      <Stack gap={1} direction="row" justifyContent="space-between">
        <Stack gap={1} direction="row" alignSelf="end">
          <Typography fontWeight="bold" variant="body1">
            {t("dashboard.statistics_of_your_diseases.title")}
          </Typography>
        </Stack>
        <Stack gap={10} direction="row">
          <Stack>
            <SvgIcon sx={{ fontSize: "28px" }} color="primary">
              {feverIcon}
            </SvgIcon>
            <Typography variant="body2" fontSize="12px">
              {t("dashboard.statistics_of_your_diseases.fever")}
            </Typography>
          </Stack>
          <Stack>
            <SvgIcon sx={{ fontSize: "28px" }} color="primary">
              {coughIcon}
            </SvgIcon>
            <Typography variant="body2" fontSize="12px">
              {t("dashboard.statistics_of_your_diseases.cough")}
            </Typography>
          </Stack>
          <Stack alignItems="center">
            <SvgIcon sx={{ fontSize: "28px" }} color="primary">
              {heartBurnIcon}
            </SvgIcon>
            <Typography variant="body2" fontSize="12px">
              {t("dashboard.statistics_of_your_diseases.heart_burn")}
            </Typography>
          </Stack>
        </Stack>
        <Stack gap={1} width="80px" alignSelf="center">
          <FormControl fullWidth size="small">
            {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
            <StyledSelect
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              sx={{
                borderRadius: "10px",
                fontSize: "12px",
                // padding: "0px",
              }}
              defaultValue="Month"
              // value={age}
              // label="Age"
              // onChange={handleChange}
            >
              <MenuItem value="Week">
                {t("dashboard.statistics_of_your_diseases.week")}
              </MenuItem>
              <MenuItem value="Month">
                {t("dashboard.statistics_of_your_diseases.month")}
              </MenuItem>
              <MenuItem value="Year">
                {t("dashboard.statistics_of_your_diseases.year")}
              </MenuItem>
            </StyledSelect>
          </FormControl>
        </Stack>
      </Stack>
      <Stack gap={1}>
        <YourDiseasesStatisticsChart data={data}></YourDiseasesStatisticsChart>
      </Stack>
    </Paper>
  );
};
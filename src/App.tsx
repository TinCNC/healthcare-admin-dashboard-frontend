// import React from "react";

import { Refine } from "@pankod/refine-core";
import {
  notificationProvider,
  RefineSnackbarProvider,
  CssBaseline,
  GlobalStyles,
  ReadyPage,
  ErrorComponent,
  AuthPage,
} from "@pankod/refine-mui";

import routerProvider from "@pankod/refine-react-router-v6";
import { dataProvider, liveProvider } from "@pankod/refine-supabase";
import { RefineKbarProvider } from "@pankod/refine-kbar";
import { useTranslation } from "react-i18next";
import { ColorModeContextProvider } from "contexts";
import { supabaseClient } from "utility";
import { Title, Sider, Layout, Header } from "components/layout";
import { OffLayoutArea } from "components/offLayoutArea";
import authProvider from "./authProvider";

// import { Wallet } from "pages/payment-solana";

import {
  PatientList,
  PatientCreate,
  PatientEdit,
  PatientShow,
} from "pages/patients";
import {
  ProductList,
  ProductShow,
  ProductCreate,
  ProductEdit,
} from "pages/products";
import {
  TechnicianList,
  TechnicianCreate,
  TechnicianEdit,
  TechnicianShow,
} from "pages/technicians";
import { CategoriesList } from "pages/categories";
import {
  DoctorList,
  DoctorShow,
  DoctorCreate,
  DoctorEdit,
} from "pages/doctors";
import { _3DObjectList, _3DObjectShow } from "pages/3d_objects";
import {
  DiseaseList,
  DiseaseShow,
  DiseaseEdit,
  DiseaseCreate,
} from "pages/diseases";

import {
  DiseaseGroupList,
  DiseaseGroupShow,
  DiseaseGroupEdit,
  // DiseaseGroupCreate,
} from "pages/diseases_groups";

import { ClinicList, ClinicCreate, ClinicEdit } from "pages/clinics";

import {
  DepartmentList,
  DepartmentCreate,
  DepartmentEdit,
} from "pages/departments";

import {
  SpecialityList,
  SpecialityCreate,
  SpecialityEdit,
  SpecialityShow,
} from "pages/specialities";

import {
  OrganizationList,
  OrganizationCreate,
  OrganizationEdit,
} from "pages/organizations";

import {
  LaboratoryList,
  LaboratoryShow,
  LaboratoryEdit,
  LaboratoryCreate,
} from "pages/laboratories";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  // regular,
  // brands,
  // icon,
} from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used

import { Category } from "@mui/icons-material";

function App() {
  const { t, i18n } = useTranslation();

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <ColorModeContextProvider>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <RefineSnackbarProvider>
        <RefineKbarProvider>
          <Refine
            notificationProvider={notificationProvider}
            ReadyPage={ReadyPage}
            catchAll={<ErrorComponent />}
            dataProvider={dataProvider(supabaseClient)}
            liveProvider={liveProvider(supabaseClient)}
            authProvider={authProvider}
            routerProvider={{
              ...routerProvider,
              routes: [
                {
                  path: "/register",
                  element: <AuthPage type="register" />,
                },
                {
                  path: "/forgot-password",
                  element: <AuthPage type="forgotPassword" />,
                },
                {
                  path: "/update-password",
                  element: <AuthPage type="updatePassword" />,
                },
              ],
            }}
            LoginPage={() => (
              <AuthPage
                type="login"
                providers={[
                  {
                    name: "google",
                    label: "Sign in with Google",
                  },
                ]}
                formProps={{
                  defaultValues: {
                    email: "info@refine.dev",
                    password: "refine-supabase",
                  },
                }}
              />
            )}
            resources={[
              // {
              //   name: "SolanaPayment",
              //   list: Wallet,
              //   icon: <FontAwesomeIcon icon={solid("wallet")} />,
              // },
              {
                name: "departments",
                list: DepartmentList,
                create: DepartmentCreate,
                edit: DepartmentEdit,
                icon: <FontAwesomeIcon icon={solid("sitemap")} />,
              },
              {
                name: "laboratories",
                list: LaboratoryList,
                show: LaboratoryShow,
                create: LaboratoryCreate,
                edit: LaboratoryEdit,
                icon: <FontAwesomeIcon icon={solid("flask-vial")} />,
              },
              {
                name: "medical_specialities",
                list: SpecialityList,
                show: SpecialityShow,
                create: SpecialityCreate,
                edit: SpecialityEdit,
                icon: <FontAwesomeIcon icon={solid("sitemap")} />,
              },
              {
                name: "organizations",
                list: OrganizationList,
                create: OrganizationCreate,
                edit: OrganizationEdit,
                icon: <FontAwesomeIcon icon={solid("building")} />,
              },
              {
                name: "Diseases",
                icon: <FontAwesomeIcon icon={solid("disease")} />,
              },
              {
                name: "diseases",
                parentName: "Diseases",
                list: DiseaseList,
                show: DiseaseShow,
                create: DiseaseCreate,
                edit: DiseaseEdit,
                icon: <FontAwesomeIcon icon={solid("disease")} />,
              },
              {
                name: "diseases_groups",
                parentName: "Diseases",
                list: DiseaseGroupList,
                show: DiseaseGroupShow,
                // create: DiseaseGroupCreate,
                edit: DiseaseGroupEdit,
                icon: <FontAwesomeIcon icon={solid("viruses")} />,
              },
              {
                name: "clinics",
                list: ClinicList,
                create: ClinicCreate,
                edit: ClinicEdit,
                icon: <FontAwesomeIcon icon={solid("hospital")} />,
              },
              {
                name: "doctors",
                list: DoctorList,
                show: DoctorShow,
                create: DoctorCreate,
                edit: DoctorEdit,
                icon: <FontAwesomeIcon icon={solid("user-doctor")} />,
              },
              {
                name: "patients",
                list: PatientList,
                create: PatientCreate,
                edit: PatientEdit,
                show: PatientShow,
                icon: <FontAwesomeIcon icon={solid("hospital-user")} />,
              },
              {
                name: "technicians",
                list: TechnicianList,
                create: TechnicianCreate,
                edit: TechnicianEdit,
                show: TechnicianShow,
                icon: <FontAwesomeIcon icon={solid("user-secret")} />,
              },
              // {
              //   name: "implants",
              //   list: PatientList,
              //   // create: PostCreate,
              //   // edit: PostEdit,
              //   icon: <FontAwesomeIcon icon={solid("teeth")} />,
              // },
              {
                name: "Prosthetics",
                icon: <FontAwesomeIcon icon={solid("bone")} />,
              },
              {
                // name: "prosthetics",
                name: "3d_objects",
                parentName: "Prosthetics",
                list: _3DObjectList,
                show: _3DObjectShow,
                // create: _3DObjectCreate,
                // edit: _3DObjectEdit,
                icon: <FontAwesomeIcon icon={solid("cubes")} />,
              },
              {
                // name: "prosthetics",
                name: "products",
                parentName: "Prosthetics",
                list: ProductList,
                show: ProductShow,
                create: ProductCreate,
                edit: ProductEdit,
                icon: <FontAwesomeIcon icon={solid("bone")} />,
              },
              {
                name: "categories",
                parentName: "Prosthetics",
                list: CategoriesList,
                // create: CategoriesCreate,
                // edit: CategoriesEdit,
                icon: <Category />,
              },
            ]}
            Title={Title}
            Sider={Sider}
            Layout={Layout}
            Header={Header}
            OffLayoutArea={OffLayoutArea}
            i18nProvider={i18nProvider}
          />
        </RefineKbarProvider>
      </RefineSnackbarProvider>
    </ColorModeContextProvider>
  );
}

export default App;

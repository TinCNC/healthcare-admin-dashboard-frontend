import React from "react";

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

import { PatientList, PatientCreate, PatientEdit } from "pages/patients";
import { CategoriesList } from "pages/categories";

import { DoctorList, DoctorShow } from "pages/doctors";

import { DiseaseList, DiseaseShow } from "pages/diseases";

import { DiseaseGroupList, DiseaseGroupShow } from "pages/diseases_groups";

import { ClinicList, ClinicCreate, ClinicEdit } from "pages/clinics";

import { DepartmentList } from "pages/departments";

import {
  OrganizationList,
  OrganizationCreate,
  OrganizationEdit,
} from "pages/organizations";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
  icon,
} from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used

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
              {
                name: "departments",
                list: DepartmentList,
                // create: PostCreate,
                // edit: PostEdit,
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
                name: "diseases",
                list: DiseaseList,
                show: DiseaseShow,
                // create: PostCreate,
                // edit: PostEdit,
                icon: <FontAwesomeIcon icon={solid("disease")} />,
              },
              {
                name: "diseases_groups",
                list: DiseaseGroupList,
                show: DiseaseGroupShow,
                // create: PostCreate,
                // edit: PostEdit,
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
                // create: DoctorCreate,
                // edit: PostEdit,
                icon: <FontAwesomeIcon icon={solid("user-doctor")} />,
              },
              {
                name: "patients",
                list: PatientList,
                create: PatientCreate,
                edit: PatientEdit,
                icon: <FontAwesomeIcon icon={solid("hospital-user")} />,
              },
              {
                name: "implants",
                list: PatientList,
                // create: PostCreate,
                // edit: PostEdit,
              },
              {
                name: "prosthetics",
                list: PatientList,
                // create: PostCreate,
                // edit: PostEdit,
              },
              {
                name: "categories",
                list: CategoriesList,
                // create: PostCreate,
                // edit: PostEdit,
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

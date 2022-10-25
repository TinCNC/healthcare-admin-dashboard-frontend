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

import { PatientList } from "pages/patients";
import { CategoriesList } from "pages/categories";

import { DoctorList, DoctorShow } from "pages/doctors";

import { DepartmentList } from "pages/departments";

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
              },
              {
                name: "clinics",
                list: PatientList,
                // create: PostCreate,
                // edit: PostEdit,
              },
              {
                name: "doctors",
                list: DoctorList,
                show: DoctorShow,
                // create: DoctorCreate,
                // edit: PostEdit,
              },
              {
                name: "patients",
                list: PatientList,
                // create: PostCreate,
                // edit: PostEdit,
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

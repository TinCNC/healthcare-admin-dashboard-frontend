import { Refine, Authenticated, CanAccess } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  notificationProvider,
  RefineSnackbarProvider,
} from "@refinedev/mui";

import { AuthPage } from "./components/pages/auth";

import { newEnforcer } from "casbin";

import { model, adapter } from "./accessControl";

import { ThemedLayoutV2 } from "./components/themedLayoutV2";

import dataProvider from "@refinedev/simple-rest";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import routerBindings, {
  NavigateToResource,
  CatchAllNavigate,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { useTranslation } from "react-i18next";
// import {
//   BlogPostList,
//   BlogPostCreate,
//   BlogPostEdit,
//   BlogPostShow,
// } from "pages/blog-posts";
// import {
//   CategoryList,
//   CategoryCreate,
//   CategoryEdit,
//   CategoryShow,
// } from "pages/categories";

import {
  PatientList,
  PatientCreate,
  PatientEdit,
  PatientShow,
} from "@/pages/patients";
import {
  ProductList,
  ProductShow,
  ProductCreate,
  ProductEdit,
} from "@/pages/products";
import {
  TechnicianList,
  TechnicianCreate,
  TechnicianEdit,
  TechnicianShow,
} from "@/pages/technicians";
import { CategoriesList } from "@/pages/categories";
import {
  DoctorList,
  DoctorShow,
  DoctorCreate,
  DoctorEdit,
} from "@/pages/doctors";
import { _3DObjectList, _3DObjectShow } from "@/pages/3d_objects";
import {
  DiseaseList,
  DiseaseShow,
  DiseaseEdit,
  DiseaseCreate,
} from "@/pages/diseases";

import {
  DiseaseGroupList,
  DiseaseGroupShow,
  DiseaseGroupEdit,
  // DiseaseGroupCreate,
} from "@/pages/diseases_groups";

import { HospitalList, HospitalCreate, HospitalEdit } from "@/pages/hospitals";

import {
  DepartmentList,
  DepartmentCreate,
  DepartmentEdit,
} from "@/pages/departments";

import {
  SpecialityList,
  SpecialityCreate,
  SpecialityEdit,
  SpecialityShow,
} from "@/pages/specialities";

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
} from "@/pages/laboratories";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faSitemap,
  faFlaskVial,
  faHospital,
  faBuilding,
  faDisease,
  faViruses,
  faUserDoctor,
  faHospitalUser,
  faUserSecret,
  faBone,
  faCubes,
  faMedkit,
  faTemperatureFull,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";

import { Category, Equalizer, Google, GridView } from "@mui/icons-material";
import { OrderList } from "@/pages/order";
import { ColorModeContextProvider } from "./contexts/color-mode";
// import { Header } from "./components/header";
// import authProvider from "./authProvider";
import { SolanaProvider } from "@/components/payment-solana";
import { ForbiddenComponent } from "@/components/pages/forbidden";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MedicineEdit, MedicineList, MedicineShow } from "./pages/medicines";
import { PatientRecord } from "./pages/patients/patient_record";
import { InterpolationMap, TOptionsBase } from "i18next";
import { $Dictionary } from "i18next/typescript/helpers";
import { DashboardPage } from "@/pages/dashboard";
import { ChemistList } from "./pages/chemists";
import { StatisticList } from "./pages/statistics";

function App() {
  const { t, i18n } = useTranslation();

  // const [role, setRole] = useState("guest");

  const i18nProvider = {
    translate: (
      key: string | TemplateStringsArray | (string | TemplateStringsArray)[],
      params?: TOptionsBase & $Dictionary & InterpolationMap<unknown>
    ) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  // const role = localStorage.getItem("role") ?? "unauthenticated";

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <SolanaProvider>
        <BrowserRouter>
          <RefineKbarProvider>
            <ColorModeContextProvider>
              <CssBaseline />
              <GlobalStyles
                styles={{ html: { WebkitFontSmoothing: "auto" } }}
              />
              <RefineSnackbarProvider>
                <Refine
                  // accessControlProvider={{
                  //   can: async ({ resource, action }) => {
                  //     // console.log(resource + " + " + action);
                  //     // console.log(
                  //     //   localStorage.getItem("role") ?? "unauthenticated"
                  //     // );
                  //     const enforcer = await newEnforcer(model, adapter);
                  //     const can = await enforcer.enforce(
                  //       localStorage.getItem("role") ?? "unauthenticated",
                  //       resource,
                  //       action
                  //     );
                  //     return { can };
                  //   },
                  // }}
                  // dataProvider={dataProvider(supabaseClient)}
                  dataProvider={dataProvider("http://localhost:8080")}
                  // liveProvider={liveProvider(supabaseClient)}
                  // authProvider={authProvider}
                  routerProvider={routerBindings}
                  notificationProvider={notificationProvider}
                  i18nProvider={i18nProvider}
                  resources={[
                    {
                      name: "dashboards",
                      list: "/",
                      meta: {
                        icon: <GridView />,
                      },
                    },
                    {
                      name: "statistics",
                      list: "/statistics",
                      meta: {
                        icon: <Equalizer />,
                      },
                    },
                    {
                      name: "chemists",
                      list: "/chemists",
                      meta: {
                        icon: <FontAwesomeIcon icon={faTemperatureFull} />,
                      },
                    },
                    {
                      name: "wallets",
                      list: "/",
                      meta: {
                        icon: <FontAwesomeIcon icon={faWallet} />,
                      },
                    },
                    {
                      name: "doctors",
                      list: "/doctors",
                      create: "/doctors/create",
                      edit: "/doctors/edit/:id",
                      show: "/doctors/show/:id",
                      meta: {
                        canDelete: true,
                        icon: <FontAwesomeIcon icon={faUserDoctor} />,
                      },
                    },
                    {
                      name: "hospitals",
                      list: "/hospitals",
                      create: "/hospitals/create",
                      edit: "/hospitals/edit/:id",
                      show: "/hospitals/show/:id",
                      meta: {
                        canDelete: true,
                        icon: <FontAwesomeIcon icon={faHospital} />,
                      },
                    },
                    {
                      name: "medicines",
                      list: "/medicines",
                      create: "/medicines/create",
                      edit: "/medicines/edit/:id",
                      show: "/medicines/show/:id",
                      meta: {
                        canDelete: true,
                        icon: <FontAwesomeIcon icon={faMedkit} />,
                      },
                    },
                    {
                      name: "order",
                      list: "/orders",
                      meta: {
                        hide: true,
                      },
                    },
                    // {
                    //   name: "departments",
                    //   list: "/departments",
                    //   create: "/departments/create",
                    //   edit: "/departments/edit/:id",
                    //   show: "/departments/show/:id",
                    //   meta: {
                    //     canDelete: true,
                    //     icon: <FontAwesomeIcon icon={faSitemap} />,
                    //   },
                    // },
                    // {
                    //   name: "laboratories",
                    //   list: "/laboratories",
                    //   create: "/laboratories/create",
                    //   edit: "/laboratories/edit/:id",
                    //   show: "/laboratories/show/:id",
                    //   meta: {
                    //     canDelete: true,
                    //     icon: <FontAwesomeIcon icon={faFlaskVial} />,
                    //   },
                    // },
                    // {
                    //   name: "medical_specialities",
                    //   list: "/medical_specialities",
                    //   create: "/medical_specialities/create",
                    //   edit: "/medical_specialities/edit/:id",
                    //   show: "/medical_specialities/show/:id",
                    //   meta: {
                    //     canDelete: true,
                    //     icon: <FontAwesomeIcon icon={faSitemap} />,
                    //   },
                    // },
                    // {
                    //   name: "organizations",
                    //   list: "/organizations",
                    //   create: "/organizations/create",
                    //   edit: "/organizations/edit/:id",
                    //   show: "/organizations/show/:id",
                    //   meta: {
                    //     canDelete: true,
                    //     icon: <FontAwesomeIcon icon={faBuilding} />,
                    //   },
                    // },
                    // {
                    //   name: "diseases",
                    //   meta: {
                    //     icon: <FontAwesomeIcon icon={faDisease} />,
                    //   },
                    // },
                    // {
                    //   name: "diseases",
                    //   list: "/diseases",
                    //   create: "/diseases/create",
                    //   edit: "/diseases/edit/:id",
                    //   show: "/diseases/show/:id",

                    //   meta: {
                    //     canDelete: true,
                    //     parent: "diseases",
                    //     icon: <FontAwesomeIcon icon={faDisease} />,
                    //   },
                    // },
                    // {
                    //   name: "diseases_groups",
                    //   list: "/diseases_groups",
                    //   create: "/diseases_groups/create",
                    //   edit: "/diseases_groups/edit/:id",
                    //   show: "/diseases_groups/show/:id",
                    //   meta: {
                    //     canDelete: true,
                    //     parent: "diseases",
                    //     icon: <FontAwesomeIcon icon={faViruses} />,
                    //   },
                    // },

                    // {
                    //   name: "patients",
                    //   list: "/patients",
                    //   create: "/patients/create",
                    //   edit: "/patients/edit/:id",
                    //   show: "/patients/show/:id",
                    //   meta: {
                    //     canDelete: true,
                    //     icon: <FontAwesomeIcon icon={faHospitalUser} />,
                    //   },
                    // },
                    // {
                    //   name: "patient_record",
                    //   // list: "/patient_record",
                    //   create: "patients/show/:patientId/patient_record/create",
                    //   edit: "patients/show/:patientId/patient_record/edit/:id",
                    //   show: "patients/show/:patientId/patient_record/:id",
                    //   meta: {
                    //     canDelete: true,
                    //     icon: <FontAwesomeIcon icon={faHospitalUser} />,
                    //     // parent: "patients",
                    //     hide: true,
                    //   },
                    // },
                    // {
                    //   name: "technicians",
                    //   list: "/technicians",
                    //   create: "/technicians/create",
                    //   edit: "/technicians/edit/:id",
                    //   show: "/technicians/show/:id",
                    //   meta: {
                    //     canDelete: true,
                    //     icon: <FontAwesomeIcon icon={faUserSecret} />,
                    //   },
                    // },
                    // {
                    //   name: "prosthetics",
                    //   meta: {
                    //     icon: <FontAwesomeIcon icon={faBone} />,
                    //   },
                    // },
                    // {
                    //   name: "3d_objects",
                    //   list: "/3d_objects",
                    //   create: "/3d_objects/create",
                    //   edit: "/3d_objects/edit/:id",
                    //   show: "/3d_objects/show/:id",
                    //   meta: {
                    //     canDelete: true,
                    //     parent: "prosthetics",
                    //     icon: <FontAwesomeIcon icon={faCubes} />,
                    //   },
                    // },
                    // {
                    //   name: "products",
                    //   list: "/products",
                    //   create: "/products/create",
                    //   edit: "/products/edit/:id",
                    //   show: "/products/show/:id",
                    //   meta: {
                    //     canDelete: true,
                    //     parent: "prosthetics",
                    //     icon: <FontAwesomeIcon icon={faBone} />,
                    //   },
                    // },
                    // {
                    //   name: "categories",
                    //   list: "/categories",
                    //   create: "/categories/create",
                    //   edit: "/categories/edit/:id",
                    //   show: "/categories/show/:id",
                    //   meta: {
                    //     canDelete: true,
                    //     parent: "prosthetics",
                    //     icon: <Category />,
                    //   },
                    // },
                  ]}
                  options={{
                    syncWithLocation: true,
                    warnWhenUnsavedChanges: true,
                  }}
                >
                  <Routes>
                    <Route
                      element={
                        <Authenticated
                          fallback={<CatchAllNavigate to="/login" />}
                        >
                          <ThemedLayoutV2>
                            <CanAccess fallback={<ForbiddenComponent />}>
                              <Outlet />
                            </CanAccess>
                          </ThemedLayoutV2>
                        </Authenticated>
                      }
                    >
                      {/* <Route
                        index
                        element={<NavigateToResource resource="departments" />}
                      /> */}
                      <Route index element={<DashboardPage />} />
                      <Route path="/statistics">
                        <Route index element={<StatisticList />} />
                        {/* <Route path="create" element={<DepartmentCreate />} />
                        <Route path="edit/:id" element={<DepartmentEdit />} />
                        <Route path="show/:id" element={<DepartmentShow />} /> */}
                      </Route>
                      <Route path="/chemists">
                        <Route index element={<ChemistList />} />
                        {/* <Route path="create" element={<DepartmentCreate />} />
                        <Route path="edit/:id" element={<DepartmentEdit />} />
                        <Route path="show/:id" element={<DepartmentShow />} /> */}
                      </Route>
                      <Route path="/laboratories">
                        <Route index element={<LaboratoryList />} />
                        <Route path="create" element={<LaboratoryCreate />} />
                        <Route path="edit/:id" element={<LaboratoryEdit />} />
                        <Route path="show/:id" element={<LaboratoryShow />} />
                      </Route>
                      <Route path="/medical_specialities">
                        <Route index element={<SpecialityList />} />
                        <Route path="create" element={<SpecialityCreate />} />
                        <Route path="edit/:id" element={<SpecialityEdit />} />
                        <Route path="show/:id" element={<SpecialityShow />} />
                      </Route>
                      <Route path="/organizations">
                        <Route index element={<OrganizationList />} />
                        <Route path="create" element={<OrganizationCreate />} />
                        <Route path="edit/:id" element={<OrganizationEdit />} />
                        {/* <Route path="show/:id" element={<OrganizationShow />} /> */}
                      </Route>
                      <Route path="/diseases">
                        <Route index element={<DiseaseList />} />
                        <Route path="create" element={<DiseaseEdit />} />
                        <Route path="edit/:id" element={<DiseaseEdit />} />
                        <Route path="show/:id" element={<DiseaseShow />} />
                      </Route>
                      <Route path="/diseases_groups">
                        <Route index element={<DiseaseGroupList />} />
                        {/* <Route path="create" element={<DiseaseGroupCreate />} /> */}
                        <Route path="edit/:id" element={<DiseaseGroupEdit />} />
                        <Route path="show/:id" element={<DiseaseGroupShow />} />
                      </Route>
                      <Route path="/medicines">
                        <Route index element={<MedicineList />} />
                        <Route path="create" element={<MedicineEdit />} />
                        <Route path="edit/:id" element={<MedicineEdit />} />
                        <Route path="show/:id" element={<MedicineShow />} />
                      </Route>
                      <Route path="/hospitals">
                        <Route index element={<HospitalList />} />
                        <Route path="create" element={<HospitalEdit />} />
                        <Route path="edit/:id" element={<HospitalEdit />} />
                        {/* <Route path="show/:id" element={<HospitalShow />} /> */}
                      </Route>
                      <Route path="/doctors">
                        <Route index element={<DoctorList />} />
                        <Route path="create" element={<DoctorCreate />} />
                        <Route path="edit/:id" element={<DoctorEdit />} />
                        <Route path="show/:id" element={<DoctorShow />} />
                      </Route>
                      <Route path="/patients">
                        <Route index element={<PatientList />} />
                        <Route path="create" element={<PatientCreate />} />
                        <Route path="edit/:id" element={<PatientEdit />} />

                        <Route path="show/:id">
                          <Route index element={<PatientShow />} />
                          <Route
                            path="patient_record/:id"
                            element={<PatientRecord />}
                          />
                        </Route>

                        {/* <Route path="show/:id" element={<PatientShow />} /> */}
                      </Route>
                      <Route path="/technicians">
                        <Route index element={<TechnicianList />} />
                        <Route path="create" element={<TechnicianCreate />} />
                        <Route path="edit/:id" element={<TechnicianEdit />} />
                        <Route path="show/:id" element={<TechnicianShow />} />
                      </Route>
                      <Route path="/3d_objects">
                        <Route index element={<_3DObjectList />} />
                        <Route path="create" element={<_3DObjectShow />} />
                      </Route>
                      <Route path="/products">
                        <Route index element={<ProductList />} />
                        <Route path="create" element={<ProductCreate />} />
                        <Route path="edit/:id" element={<ProductEdit />} />
                        <Route path="show/:id" element={<ProductShow />} />
                      </Route>
                      <Route path="/categories">
                        <Route index element={<CategoriesList />} />
                      </Route>
                      <Route path="/orders">
                        <Route index element={<OrderList />} />
                      </Route>
                    </Route>
                    <Route
                      element={
                        <Authenticated fallback={<Outlet />}>
                          <NavigateToResource />
                        </Authenticated>
                      }
                    >
                      <Route
                        path="/login"
                        element={
                          <AuthPage
                            type="login"
                            providers={[
                              {
                                name: "google",
                                icon: <Google />,
                                label: "Sign in with Google",
                              },
                            ]}
                            formProps={{
                              defaultValues: {
                                email: "dpcongdanh@gmail.com",
                                password: "123456",
                              },
                            }}
                          />
                        }
                      />
                      <Route
                        path="/register"
                        element={<AuthPage type="register" />}
                      />
                      <Route
                        path="/forgot-password"
                        element={<AuthPage type="forgotPassword" />}
                      />
                    </Route>
                    <Route
                      element={
                        <Authenticated>
                          <ThemedLayoutV2>
                            <Outlet />
                          </ThemedLayoutV2>
                        </Authenticated>
                      }
                    >
                      <Route path="*" element={<ErrorComponent />} />
                    </Route>
                  </Routes>

                  <RefineKbar />
                  <UnsavedChangesNotifier />
                </Refine>
              </RefineSnackbarProvider>
            </ColorModeContextProvider>
          </RefineKbarProvider>
        </BrowserRouter>
      </SolanaProvider>
    </LocalizationProvider>
  );
}

export default App;

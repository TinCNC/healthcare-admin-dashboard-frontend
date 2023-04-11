// import { Authenticated, Refine } from "@refinedev/core";

// import {
//   notificationProvider,
//   RefineSnackbarProvider,
//   ReadyPage,
//   ErrorComponent,
//   AuthPage,
// } from "@refinedev/mui";

// import { CssBaseline, GlobalStyles } from "@mui/material";
// import routerProvider from "@refinedev/react-router-v6/legacy";
// import { dataProvider, liveProvider } from "@refinedev/supabase";
// import { RefineKbarProvider } from "@refinedev/kbar";
// import { useTranslation } from "react-i18next";
// import { ColorModeContextProvider } from "contexts";
// import { supabaseClient } from "utility";
// import { Title, Sider, Layout, Header } from "components/layout";
// import { OffLayoutArea } from "components/offLayoutArea";
// import authProvider from "./authProvider";

// // import { Wallet } from "pages/payment-solana";

// import {
//   PatientList,
//   PatientCreate,
//   PatientEdit,
//   PatientShow,
// } from "pages/patients";
// import {
//   ProductList,
//   ProductShow,
//   ProductCreate,
//   ProductEdit,
// } from "pages/products";
// import {
//   TechnicianList,
//   TechnicianCreate,
//   TechnicianEdit,
//   TechnicianShow,
// } from "pages/technicians";
// import { CategoriesList } from "pages/categories";
// import {
//   DoctorList,
//   DoctorShow,
//   DoctorCreate,
//   DoctorEdit,
// } from "pages/doctors";
// import { _3DObjectList, _3DObjectShow } from "pages/3d_objects";
// import {
//   DiseaseList,
//   DiseaseShow,
//   DiseaseEdit,
//   DiseaseCreate,
// } from "pages/diseases";

// import {
//   DiseaseGroupList,
//   DiseaseGroupShow,
//   DiseaseGroupEdit,
//   // DiseaseGroupCreate,
// } from "pages/diseases_groups";

// import { ClinicList, ClinicCreate, ClinicEdit } from "pages/clinics";

// import {
//   DepartmentList,
//   DepartmentCreate,
//   DepartmentEdit,
// } from "pages/departments";

// import {
//   SpecialityList,
//   SpecialityCreate,
//   SpecialityEdit,
//   SpecialityShow,
// } from "pages/specialities";

// import {
//   OrganizationList,
//   OrganizationCreate,
//   OrganizationEdit,
// } from "pages/organizations";

// import {
//   LaboratoryList,
//   LaboratoryShow,
//   LaboratoryEdit,
//   LaboratoryCreate,
// } from "pages/laboratories";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import {
//   faSitemap,
//   faFlaskVial,
//   faHospital,
//   faBuilding,
//   faDisease,
//   faViruses,
//   faUserDoctor,
//   faHospitalUser,
//   faUserSecret,
//   faBone,
//   faCubes,
// } from "@fortawesome/free-solid-svg-icons";

// import { Category, Google, ShoppingCart } from "@mui/icons-material";
// import { OrderList } from "pages/order";

// function App() {
//   const { t, i18n } = useTranslation();

//   const i18nProvider = {
//     translate: (key: string, params: object) => t(key, params),
//     changeLocale: (lang: string) => i18n.changeLanguage(lang),
//     getLocale: () => i18n.language,
//   };

//   return (
//     <ColorModeContextProvider>
//       <CssBaseline />
//       <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
//       <RefineSnackbarProvider>
//         <RefineKbarProvider>
//           <Refine
//             notificationProvider={notificationProvider}
//             // ReadyPage={ReadyPage}
//             // catchAll={<ErrorComponent />}
//             dataProvider={dataProvider(supabaseClient)}
//             liveProvider={liveProvider(supabaseClient)}
//             authProvider={authProvider}
//             // legacyAuthProvider={authProvider}
//             legacyRouterProvider={{
//               ...routerProvider,
//               routes: [
//                 {
//                   path: "/register",
//                   element: <AuthPage type="register" />,
//                 },
//                 {
//                   path: "/forgot-password",
//                   element: <AuthPage type="forgotPassword" />,
//                 },
//                 {
//                   path: "/update-password",
//                   element: <AuthPage type="updatePassword" />,
//                 },
//               ],
//             }}
//             LoginPage={() => (
//               <AuthPage
//                 type="login"
//                 providers={[
//                   {
//                     name: "google",
//                     icon: <Google />,
//                     label: "Sign in with Google",
//                   },
//                 ]}
//                 formProps={{
//                   defaultValues: {
//                     email: "dpcongdanh@gmail.com",
//                     password: "123456",
//                   },
//                 }}
//               />
//             )}
//             resources={[
//               // {
//               //   name: "SolanaPayment",
//               //   list: Wallet,
//               //   icon: <FontAwesomeIcon icon={solid("wallet")} />,
//               // },
//               {
//                 name: "departments",
//                 list: DepartmentList,
//                 create: DepartmentCreate,
//                 edit: DepartmentEdit,
//                 icon: <FontAwesomeIcon icon={faSitemap} />,
//               },
//               {
//                 name: "laboratories",
//                 list: LaboratoryList,
//                 show: LaboratoryShow,
//                 create: LaboratoryCreate,
//                 edit: LaboratoryEdit,
//                 icon: <FontAwesomeIcon icon={faFlaskVial} />,
//               },
//               {
//                 name: "medical_specialities",
//                 list: SpecialityList,
//                 show: SpecialityShow,
//                 create: SpecialityCreate,
//                 edit: SpecialityEdit,
//                 icon: <FontAwesomeIcon icon={faSitemap} />,
//               },
//               {
//                 name: "organizations",
//                 list: OrganizationList,
//                 create: OrganizationCreate,
//                 edit: OrganizationEdit,
//                 icon: <FontAwesomeIcon icon={faBuilding} />,
//               },
//               {
//                 name: "Diseases",
//                 icon: <FontAwesomeIcon icon={faDisease} />,
//               },
//               {
//                 name: "diseases",
//                 parentName: "Diseases",
//                 list: DiseaseList,
//                 show: DiseaseShow,
//                 create: DiseaseCreate,
//                 edit: DiseaseEdit,
//                 icon: <FontAwesomeIcon icon={faDisease} />,
//               },
//               {
//                 name: "diseases_groups",
//                 parentName: "Diseases",
//                 list: DiseaseGroupList,
//                 show: DiseaseGroupShow,
//                 // create: DiseaseGroupCreate,
//                 edit: DiseaseGroupEdit,
//                 icon: <FontAwesomeIcon icon={faViruses} />,
//               },
//               {
//                 name: "clinics",
//                 list: ClinicList,
//                 create: ClinicCreate,
//                 edit: ClinicEdit,
//                 icon: <FontAwesomeIcon icon={faHospital} />,
//               },
//               {
//                 name: "doctors",
//                 list: DoctorList,
//                 show: DoctorShow,
//                 create: DoctorCreate,
//                 edit: DoctorEdit,
//                 icon: <FontAwesomeIcon icon={faUserDoctor} />,
//               },
//               {
//                 name: "patients",
//                 list: PatientList,
//                 create: PatientCreate,
//                 edit: PatientEdit,
//                 show: PatientShow,
//                 icon: <FontAwesomeIcon icon={faHospitalUser} />,
//               },
//               {
//                 name: "technicians",
//                 list: TechnicianList,
//                 create: TechnicianCreate,
//                 edit: TechnicianEdit,
//                 show: TechnicianShow,
//                 icon: <FontAwesomeIcon icon={faUserSecret} />,
//               },
//               // {
//               //   name: "implants",
//               //   list: PatientList,
//               //   // create: PostCreate,
//               //   // edit: PostEdit,
//               //   icon: <FontAwesomeIcon icon={solid("teeth")} />,
//               // },
//               {
//                 name: "Prosthetics",
//                 icon: <FontAwesomeIcon icon={faBone} />,
//               },
//               {
//                 // name: "prosthetics",
//                 name: "3d_objects",
//                 parentName: "Prosthetics",
//                 list: _3DObjectList,
//                 show: _3DObjectShow,
//                 // create: _3DObjectCreate,
//                 // edit: _3DObjectEdit,
//                 icon: <FontAwesomeIcon icon={faCubes} />,
//               },
//               {
//                 // name: "prosthetics",
//                 name: "products",
//                 parentName: "Prosthetics",
//                 list: ProductList,
//                 show: ProductShow,
//                 create: ProductCreate,
//                 edit: ProductEdit,
//                 icon: <FontAwesomeIcon icon={faBone} />,
//               },
//               {
//                 name: "categories",
//                 parentName: "Prosthetics",
//                 list: CategoriesList,
//                 // create: CategoriesCreate,
//                 // edit: CategoriesEdit,
//                 icon: <Category />,
//               },
//               {
//                 name: "orders",
//                 list: OrderList,
//                 icon: <ShoppingCart />,
//                 meta: {
//                   hide: true,
//                 },
//               },
//             ]}
//             Title={Title}
//             Sider={Sider}
//             Layout={Layout}
//             Header={Header}
//             OffLayoutArea={OffLayoutArea}
//             i18nProvider={i18nProvider}
//           />
//         </RefineKbarProvider>
//       </RefineSnackbarProvider>
//     </ColorModeContextProvider>
//   );
// }

// export default App;

import {
  Refine,
  // WelcomePage,
  Authenticated,
} from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  AuthPage,
  ErrorComponent,
  notificationProvider,
  RefineSnackbarProvider,
  // ThemedLayout,
} from "@refinedev/mui";

import { ThemedLayout } from "components/themedLayout";

import { dataProvider, liveProvider } from "@refinedev/supabase";
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
} from "@fortawesome/free-solid-svg-icons";

import { Category, Google } from "@mui/icons-material";
import { OrderList } from "pages/order";
import { supabaseClient } from "utility";
import { ColorModeContextProvider } from "./contexts/color-mode";
// import { Header } from "./components/header";
import authProvider from "./authProvider";

function App() {
  const { t, i18n } = useTranslation();

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <Refine
              dataProvider={dataProvider(supabaseClient)}
              liveProvider={liveProvider(supabaseClient)}
              authProvider={authProvider}
              routerProvider={routerBindings}
              notificationProvider={notificationProvider}
              i18nProvider={i18nProvider}
              resources={[
                {
                  name: "departments",
                  list: "/departments",
                  create: "/departments/create",
                  edit: "/departments/edit/:id",
                  show: "/departments/show/:id",
                  meta: {
                    canDelete: true,
                    icon: <FontAwesomeIcon icon={faSitemap} />,
                  },
                },
                {
                  name: "laboratories",
                  list: "/laboratories",
                  create: "/laboratories/create",
                  edit: "/laboratories/edit/:id",
                  show: "/laboratories/show/:id",
                  meta: {
                    canDelete: true,
                    icon: <FontAwesomeIcon icon={faFlaskVial} />,
                  },
                },
                {
                  name: "medical_specialities",
                  list: "/medical_specialities",
                  create: "/medical_specialities/create",
                  edit: "/medical_specialities/edit/:id",
                  show: "/medical_specialities/show/:id",
                  meta: {
                    canDelete: true,
                    icon: <FontAwesomeIcon icon={faSitemap} />,
                  },
                },
                {
                  name: "organizations",
                  list: "/organizations",
                  create: "/organizations/create",
                  edit: "/organizations/edit/:id",
                  show: "/organizations/show/:id",
                  meta: {
                    canDelete: true,
                    icon: <FontAwesomeIcon icon={faBuilding} />,
                  },
                },
                {
                  name: "diseases",
                  meta: {
                    icon: <FontAwesomeIcon icon={faDisease} />,
                  },
                },
                {
                  name: "diseases",
                  list: "/diseases",
                  create: "/diseases/create",
                  edit: "/diseases/edit/:id",
                  show: "/diseases/show/:id",

                  meta: {
                    canDelete: true,
                    parent: "diseases",
                    icon: <FontAwesomeIcon icon={faDisease} />,
                  },
                },
                {
                  name: "diseases_groups",
                  list: "/diseases_groups",
                  create: "/diseases_groups/create",
                  edit: "/diseases_groups/edit/:id",
                  show: "/diseases_groups/show/:id",
                  meta: {
                    canDelete: true,
                    parent: "diseases",
                    icon: <FontAwesomeIcon icon={faViruses} />,
                  },
                },
                {
                  name: "clinics",
                  list: "/clinics",
                  create: "/clinics/create",
                  edit: "/clinics/edit/:id",
                  show: "/clinics/show/:id",
                  meta: {
                    canDelete: true,
                    icon: <FontAwesomeIcon icon={faHospital} />,
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
                  name: "patients",
                  list: "/patients",
                  create: "/patients/create",
                  edit: "/patients/edit/:id",
                  show: "/patients/show/:id",
                  meta: {
                    canDelete: true,
                    icon: <FontAwesomeIcon icon={faHospitalUser} />,
                  },
                },
                {
                  name: "technicians",
                  list: "/technicians",
                  create: "/technicians/create",
                  edit: "/technicians/edit/:id",
                  show: "/technicians/show/:id",
                  meta: {
                    canDelete: true,
                    icon: <FontAwesomeIcon icon={faUserSecret} />,
                  },
                },
                {
                  name: "prosthetics",
                  meta: {
                    icon: <FontAwesomeIcon icon={faBone} />,
                  },
                },
                {
                  name: "3d_objects",
                  list: "/3d_objects",
                  create: "/3d_objects/create",
                  edit: "/3d_objects/edit/:id",
                  show: "/3d_objects/show/:id",
                  meta: {
                    canDelete: true,
                    parent: "prosthetics",
                    icon: <FontAwesomeIcon icon={faCubes} />,
                  },
                },
                {
                  name: "products",
                  list: "/products",
                  create: "/products/create",
                  edit: "/products/edit/:id",
                  show: "/products/show/:id",
                  meta: {
                    canDelete: true,
                    parent: "prosthetics",
                    icon: <FontAwesomeIcon icon={faBone} />,
                  },
                },
                {
                  name: "categories",
                  list: "/categories",
                  create: "/categories/create",
                  edit: "/categories/edit/:id",
                  show: "/categories/show/:id",
                  meta: {
                    canDelete: true,
                    parent: "prosthetics",
                    icon: <Category />,
                  },
                },
              ]}
              // resources={[
              //   {
              //     name: "blog_posts",
              //     list: "/blog-posts",
              //     create: "/blog-posts/create",
              //     edit: "/blog-posts/edit/:id",
              //     show: "/blog-posts/show/:id",
              //     meta: {
              //       canDelete: true,
              //     },
              //   },
              //   {
              //     name: "categories",
              //     list: "/categories",
              //     create: "/categories/create",
              //     edit: "/categories/edit/:id",
              //     show: "/categories/show/:id",
              //     meta: {
              //       canDelete: true,
              //     },
              //   },
              // ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
              }}
            >
              <Routes>
                <Route
                  element={
                    <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                      <ThemedLayout>
                        <Outlet />
                      </ThemedLayout>
                    </Authenticated>
                  }
                >
                  <Route
                    index
                    element={<NavigateToResource resource="3d_objects" />}
                  />
                  <Route path="/departments">
                    <Route index element={<DepartmentList />} />
                    <Route path="create" element={<DepartmentCreate />} />
                    <Route path="edit/:id" element={<DepartmentEdit />} />
                    {/* <Route path="show/:id" element={<DepartmentShow />} /> */}
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
                    <Route path="create" element={<DiseaseCreate />} />
                    <Route path="edit/:id" element={<DiseaseEdit />} />
                    <Route path="show/:id" element={<DiseaseShow />} />
                  </Route>
                  <Route path="/diseases_groups">
                    <Route index element={<DiseaseGroupList />} />
                    {/* <Route path="create" element={<DiseaseGroupCreate />} /> */}
                    <Route path="edit/:id" element={<DiseaseGroupEdit />} />
                    <Route path="show/:id" element={<DiseaseGroupShow />} />
                  </Route>
                  <Route path="/clinics">
                    <Route index element={<ClinicList />} />
                    <Route path="create" element={<ClinicCreate />} />
                    <Route path="edit/:id" element={<ClinicEdit />} />
                    {/* <Route path="show/:id" element={<ClinicShow />} /> */}
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
                    <Route path="show/:id" element={<PatientShow />} />
                  </Route>
                  <Route path="/technicians">
                    <Route index element={<TechnicianList />} />
                    <Route path="create" element={<TechnicianCreate />} />
                    <Route path="edit/:id" element={<TechnicianEdit />} />
                    <Route path="show/:id" element={<TechnicianShow />} />
                  </Route>
                  <Route path="/3d_objects">
                    {/* eslint-disable-next-line react/jsx-pascal-case*/}
                    <Route index element={<_3DObjectList />} />
                    {/* eslint-disable-next-line react/jsx-pascal-case*/}
                    <Route path="create" element={<_3DObjectShow />} />
                    {/* <Route path="edit/:id" element={<ClinicEdit />} /> */}
                    {/* <Route path="show/:id" element={<ClinicShow />} /> */}
                  </Route>
                  <Route path="/products">
                    <Route index element={<ProductList />} />
                    <Route path="create" element={<ProductCreate />} />
                    <Route path="edit/:id" element={<ProductEdit />} />
                    <Route path="show/:id" element={<ProductShow />} />
                  </Route>
                  <Route path="/categories">
                    <Route index element={<CategoriesList />} />
                    {/* <Route path="create" element={<CategoriesCreate />} />
                    <Route path="edit/:id" element={<CategoriesEdit />} />
                    <Route path="show/:id" element={<CategoriesShow />} /> */}
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
                      <ThemedLayout>
                        <Outlet />
                      </ThemedLayout>
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
  );
}

export default App;
